const CustomErrorHandler =  require('../services/CustomErrorHandler');
const JwtService = require('../services/JwtService');
const mysql  = require('mysql');
const db = require("../config/db");
const loginController = {
    async login(req,res,next){
        
        const {LibraryID, Password} = req.body;
        if(LibraryID && Password){
            try{
                const data = await db.promise().query(`Select * from StudentTable where LibraryID = '${LibraryID}'`);
                if(!data[0]){
                    console.log("HI")
                    return next(CustomErrorHandler.wrongCredentials());
                }
                
                if(Password !== data[0][0].Password)
                {
                    console.log(Password, data[0].Password)
                    return next(CustomErrorHandler.wrongCredentials());
                }
                const access_token = JwtService.sign({LibraryID,data: data[0][0].userName });
                res.status(201).json({access_token})
            } 
            catch(e){
                return next(CustomErrorHandler.serverError());
            }
        } 
        else{
            return next(CustomErrorHandler.wrongCredentials());
        }
    }
}
module.exports =  loginController;