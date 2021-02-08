function parse(msg) {
    const [
        header,
        ...body
    ] = msg.split('\r\n');

    const [
        PROTOCOL,
        STATUS,
        ...headMsg
    ] = header.split(' ');

    const props = body.filter(Boolean).reduce((all, line) => {
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

module.exports = {
    parse,
};
