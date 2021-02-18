const jwt   = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const secretKey = process.env.JWT_SECRET;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;

    if(req.body.userId && req.body.userId !== userId){
        throw 'Invalid UserId';
    } else {
        next();
    }
};