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

module.exports = {
  addCompany,
  getCompanyData,
};
