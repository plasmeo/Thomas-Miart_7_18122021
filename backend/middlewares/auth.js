const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        //console.log(req);
        //const token = req.headers.authorization.split(' ')[1];
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.token);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId){
            throw 'Invalid user ID';
        } else {
            console.log("valid user")
            next();
        }

    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });

    }    
};