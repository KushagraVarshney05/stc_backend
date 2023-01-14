const { SECRET } = require("../config");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const JwtService = require("../services/JwtService");

const auth = async (req,res,next)=>{
    let authHeader = req.headers.authorization;
    console.log(authHeader);
    if(!authHeader){
        return next(CustomErrorHandler.unAuthorized());
    }
    const token = authHeader.split(' ')[1];
    try{
        await JwtService.verify(token,SECRET);
        next();
    }catch(err){
        return next(CustomErrorHandler.unAuthorized());
    }
}
module.exports = auth;