const {
    SSDP_DEFAULT_IP,
    SSDP_DEFAULT_PORT,
    M_SEARCH,
    SSDP_DISCOVER,
} = require('./constants');

function header({ method, headers, isResponse }) {
    if (!method) throw new Error('SSDP header requires method.');

    const m = method.toUpperCase();
    const str = `${isResponse ? `HTTP/1.1 ${m}` : `${m} * HTTP/1.1`
        }\r\n${Object.entries(headers).map(([header, value]) => `${header}:${value}`).join('\r\n')
        }\r\n\r\n`;

    return Buffer.from(str, 'ascii');
}

async function mSearch({ serviceType, ip = SSDP_DEFAULT_IP, port = SSDP_DEFAULT_PORT }) {
    return new Promise(async (resolve, reject) => {
        if (!serviceType) reject(new Error('M-SEARCH requires serviceType.'));

        const DGramSocketService = require('./dgram-socket-service');
        const service = new DGramSocketService({ port });

        service.start();

        service.on('listening', () => {
            const request = header({
                method: M_SEARCH,
                headers: {
                    'HOST': `${ip}:${port}`,
                    'ST': serviceType,
                    'MAN': `"${SSDP_DISCOVER}"`,
                    'MX': 3
                },
            });

            service.socket.setBroadcast(service.socket.fd, true);
            service.socket.send(request, 0, request.length, port, ip);
        });


        const [msg] = await service.for('message');
        service.stop();

        const message = require('./response').parse(msg.toString());

        const isOK = message.HEAD === 'OK';
        const hasRightST = message.ST === serviceType;
        const hasLocation = !!message.LOCATION;

        if (!isOK || !hasRightST || !hasLocation) {
            resolve(null);
        } else {
            resolve(message);
        }
    });
};

module.exports = {
    mSearch,
};