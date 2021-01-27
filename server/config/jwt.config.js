const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
    try{
        console.log(req.cookies);
        jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        next();
    } catch(err){
        res
            .status(401)
            .json({message: "Unauthorized"})
    }
}