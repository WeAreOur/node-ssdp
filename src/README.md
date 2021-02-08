# Development guidelines

## File structure and scalability

- SSDP it's a namespace exported at `./ssdp.js`
- It has a dependency on dgram, so there's a `./dgram/` folder for an async wrapper.
This could be extracted into a separate project "node-async-dgram".
- `./ssdp-constants.js` should include any text that constitutes a part of the protocol, and any default values.
- `./ssdp-comms/` is meant for handling creating requests and parsing responses. The format of the SSDP comms is a status header followed by a `KEY: value\r\n` format. This could be extracted into its own package as a parsing util.
- `./ssdp-methods/` is a folder for the different methods intended to be part of the exported namespace. If the methods become too many (more than 5) each method could go inside its own subfolder including their tests and documentation.

## Testing

There's no tests yet. Feel free to change this.

The original implementation was tested by using it inside another project from where it was extracted.

## Releases

There's no releases yet, but here's how the versions should change:

**Mayor**: a method changes the input params by: requiring a new one, changing the default of one; a method changes the output; a test changes the expectation; or a chunk of work is completed and tested.

**Minor**: a method accepts more input params, without changing the behaviour; more methods are implemented; more tests are implemented.

**Patch**: any other change, as long as it doesn't change: input interface (input params on methods), output interface (output of methods), or expectations (what's being tested)

Release will be done with tags, so the install will use `github:` and not npm as the source, example `github:homelify/node-ssdp#1.0.0` will point to the version 1.0.0 while `github:homelify/node-ssdp` will point to the latest.
