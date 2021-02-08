# NODE-SSDP

An async/await implementation of the **S**imple **S**ervice **D**iscovery **P**rotocol for NodeJS.

## Why?

Trying to have a very minimal and clean implementation.

Most of the similar projects out there are unmantained.

Check [diversario/node-ssdp](https://github.com/diversario/node-ssdp) for a complete solution.

## How to use

### M-SEARCH

Performs the m-search and returns the message from the device parsed as a javascript object.

```
const SSDP = require('homelify/node-ssdp');

const message = await SSDP.mSearch({ serviceType, ip, port });
```

**serviceType** _(required)_ is the schema name of the device, example: `urn:schemas-upnp-org:device:InternetGatewayDevice:1`

**ip** (default `239.255.255.250`) is the ip for the host

**port** (default `1900`) is the port of the host
