const { ADMIN_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
class AdminJwtService {
  static sign(payload, expiry = "1y", secret = ADMIN_SECRET) {
    console.log(ADMIN_SECRET);
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
  static verify(token, secret = ADMIN_SECRET) {
    return jwt.verify(token, secret);
  }
}
module.exports = AdminJwtService;
