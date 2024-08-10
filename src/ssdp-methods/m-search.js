import {
   SSDP_DEFAULT_IP,
   SSDP_DEFAULT_PORT,
   SSDP_DISCOVER,
   M_SEARCH,
} from '../ssdp-constants.js';
import { DGramSocketService } from '../dgram/dgram-socket-service.js';
import { Request, Response } from '../ssdp-comms/index.js';

export async function mSearch({
   serviceType,
   ip = SSDP_DEFAULT_IP,
   port = SSDP_DEFAULT_PORT,
   dgramParams = {},
   headers = {}
}) {
   return new Promise(async (resolve, reject) => {
      if (!serviceType) reject(new Error('M-SEARCH requires a serviceType.'));

      const service = new DGramSocketService({ port, ...dgramParams });

      service.start();

      service.on('listening', () => {
         const request = new Request({
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

      const response = new Response(msg.toString());

      const isOK = response.HEAD === 'OK';
      const hasRightST = response.ST === serviceType;
      const hasLocation = !!response.LOCATION;

      if (!isOK || !hasRightST || !hasLocation) {
         resolve(null);
      } else {
         resolve(response);
      }
   });
};
