const { ADMIN_SECRET } = require("../config");
const CustomErrorHandler = require("../services/CustomErrorHandler");
// const JwtService = require("../services/JwtService");
const AdminJwtService = require("../services/AdminJwtService");

const adminAuth = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  //console.log(authHeader);
  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized());
  }
  const token = authHeader.split(" ")[1];
  try {
    const adminVerfied = await AdminJwtService.verify(token, ADMIN_SECRET);

    req.user = { userType: adminVerfied.userType, email: adminVerfied.email };
    next();
  } catch (err) {
    return next(CustomErrorHandler.unAuthorized());
  }
};
module.exports = adminAuth;
