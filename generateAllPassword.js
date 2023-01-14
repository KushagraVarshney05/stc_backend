const mysql  = require('mysql');
const db = require("./config/db");
const generator = require('generate-password');

const generatePassword = async() => {

   var password = generator.generate({
	length: 7,
	numbers: true,
    
   });
   return password;
}

async function storeDatabase(){
    try{
        const data = await db.promise().query(`SELECT KIET_EMAIL from Student`);
        //console.log(data[0]);
        await data[0].map(async(e)=>{
            const password = await generatePassword();
            const query = `Update Student SET Password="${password}" where KIET_EMAIL = "${e.KIET_EMAIL}"`;
            console.log(query);
            await db.promise().query(query);
        })
    }catch(e){
        console.log(e)
    }
    console.log("DONE");
}
storeDatabase();

// module.exports = generatePassword;