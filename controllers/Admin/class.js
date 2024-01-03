const db = require("../../config/db");
const CustomErrorHandler = require("../../services/CustomErrorHandler");

const addClass = async (req, res) => {
  const { className } = req.body;

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

module.exports = {
  addClass,
};
