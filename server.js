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

app.use(cors());
app.use(express.json());
 app.use('/api',routes);
app.use(errorHandler);

app.listen(APP_PORT,()=>{
    console.log(`Port Running at ${APP_PORT}`);
})
