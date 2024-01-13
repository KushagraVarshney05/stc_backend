const db = require("../../config/db");
const CustomErrorHandler = require("../../services/CustomErrorHandler");

const addClass = async (req, res) => {
  const { classID, className } = req.body;

  try {
    const data = await db
      .promise()
      .query(`INSERT INTO class (className) VALUES ('${className}')`);

    res.status(201).json({ data: data[0] });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};
const getClasses = async (req, res, next) => {
  try {
    const data = await db.promise().query(`SELECT * FROM class`);

    if (!data[0]) {
      return next(CustomErrorHandler.wrongCredentials());
    }

    return res.status(200).json({ success: true, data: data[0] });
  } catch (error) {
    return next(CustomErrorHandler.serverError());
  }
};

module.exports = {
  addClass,
  getClasses,
};
