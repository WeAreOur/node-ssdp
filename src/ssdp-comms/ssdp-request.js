export function Request({ method, headers }) {
   if (!method) throw new Error('SSDP Request requires a method.');

   return Buffer.from(
      `${method.toUpperCase()} * HTTP/1.1\r\n${
         Object.entries(headers)
            .map(([key, value]) => `${key.toUpperCase()}:${value}`)
            .join('\r\n')
      }\r\n\r\n`,
      'ascii',
   );
}
