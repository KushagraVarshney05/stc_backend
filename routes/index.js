const express = require("express");
const {loginController, companyController} = require("../controllers");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post('/login',loginController.login);
router.get('/count',companyController.count);
router.get('/company/Allclass',auth,companyController.getAllClass);
router.get('/company/:classID',auth,companyController.classSearch);
router.get('/companyNameSearch/:search',auth,companyController.companySearch);
router.get('/companyCTCSearch/:CTCsearch',auth,companyController.companyCTCSearch);
router.get('/islike/:email',auth,companyController.islike);
router.get('/like/:email',auth,companyController.like);
router.get('/countlike',auth,companyController.countlike);
router.get('/companySearch/:companyID/:year',auth,companyController.specificCompanyData);
router.post('/requestResetPassword/:email',loginController.requestResetPassword);
router.post('/ResetPassword/',loginController.resetPassword);
router.post('/feedback',companyController.feedback);
module.exports = router;  