const express = require('express');
const {APP_PORT} = require("./config/index");
 const errorHandler = require("./middlewares/errorHandler");
const bodyParser = require('body-parser');
//const connectDB = require('./config/db');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const routes = require("./routes/index.js");
//const routes = require('./routes/index');
const cors = require("cors");
var count=0;
const counting =(req,res,next)=>{
   ++count;
   console.log(count);
   next();
}
app.use(cors());
app.use(express.json());
 app.use('/api',counting,routes);
app.get('/views',(req,res)=>{
    res.json({count});
})
app.use(errorHandler);

app.listen(APP_PORT,()=>{
    console.log(`Port Running at ${APP_PORT}`);
})
