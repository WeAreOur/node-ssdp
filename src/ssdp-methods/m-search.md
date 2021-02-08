# M-SEARCH

Performs the m-search and returns the message from the device parsed as a javascript object.

Minimal usage:
```js
const SSDP = require('@homelify/node-ssdp');

const message = await SSDP.mSearch({ serviceType });
```

All the params:
```js
const SSDP = require('@homelify/node-ssdp');

const requiredParams = {
    // The schema name of the device
    serviceType: 'urn:schemas-upnp-org:device:InternetGatewayDevice:1',
};

const optionalParamsOverride = {
    // The ip for the host
    ip: '239.255.255.250',
    // The port for the host
    port: '1900',
};

// See options at https://nodejs.org/api/dgram.html#dgram_dgram_createsocket_options_callback
const optionalDgramParamsOverride = {
    // Type of dgram socket: udp4 or udp6
    type: 'udp4',
    // The port for the dgram socket, defaults to the port of the host
    port: optionalParams.port,
    // If the dgram should reuse the address
    reuseAddr: true,
};

// These are the key:value pairs that are sent in the m-search broadcast
const optionalHeadersOverride: {
    'HOST': `${optionalParams.ip}:${optionalParams.port}`,
    'ST': requiredParams.serviceType,
    'MAN': `"ssdp:discover"`,
    'MX': 3,
};

const message = await SSDP.mSearch({
    ...requiredParams,
    ...optionalParamsOverride,
    dgramParams: optionalDgramParamsOverride,
    headers: optionalHeadersOverride,
});
```
