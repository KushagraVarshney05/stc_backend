const db = require("./config/db");
const bcrypt = require('bcryptjs');
const generator = require('generate-password');

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
getdata();


// SELECT Student.KIET_EMAIL from Student INNER JOIN StudentTable where Student.KIET_EMAIL != StudentTable.email;

// aastha.2024bph1085@kiet.edu
// aastha.2024bph1074@kiet.edu
// abhay.2024bph1099@kiet.edu
// abhishek.2024bph1027@kiet.edu
// afzal.2024bph1025@kiet.edu
// akansha.2024bph1075@kiet.edu
// akshay.2024bph1088@kiet.edu
// aman.2024bph1054@kiet.edu
// amit.2024bph1016@kiet.edu
// amit.2024bph1077@kiet.edu
// anchal.2024bph1053@kiet.edu
// anirudh.2024bph1098@kiet.edu
// anmol.2024bph1008@kiet.edu
// anubhav.2024bph1076@kiet.edu
// anushka.2024bph1024@kiet.edu
// apurva.2024bph1045@kiet.edu
// arshalan.2024bph1001@kiet.edu
// aryan.2024bph1083@kiet.edu
// aryan.2024bph1005@kiet.edu
// ashish.2024bph1065@kiet.edu
// ashutosh.2024bph1030@kiet.edu
// ashwin.2024bph1105@kiet.edu
// ayush.2024bph1096@kiet.edu
// ayushmann.2024bph1092@kiet.edu
// deep.2024bph1066@kiet.edu