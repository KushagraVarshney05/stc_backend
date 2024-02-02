const db = require("../../config/db");
const CustomErrorHandler = require("../../services/CustomErrorHandler");
const bcrypt = require("bcryptjs");
const JwtService = require("../../services/JwtService");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const { Op } = require("sequelize");

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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await db
      .promise()
      .query("SELECT * FROM StudentTable WHERE email = ?", [email]);
    if (data[0].length === 0) {
      return next(CustomErrorHandler.notFound("No user with this email"));
    }
    const user = data[0][0];
    const match = await bcrypt.compare(password, user.Password);
    if (!match) {
      return next(CustomErrorHandler.wrongCredentials());
    }
    const accessToken = JwtService.sign({ id: user.id, email: user.email });
    res.status(200).json({ accessToken });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  activeCount,
  activeUser,
  login,
};
