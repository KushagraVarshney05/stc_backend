const CustomErrorHandler = require("../services/CustomErrorHandler");
const JwtService = require("../services/JwtService");
const mysql = require("mysql");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const mail = require("../sendMail");
const { uuid } = require("uuidv4");
const kue = require("../scheduler/kue");
const loginController = {
  async views(req, res, next) {
    try {
      const data = await db
        .promise()
        .query(`SELECT count(*) as count FROM Views`);
      //console.log(data[0][0].count);
      const count = data[0][0].count + 374;
      res.json({ count });
    } catch (e) {
      res.json({ e });
    }
    //const count = data[0].count+375;
  },
  async login(req, res, next) {
    const { LibraryID, Password } = req.body;
    const course = "B.Tech";
    console.log(LibraryID, Password);
    if (LibraryID && Password) {
      try {
        const data = await db
          .promise()
          .query(`Select * from StudentTable where email = '${LibraryID}'`);
        console.log(data[0][0]);
        if (!data[0]) {
          //console.log("HI")
          return next(CustomErrorHandler.wrongCredentials());
        }

        //console.log(hashPassword)
        const comp = await bcrypt.compare(Password, data[0][0].Password);
        console.log(comp);
        if (comp === false) {
          //console.log(Password, data[0].Password)
          return next(CustomErrorHandler.wrongCredentials());
        }
        const access_token = JwtService.sign({
          LibraryID,
          data: data[0][0].userName,
        });

        const search = await db
          .promise()
          .query("SELECT * FROM activeUser WHERE Email = ?", [
            data[0][0].email,
          ]);
        console.log(search[0]);
        try {
          if (search[0].length > 0) {
            console.log(search[0][0].Count);
            let count = search[0][0].Count + 1;
            const storeCount = await db
              .promise()
              .query(
                "UPDATE activeUser SET Count = ? WHERE Email = ? and Name=?",
                [count, data[0][0].email, data[0][0].userName]
              );
          } else {
            console.log("HI");
            let count = 1;
            const storeCount = await db
              .promise()
              .query(
                "INSERT INTO activeUser (Name, Email, Course, Count) VALUES (?, ?, ?, ?)",
                [data[0][0].userName, data[0][0].email, course, count]
              );
          }
        } catch (error) {
          console.error("Error executing SQL query:", error);
          // Handle the error as needed, for example, log it or throw a custom error.
        }

        res.status(201).json({ access_token });
      } catch (e) {
        return next(CustomErrorHandler.serverError());
      }
    } else {
      return next(CustomErrorHandler.wrongCredentials());
    }
  },
  async requestResetPassword(req, res, next) {
    console.log("HI");
    const { email } = req.params;
    try {
      const data = await db
        .promise()
        .query(
          `SELECT COUNT(email) as val FROM StudentTable WHERE email='${email}'`
        );

      const count = data[0][0].val;
      console.log(count);
      if (count > 0) {
        try {
          console.log(2);
          const data = await db
            .promise()
            .query(
              `SELECT COUNT(email) as val FROM RESETTOKEN where email="${email}"`
            );
          if (data[0][0].val > 0) {
            await db
              .promise()
              .query(`DELETE FROM RESETTOKEN where email="${email}"`);
          }
          const token = uuid();
          try {
            await db
              .promise()
              .query(
                `Insert into RESETTOKEN(email,token,expiryTime) values("${email}","${token}","${
                  Date.now() + 3600000
                }")`
              );
          } catch (e) {
            res.status(500).json({ success: false });
          }
          const args = {
            jobName: "sendSystemEmailJob",
            time: Date.now(),
            params: {
              email,
              name: email,
              link: `http://www.kietconnectx.com/reset/${token}`,
              mailType: "reset-pwd-link",
            },
          };
          kue.scheduleJob(args);
          res.status(200).json({ success: true });
        } catch (e) {
          res.status(500).json({ success: false });
        }
      }
    } catch (e) {
      res.status(500).json({ success: false });
    }
  },
  async resetPassword(req, res, next) {
    const { token, password } = req.body;
    try {
      console.log(1);
      const data = await db
        .promise()
        .query(
          `SELECT COUNT(token) as val FROM RESETTOKEN where token="${token}"`
        );
      console.log(2);
      console.log(data[0][0]);
      if (data[0][0].val > 0) {
        console.log(3);
        try {
          console.log(4);
          const details = await db
            .promise()
            .query(
              `Select expiryTime,email from RESETTOKEN where  token="${token}"`
            );
          const expiryTime = details[0][0].expiryTime;
          const email = details[0][0].email;
          console.log(5);
          if (expiryTime < Date.now()) {
            console.log(6);
            try {
              console.log(7);
              const hashPassword = bcrypt.hashSync(password, 10);
              console.log(hashPassword);
              console.log(password);
              db.promise().query(
                `Update StudentTable SET Password="${hashPassword}" where email="${email}"`
              );
              console.log(8);
            } catch (e) {
              console.log(9);
              return next(CustomErrorHandler.serverError());
            }
          } else {
            console.log(10);
            res.status(403).json({ success: false, err: "Token expire" });
            console.log(11);
          }
          try {
            console.log(12);
            await db
              .promise()
              .query(`DELETE FROM RESETTOKEN where email="${email}"`);
            console.log(13);
            res.status(200).json({ success: true });
          } catch (e) {
            console.log(14);
            res.status(500).json({ err: "DELETE FROM RESETTOKEN" });
            console.log(15);
          }
        } catch (e) {
          console.log(16);
          return next(CustomErrorHandler.serverError());
          console.log(17);
        }
      } else {
        return next(CustomErrorHandler.serverError());
      }
    } catch (e) {
      return next(CustomErrorHandler.serverError());
    }
  },
};
module.exports = loginController;
