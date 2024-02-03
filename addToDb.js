const db = require("./config/db");
const bcrypt = require("bcryptjs");
const generator = require("generate-password");
const xlsxFile = require("read-excel-file/node");
const xlsx = require("xlsx");

const getdata = async () => {
  console.log("HI");
  //   try {
  //     const data = await db
  //       .promise()
  //       .query(
  //         `SELECT Student.KIET_EMAIL from Student OUTER JOIN StudentTable ON Student.KIET_EMAIL = StudentTable.email WHERE StudentTable.email IS NULL`
  //       );

  //     console.log(data[0][0]);
  //   } catch (e) {
  //     console.log(e);
  //   }
  //    data[0].map(async(d)=>{
  //      const userName = d.NAME;
  //      const email = d.KIET_EMAIL;
  //      const Password = generator.generate({
  //         length: 7,
  //         numbers: true
  //     });
  //     try{

  //         const hashPassword = bcrypt.hashSync(Password,10,);
  //         console.log("add "+ email + " " + hashPassword);
  //         await db.promise().query(`INSERT INTO StudentTable(userName, email, Password) values("${userName}","${email}","${hashPassword}")`);
  //     }catch(e){
  //         console.log(e)
  //     }
  //     // console.log(hashPassword)
  //     //console.log("HI")
  //    })
  //console.log(data[0]);
};
// getdata();
const upload = async (req, res, next) => {
  try {
    const rows = await xlsxFile("./mca.xlsx");
    const columnNames = rows.shift(); // Separate first row with column names

    const objs = rows.map((row) => {
      // Map the rest of the rows into objects
      return {
        email: row[5],
        userName: row[2],
      };
    });

    const insertPromises = objs.map(async (d) => {
      const userName = d.userName;
      const email = d.email;
      const Password = generator.generate({
        length: 7,
        numbers: true,
      });
      const Course = "B.Tech";
      const hashPassword = bcrypt.hashSync(Password, 10);

      if (email) {
        await db
          .promise()
          .query(
            "INSERT INTO StudentTable(userName, email, Password, Course) values(?, ?, ?, ?)",
            [userName, email, hashPassword, Course]
          );

        // Add the generated password to the Excel file
        const rowIndex = rows.findIndex((row) => row[5] === email);
        if (rowIndex !== -1) {
          rows[rowIndex].push(Password); // Store the real password
        }
      }
    });

    await Promise.all(insertPromises);

    // Write back to the Excel file
    const updatedWorkbook = xlsx.utils.book_new();
    const updatedSheet = xlsx.utils.aoa_to_sheet([columnNames, ...rows]);
    xlsx.utils.book_append_sheet(updatedWorkbook, updatedSheet, "Sheet1");
    xlsx.writeFile(updatedWorkbook, "./data.xlsx");

    res.status(201).send({ data: "Data Added" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  getdata,
  upload,
};
