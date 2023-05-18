const db = require("../config/db");
const counting = async(req,res, next) =>{
    const date = JSON.stringify(new Date).split('T')[0].split('"')[1];
    await db.promise().query(`Insert into Views values("${date}")`)
    next();
}
module.exports = counting;