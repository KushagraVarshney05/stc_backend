const CustomErrorHandler = require("../services/CustomErrorHandler");
const JwtService = require("../services/JwtService");
const AdminJwtService = require("../services/AdminJwtService");
const mysql = require("mysql");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const mail = require("../sendMail");
const { v4: uuid_v4 } = require("uuid");

const kue = require("../scheduler/kue");

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const data = await db
        .promise()
        .query(`SELECT * FROM users WHERE userEmail='${email}'`);

      if (!data[0]) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      console.log(data[0][0].userPassword);
      const comp = await bcrypt.compare(password, data[0][0].userPassword);
      const hashed = await bcrypt.hash(password, 10);
      console.log(password, hashed, data[0][0].userPassword);
      console.log(comp);
      if (comp === false) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      console.log(data[0][0].userName);
      const access_token = AdminJwtService.sign({
        email,
        data: data[0][0].userName,
        userType: data[0][0].userType,
      });

      res.status(201).json({ access_token });
    } catch (e) {
      return next(CustomErrorHandler.serverError());
    }
  } else {
    return next(CustomErrorHandler.wrongCredentials());
  }
};

const registerAdmin = async (req, res, next) => {
  const { email, password, name, type } = req.body;

  if (req.user.userType === "Admin") {
    return next(CustomErrorHandler.unAuthorized());
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userId = uuid_v4();
    const user = {
      userId,
      userEmail: email,
      userPassword: hashedPassword,
      userName: name,
      userType: type,
    };
    await db.promise().query("INSERT INTO users SET ?", user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return next(CustomErrorHandler.serverError());
  }
};

module.exports = {
  loginAdmin,
  registerAdmin,
};
