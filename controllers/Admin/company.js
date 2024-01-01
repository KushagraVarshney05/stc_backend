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

module.exports = {
  addCompany,
};
