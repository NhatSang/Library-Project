const jwt = require("jsonwebtoken")

const secretKey = process.env.SECRET_KEY_JWT;

const generateToken = (username)=>{
    const payload = {username: username};
    const options = {expiresIn: '7d'};
    const token = jwt.sign(payload,secretKey,options);
    console.log("TOKEN: ",token);
    return token;
}

const validateToken = (token)=>{
    try{
        jwt.verify(token,secretKey);
        return true;
    }
    catch (err){
        return false;
    }
}

module.exports = {generateToken,validateToken}