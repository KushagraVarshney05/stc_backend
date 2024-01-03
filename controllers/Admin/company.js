const db = require("../../config/db");

const addCompany = async (req, res) => {
  console.log(req.body);  
  const {
    companyName,
    companyClass,
    companyDescription,
    companyEstablishment,
    companyWebsite,
    companyAddedBy,
  } = req.body;
  

  try {

    const data = await db
      .promise()
      .query(
        `INSERT INTO company (companyName, companyClass,companyDescription,companyEstablishment,companyWebsite,companyAddedBy) VALUES ('${companyName}', '${companyClass}','${companyDescription}','${companyEstablishment}','${companyWebsite}','${companyAddedBy}')`
      );

    res.status(201).json({ data: data[0] });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};
const getCompanies = async (req, res, next) => {
  try {
    const data = await db.promise().query(`SELECT *
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
const updateCompany = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.body);

  const {
    companyName,
    companyDescription,
    companyEstablishment,
    companyWebsite,
  } = req.body;

  try {
    const data = await db
      .promise()
      .query(
        `UPDATE company SET companyName = ?, companyDescription = ?, companyEstablishment = ?, companyWebsite = ? WHERE companyID = ?`,
        [
          companyName,
          companyDescription,
          companyEstablishment,
          companyWebsite,
          id,
        ]
      );

    res.status(201).json({ data: data[0] });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};
const deleteCompany = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  try {
    // Delete child rows first
    await db
      .promise()
      .query(
        `DELETE FROM companydatadivided WHERE companyID = ${parseInt(id)}`
      );

    // Delete the company record
    const data = await db
      .promise()
      .query(`DELETE FROM company WHERE companyID = ${parseInt(id)}`);

    res.status(201).json({ data: data[0] });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};
const getCompany = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await db.promise().query(
      `SELECT *
        FROM company
        LEFT JOIN class ON company.companyClass = class.classID
        LEFT JOIN users ON company.companyAddedBy = users.userID WHERE company.companyID = ${parseInt(
          id
        )}`
    );

    res.status(201).json({ data: data[0] });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
const getCompanyName= async (req, res, next) => {
  try {
    const data = await db.promise().query(
      `SELECT companyID, companyName FROM company`
    );

    res.status(201).json({ data: data[0] });
  } catch (e) {
    res.status(400).json({ error: e });
  }
}



module.exports = {
  addCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
  getCompany,
  getCompanyName
};
