const express = require("express");
const {
  loginController,
  companyController,
  testController,
} = require("../controllers");
const auth = require("../middlewares/auth");
const counting = require("../middlewares/counting");
const router = express.Router();
var count = 374;
// const counting =(req,res,next)=>{

//     console.log(count);
//     next();
//  }

router.post("/login", loginController.login);
router.get("/count", counting, companyController.count);
router.get("/company/Allclass", auth, counting, companyController.getAllClass);
router.get("/company/:classID", auth, companyController.classSearch);
router.get("/companyNameSearch/:search", companyController.companySearch);
router.get(
  "/companyCTCSearch/:CTCsearch",
  auth,
  companyController.companyCTCSearch
);
router.get("/islike/:email", auth, companyController.islike);
router.get("/like/:email", auth, companyController.like);
router.get("/countlike", auth, companyController.countlike);
router.get(
  "/company/available/:companyID",
  companyController.companyAvailableReport
);
router.get(
  "/companySearch/:companyID/:year",
  auth,
  companyController.specificCompanyData
);
router.get("/QuestionCompanyList", companyController.QuestionCompanyList);
router.get("/CompanyQuestion/:id", companyController.CompanyQuestion);
router.get(
  "/requestResetPassword/:email",
  loginController.requestResetPassword
);
router.post("/ResetPassword/", loginController.resetPassword);
router.post("/feedback", companyController.feedback);
router.get("/views", loginController.views);

router.get("/test/all", testController.fetchAllTest);
router.get("/test/:TestID", testController.fetchQuestion);
router.get("/year", auth, companyController.reportYearWise);
module.exports = router;
