const {
    SSDP_DEFAULT_IP,
    SSDP_DEFAULT_PORT,
} = require('../ssdp-constants');

module.exports = async function mSearch({ serviceType, ip = SSDP_DEFAULT_IP, port = SSDP_DEFAULT_PORT, dgramParams = {}, headers = {} }) {
    return new Promise(async (resolve, reject) => {
        if (!serviceType) reject(new Error('M-SEARCH requires serviceType.'));

        const service = (() => {
            const DGramSocketService = require('../dgram/dgram-socket-service');
            return new DGramSocketService({ port, ...dgramParams });
        })();

        service.start();

        service.on('listening', () => {
            const {
                header,
            } = require('../ssdp-comms/ssdp-request');
            const {
                M_SEARCH,
                SSDP_DISCOVER,
            } = require('../ssdp-constants');

            const request = header({
                method: M_SEARCH,
                headers: {
                    'HOST': `${ip}:${port}`,
                    'ST': serviceType,
                    'MAN': `"${SSDP_DISCOVER}"`,
                    'MX': 3,
                    ...headers,
                },
            });

            service.socket.setBroadcast(service.socket.fd, true);
            service.socket.send(request, 0, request.length, port, ip);
        });


        const [msg] = await service.for('message');
        service.stop();

        const { parse } = require('../ssdp-comms/ssdp-response');
        const message = parse(msg.toString());

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
