# NODE-SSDP

An async/await implementation of the **S**imple **S**ervice **D**iscovery **P**rotocol for NodeJS.

## Motivation

To create a minimal, clean and async implementation.
Most of the similar projects out there are unmantained and based on callbacks.

See [diversario/node-ssdp](https://github.com/diversario/node-ssdp) for a more complete and maintained solution.

## Install

Install directly from Github with `npm i --save homelify/node-ssdp`

## Usage

### M-SEARCH

Performs the m-search and returns the message from the device parsed as a javascript object.
(See [m-search](https://github.com/homelify/node-ssdp/blob/main/src/ssdp-methods/m-search.md))

```
const SSDP = require('@homelify/node-ssdp');
const message = await SSDP.mSearch({ serviceType });
```
