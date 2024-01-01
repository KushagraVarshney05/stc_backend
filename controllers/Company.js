const CustomErrorHandler = require("../services/CustomErrorHandler");
const mysql = require("mysql");
const db = require("../config/db");
const getCompanyData = async (req,res,next) => {
    try {
        const data = await db
        .promise()
        .query(`SELECT *
        FROM company
        LEFT JOIN class ON company.companyClass = class.classID
        LEFT JOIN users ON company.companyAddedBy = users.userID`);

      if (!data[0]) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      

      return res.status(200).json({ success: true, data });
    } catch (error) {
        return next(CustomErrorHandler.serverError());
        }
};

module.exports = {
    getCompanyData,
};

