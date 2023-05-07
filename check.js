const bcrypt = require("bcrypt");
// bcrypt.hash("asdfgh", 10, (error, hash) => { // encoding password 
//   if (error) console.log(error);
//   console.log(hash);
// })
// bcrypt.hash("asdfgh", 10, (error, hash) => { // encoding password 
//   if (error) console.log(error);
//   console.log(hash);
// })
// bcrypt.compare("asdfgh","$2b$10$0wUSQ3tCNQB9MldsCadV1.lywRHC6LhEFSLwR2v9MbTvCjj4hlSSy",(error, result) => { 
//   if (error) console.log(error);
//   console.log(result);  // result is true when password and hashedPassword match
// });