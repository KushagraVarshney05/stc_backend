const CustomErrorHandler =  require('../services/CustomErrorHandler');
const JwtService = require('../services/JwtService');
const mysql  = require('mysql');
const db = require("../config/db");
const bcrypt = require("bcrypt");
const mail = require("../sendMail");
const loginController = {
    async login(req,res,next){
        
        const {LibraryID, Password} = req.body;
        if(LibraryID && Password){
            try{
                const data = await db.promise().query(`Select * from StudentTable where LibraryID = '${LibraryID}'`);
                if(!data[0]){
                   // console.log("HI")
                    return next(CustomErrorHandler.wrongCredentials());
                }
                
                if(Password !== data[0][0].Password)
                {
                    //console.log(Password, data[0].Password)
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
    },
    async requestResetPassword(req,res,next){
        const {email} = req.params;
       // console.log(email);
        const data = await db.promise().query(`SELECT COUNT(email) as val FROM StudentTable WHERE email='${email}'`);
        const count = data[0][0].val;
        if(count>0)
        {
            try{
                const reset_token = JwtService.sign({email},'600s',"abcde");
                //console.log(reset_token)
                const date = new Date();
                const expiry = date.setTime(date.getTime() + 60*1000*10);//10 min
            //    console.log("hii")
            //     console.log(email,reset_token);
                try{
                   // console.log("hi");
                    await db.promise().query(`Insert into reset_token values("${email}","${reset_token}","${expiry}")`);

                }
                catch(e){
                    res.json({e});
                }
                //console.log("first");
                
                res.json({success:true,reset_token});
            }catch(e){
                res.json({success: false,e});
            }
        }
        else{
            return next(CustomErrorHandler.wrongCredentials());
        }
        
    },
    async resetPassword(req,res,next){
        const {reset_token,password} = req.body;
        try{
            const email = await JwtService.verify(reset_token,"abcde");

            try{
                const query = await db.promise().query(`Select expiry, email from reset_token where hashtoken="${reset_token}"`);
    
                const data = query[0][0];
               // console.log(data);
                const cuur_date = Date.now();
                if(cuur_date > data.expiry)
                {
                    return next(CustomErrorHandler.wrongCredentials());
                }
                try{
                    const query = await db.promise().query(`Update StudentTable SET Password="${password}" where email="${data.email}"`);
                    res.status(200).json({success:true});
                }
                catch(e){
                    return next(CustomErrorHandler.serverError());
                }
                
            }catch(e){
                res.status(500);
            }
        }
        catch(e){
            return next(CustomErrorHandler.wrongCredentials());
        }
        
        // if()
        res.status(400);
    }
}
module.exports =  loginController;