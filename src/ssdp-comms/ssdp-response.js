export function Response(msg) {
   const [
      header,
      ...body
   ] = msg.split('\r\n');

   const [
      PROTOCOL,
      STATUS,
      ...headMsg
   ] = header.split(' ');

   const props = body.reduce((all, line) => {
      if (!line) return all;
      const [key, value = ''] = line.split(/:(.*)/);
      all[key.trim().toUpperCase()] = value.trim();
      return all;
   }, {});

   return {
      PROTOCOL,
      STATUS,
      HEAD: headMsg.join(' '),
      ...props
   };
}
