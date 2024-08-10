import dgram from 'node:dgram';

const DEFAULT_DGRAM_TYPE = 'udp4';
const DEFAULT_DGRAM_PORT = 3000;
const DEFAULT_DGRAM_REUSE_ADDRESS = true;

export class DGramSocketService {
    constructor({
        type = DEFAULT_DGRAM_TYPE,
        port = DEFAULT_DGRAM_PORT,
        reuseAddr = DEFAULT_DGRAM_REUSE_ADDRESS,
    } = {}) {
        this.type = type;
        this.reuseAddr = reuseAddr;
        this.port = port;
        this.listeners = [];
    }

    on(message, callback) {
        this.listeners.push([message, callback]);
        this.socket.addListener(message, callback);
    }

    async for(message) {
        return new Promise((resolve) => {
            const callback = (...args) => {
                this.socket.removeListener(message, callback);
                resolve(args);
            }

            this.socket.addListener(message, callback);
        });
    }

    async start() {
        this.socket = dgram.createSocket({
            type: this.type,
            reuseAddr: this.reuseAddr,
        });

        this.socket.bind(this.port);
        await this.for('close');

        this.listeners.forEach(([message, callback]) =>
            this.socket.removeListener(message, callback));
        delete this;
    }

    stop() {
        this.socket.close();
    }
}
