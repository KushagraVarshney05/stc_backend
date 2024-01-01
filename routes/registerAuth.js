const express = require("express");
const { loginAdmin, registerAdmin } = require("../controllers/loginAdmin");

const router = express.Router();

const adminAuth = require("../middlewares/admin_auth");

router.post("/loginAdmin", loginAdmin);
router.post("/registerAdmin", adminAuth, registerAdmin);

// router.route("/loginAdmin").post(loginAdmin);
// router.route("/registerAdmin").post(adminAuth, registerAdmin);

module.exports = router;
