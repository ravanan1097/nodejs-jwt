const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {

    try {
        const reqtoken = req.body.accessToken || req.headers['x-auth-token'];
        if (!reqtoken) return res.json("Please enter Token");

        else jwt.verify(reqtoken, process.env.token_key)
    }
    catch(err){
        console.log(err);
        return res.json("Cannot Verify Token: ",err)
    }

    return next();
};

module.exports=verifyToken;