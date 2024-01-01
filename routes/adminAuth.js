const express = require("express");
const { loginAdmin, registerAdmin } = require("../controllers/loginAdmin");

const router = express.Router();

const adminAuth = require("../middlewares/admin_auth");

const { addCompany } = require("../controllers/Admin/company");

router.post("/loginAdmin", loginAdmin);
router.post("/registerAdmin", adminAuth, registerAdmin);
router.post("/company", adminAuth, addCompany);

module.exports = router;
