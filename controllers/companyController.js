const CustomErrorHandler =  require('../services/CustomErrorHandler');
const JwtService = require('../services/JwtService');
const mysql  = require('mysql');
const db = require("../config/db");
const mail = require("../sendMail")
const CTCcheck = (str)=>{
    var regex = /[+-]?\d+(\.\d+)?/g;
    
    var floats = str.match(regex).map(function(v) { return parseFloat(v); });

    return floats;
}
const companyController = {
    async count(req,res,next){
      try{
        const data = await db.promise().query(`SELECT count(*) as COUNT FROM company`);
        res.status(201).send({data: data[0]});
      }catch(e){
        res.status(400).send({error: e})
      }
    },
    async classSearch(req,res,next){
        //console.log("HI");
        const {classID} = req.params;
        // console.log(typeof(classID))
        // console.log(2,classID);
        try{
            const data = await db.promise().query(`SELECT company.companyID, company.companyName ,companydatadivided.companyEligibility, companydatadivided.companyJOBProfile  , companydatadivided.companyCTC FROM company INNER JOIN companydatadivided ON companydatadivided.companyID = company.companyID where company.companyClass = ${parseInt(classID)} AND companydatadivided.companyReportApprovalStatus = "Approved"`);
            
            res.status(201).send({data: data[0]})
        }catch(e){
            res.status(400).send({error: e})  
        }

         
    },
    async companySearch(req,res,next){
        //console.log(5,"HI");
        const {search} = req.params;
        // console.log(typeof(search))
        // console.log(2,search);
        try{
            const data = await db.promise().query(`SELECT company.companyID, company.companyName ,companydatadivided.companyEligibility, companydatadivided.companyJOBProfile  , companydatadivided.companyCTC FROM company INNER JOIN companydatadivided ON companydatadivided.companyID = company.companyID where LOWER(company.companyName) LIKE "${search}%" AND companydatadivided.companyReportApprovalStatus = "Approved"`);
            
            res.status(201).send({data: data[0]})
        }catch(e){
            res.status(400).send({error: e})  
        }

         
    },
    async companyCTCSearch(req,res,next){
        //console.log(5,"HI");
        const {CTCsearch} = req.params;
        const ctc = parseFloat(CTCsearch);
        //console.log(ctc);
        try{
            const searchdata = await db.promise().query(`SELECT company.companyID, company.companyName ,companydatadivided.companyEligibility, companydatadivided.companyJOBProfile  , companydatadivided.companyCTC FROM company INNER JOIN companydatadivided ON companydatadivided.companyID = company.companyID where  companydatadivided.companyReportApprovalStatus = "Approved"`);
            data = searchdata[0];
            const result = [];
            //console.log(data);
            data.forEach(async(e)=>{
                const CTC = CTCcheck(e.companyCTC);
                //console.log(1111111111, CTC[0])
                if(CTC.length > 0)
                {
                    const paisa = [];
                    CTC.map((r)=>{
                        //console.log("Helo");
                      if(r>=ctc){
                        //console.log(r);
                        paisa.push(r);
                      }
                    })
                    //console.log(paisa);
                    if(paisa.length > 0)
                      result.push(e);
                }
            })
            result.sort( (a,b) => a.companyCTC - b.companyCTC )
            //console.log("HIIIIII");
            //console.log(result);
            res.status(201).send({data: result})
        }catch(e){
            res.status(400).send({error: e})  
        }

         
    },
    async getAllClass(req,res,next){
        try{
            const data = await db.promise().query(`Select * from class`);
            res.status(201).send({data: data[0]})
        }catch(e){
            res.status(400).send({error: e})  
        }
    },
    async specificCompanyData(req,res,next){
        const {companyID, year} = req.params;
        //console.log(companyID, year)
        try{
            let data = await db.promise().query(`Select * from companydatadivided where companyID = ${parseInt(companyID)} AND companyReportYear = ${parseInt(year)}`);
            //console.log(data[0][0]);
            const data2 = await db.promise().query(`Select companyName, companyWebsite, ImageID from company where companyID = ${parseInt(companyID)}`);
            //console.log(data2[0][0]);
            data = {...data[0][0],...data2[0][0]};
            //console.log(data);
            res.status(201).send({data: data})
        }catch(e){
            res.status(400).send({error: e})  
        }
    },
    async feedback(req,res,next){
        const {email, content} = req.body;
        try{
            await mail(email,content);
            res.status(200).json({success:true})

        }catch(e){
            res.status(400).json({success:false,e})
        }
    }
    

}
module.exports =  companyController;