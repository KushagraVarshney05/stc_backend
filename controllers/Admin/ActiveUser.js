const db = require("../../config/db");
const CustomErrorHandler = require("../../services/CustomErrorHandler");

const activeCount = async (req, res, next) => {
  try {
    const data = await db
      .promise()
      .query(`SELECT count(*) as COUNT FROM activeUser`);
    res.status(201).send({ data: data[0] });
  } catch (e) {
    res.status(400).send({ error: e });
  }
};
const activeUser = async (req, res, next) => {
  try {
    const { name, email, course } = req.body;

    // Check if the user already exists
    const search = await db
      .promise()
      .query("SELECT * FROM activeUser WHERE Email = ?", [email]);

    if (search[0].length > 0) {
      let count = search[0][0].Count + 1;
      const data = await db
        .promise()
        .query("UPDATE activeUser SET Count = ? WHERE Email = ? and Name=?", [
          count,
          email,
          name,
        ]);

      res.status(201).send({ data: data[0] });
    } else {
      let count = 0;
      const data = await db
        .promise()
        .query(
          "INSERT INTO activeUser (Name, Email, Course, Count) VALUES (?, ?, ?, ?)",
          [name, email, course, count]
        );
      res.status(201).send({ data: data[0] });
    }
  } catch (e) {
    console.error(e); // Log the error for debugging purposes
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  activeCount,
  activeUser,
};
