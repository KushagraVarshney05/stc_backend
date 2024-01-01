const db = require("../../config/db");

const addCompany = async (req, res) => {
  const {
    companyName,
    companyClass,
    companyDescription,
    companyEstablishment,
    companyWebsite,
    companyAddedBy,
    imageID,
  } = req.body;

  try {
    const data = await db
      .promise()
      .query(
        `INSERT INTO company (companyName, companyClass,companyDescription,companyEstablishment,companyWebsite,companyAddedBy) VALUES ('${companyName}', '${companyClass}','${companyDescription}','${companyEstablishment}','${companyWebsite}','${companyAddedBy}')`
      );

    res.status(201).json({ data: data[0] });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

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
const upadteCompany = async (req,res,next) => {
  const {companyID} = req.params;
  const {
    companyName,
    companyClass,
    companyDescription,
    companyEstablishment,
    companyWebsite,
    companyAddedBy,
    imageID,
  } = req.body;

  try {
    const data = await db
      .promise()
      .query(
        `UPDATE company SET companyName = '${companyName}', companyClass = '${companyClass}', companyDescription = '${companyDescription}', companyEstablishment = '${companyEstablishment}', companyWebsite = '${companyWebsite}', companyAddedBy = '${companyAddedBy}' WHERE companyID = ${parseInt(companyID)}`
      );

    res.status(201).json({ data: data[0] });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
const deleteCompany = async (req,res,next) => {
  const {companyID} = req.params;
  try {
    const data = await db
      .promise()
      .query(
        `DELETE FROM company WHERE companyID = ${parseInt(companyID)}`
      );

    res.status(201).json({ data: data[0] });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
const getCompany = async (req,res,next) => {
  const {companyID} = req.params;
  try {
    const data = await db
      .promise()
      .query(
        `SELECT *
        FROM company
        LEFT JOIN class ON company.companyClass = class.classID
        LEFT JOIN users ON company.companyAddedBy = users.userID WHERE companyID = ${parseInt(companyID)}`
      );

    res.status(201).json({ data: data[0] });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};


module.exports = {
  addCompany,
  getCompanyData,
  upadteCompany,
  deleteCompany,
  getCompany
};
