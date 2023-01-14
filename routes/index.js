const express = require("express");
const {loginController, companyController} = require("../controllers");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post('/login',loginController.login);
router.get('/count',auth,companyController.count);
router.get('/company/Allclass',auth,companyController.getAllClass);
router.get('/company/:classID',companyController.classSearch);
router.get('/companyNameSearch/:search',companyController.companySearch);
router.get('/companyCTCSearch/:CTCsearch',companyController.companyCTCSearch);
router.get('/companySearch/:companyID/:year',companyController.specificCompanyData);

module.exports = router;  