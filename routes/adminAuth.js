const express = require("express");
const { loginAdmin, registerAdmin } = require("../controllers/loginAdmin");

const router = express.Router();

const adminAuth = require("../middlewares/admin_auth");

const { addCompany,
    getCompanyData,
    updateCompany,
    deleteCompany,
    getCompany  } = require("../controllers/Admin/company");

router.post("/loginAdmin", loginAdmin);
router.post("/registerAdmin", adminAuth, registerAdmin);
router.get("/getCompanyData", adminAuth, getCompanyData);
router.post("/addCompany", adminAuth, addCompany);
router.post("/updateCompany/:id", adminAuth, updateCompany);
router.get("/getCompany/:id", adminAuth, getCompany);
router.delete("/deleteCompany", adminAuth, deleteCompany);


module.exports = router;
