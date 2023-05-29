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
        const {classID} = req.params;
        try{
            const data = await db.promise().query(`SELECT company.companyID, company.companyName ,companydatadivided.companyEligibility, companydatadivided.companyJOBProfile  , companydatadivided.companyCTC FROM company INNER JOIN companydatadivided ON companydatadivided.companyID = company.companyID where company.companyClass = ${parseInt(classID)} AND companydatadivided.companyReportApprovalStatus = "Approved" AND companydatadivided.companyReportYear=(SELECT MAX(companydatadivided.companyReportYear) from companydatadivided)`);
            
            res.status(201).send({data: data[0]})
        }catch(e){
            res.status(400).send({error: e})  
        }

         
    },
    async companySearch(req,res,next){
        const {search} = req.params;
        try{
            const data = await db.promise().query(`SELECT company.companyID, company.companyName ,companydatadivided.companyEligibility, companydatadivided.companyJOBProfile  , companydatadivided.companyCTC FROM company INNER JOIN companydatadivided ON companydatadivided.companyID = company.companyID where LOWER(company.companyName) LIKE "${search}%" AND companydatadivided.companyReportApprovalStatus = "Approved"`);
            
            res.status(201).send({data: data[0]})
        }catch(e){
            res.status(400).send({error: e})  
        }

         
    },
    async companyCTCSearch(req,res,next){
        const {CTCsearch} = req.params;
        const ctc = parseFloat(CTCsearch);
        try{
            const searchdata = await db.promise().query(`SELECT company.companyID, company.companyName ,companydatadivided.companyEligibility, companydatadivided.companyJOBProfile  , companydatadivided.companyCTC FROM company INNER JOIN companydatadivided ON companydatadivided.companyID = company.companyID where  companydatadivided.companyReportApprovalStatus = "Approved"`);
            data = searchdata[0];
            const result = [];
            //console.log(data);
            data.forEach(async(e)=>{
                const CTC = CTCcheck(e.companyCTC);
                if(CTC.length > 0)
                {
                    const paisa = [];
                    CTC.map((r)=>{
                      if(r>=ctc){
                        paisa.push(r);
                      }
                    })
                    if(paisa.length > 0)
                      result.push(e);
                }
            })
            result.sort( (a,b) => a.companyCTC - b.companyCTC )
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
            const data2 = await db.promise().query(`Select companyName, companyDescription, companyWebsite, ImageID from company where companyID = ${parseInt(companyID)}`);
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
    },
    async islike(req,res){
        const {email} = req.params;
        //console.log(email);
        try{

            const data = await db.promise().query(`select count(*) as count from ReportLike where email = "${email}"`);
            if(data[0][0].count > 0)
             res.status(200).json({aliked: true,})
            else 
            res.status(200).json({aliked: false}); 
        }catch(e){
            res.status(400).json({success: false}); 
        }
        
    },
    async countlike(req,res){
        const {email} = req.params;
        //console.log(email);
        try{

            const data = await db.promise().query(`select count(*) as count from ReportLike`);
             res.status(200).json({count: data[0][0].count})
            
        }catch(e){
            res.status(400).json({success: false}); 
        }
        
    },
    async like(req,res,next){
        const {email} = req.params;
        console.log(email)
        try{
            
            const data = await db.promise().query(`Insert into ReportLike values("${email}")`);
            res.status(200).json({success: true})
        }catch(e)
        {
            res.status(404).json({success: false})
        }
    }

}
module.exports =  companyController;