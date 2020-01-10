const logger = (req, res, next) => {
    console.log('Datetime : ', Date.now());

    const {method, path} = req;
    const {
        params: {id}
    } = req;
    console.log(id);
    console.log('Request Type : ', req.method);
    console.log('Request Path : ', req.path);

    next();
};

export default logger