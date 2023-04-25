const express = require("express");
const {loginController, companyController} = require("../controllers");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post('/login',loginController.login);
router.get('/count',companyController.count);
router.get('/company/Allclass',companyController.getAllClass);
router.get('/company/:classID',companyController.classSearch);
router.get('/companyNameSearch/:search',companyController.companySearch);
router.get('/companyCTCSearch/:CTCsearch',companyController.companyCTCSearch);
router.get('/companySearch/:companyID/:year',companyController.specificCompanyData);
router.post('/requestResetPassword/:email',loginController.requestResetPassword);
router.post('/ResetPassword/',loginController.resetPassword);
router.post('/feedback',companyController.feedback);
module.exports = router;  