const db = require("./config/db");
const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const xlsxFile = require('read-excel-file/node');

const getdata = async () => {
    console.log("HI");
    try{

        const data = await db.promise().query(`SELECT Student.KIET_EMAIL from Student OUTER JOIN StudentTable ON Student.KIET_EMAIL = StudentTable.email WHERE StudentTable.email IS NULL`);

        console.log(data[0][0])
    }catch(e)
    {
        console.log(e)
    }
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
}
// getdata();

xlsxFile('./mca.xlsx')
  .then((rows) => {
    const columnNames = rows.shift(); // Separate first row with column names
    const objs = rows.map((row) => { // Map the rest of the rows into objects
      return {
        email: row[5],
        userName: row[2]
      }
      //console.log(objs); // Display the array of objects on the console
    });
    console.log(objs);
    objs.map(async(d)=>{
             const userName = d.userName;
             const email = d.email;
             const Password = generator.generate({
                length: 7,
                numbers: true
            });
            try{
        
                const hashPassword = bcrypt.hashSync(Password,10,);
                if(email)
                {

                    await db.promise().query(`INSERT INTO StudentTable(userName, email, Password) values("${userName}","${email}","${hashPassword}")`);
                    //console.log("add "+ userName + " "+ email + " " + hashPassword);
                }
            }catch(e){
                console.log(e)
            }
            // console.log(hashPassword)
            //console.log("HI")
           })
  });

