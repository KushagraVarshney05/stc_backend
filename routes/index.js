const express = require("express");
const {loginController, companyController} = require("../controllers");
const auth = require("../middlewares/auth");
const counting = require("../middlewares/counting")
const router = express.Router();
var count=374;
// const counting =(req,res,next)=>{
    
//     console.log(count);
//     next();
//  }

router.post('/login',loginController.login);
router.get('/count',counting,companyController.count);
router.get('/company/Allclass',auth,counting,companyController.getAllClass);
router.get('/company/:classID',auth,companyController.classSearch);
router.get('/companyNameSearch/:search',auth,companyController.companySearch);
router.get('/companyCTCSearch/:CTCsearch',auth,companyController.companyCTCSearch);
router.get('/islike/:email',auth,companyController.islike);
router.get('/like/:email',auth,companyController.like);
router.get('/countlike',auth,companyController.countlike);
router.get('/comapny/available/:companyID',companyController.companyAvailableReport);
router.get('/companySearch/:companyID/:year',auth,companyController.specificCompanyData);
router.get('/requestResetPassword/:email',loginController.requestResetPassword);
router.post('/ResetPassword/',loginController.resetPassword);
router.post('/feedback',companyController.feedback);
router.get('/views',loginController.views)
module.exports = router;  