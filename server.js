const express = require('express');
const {APP_PORT} = require("./config/index");
 const errorHandler = require("./middlewares/errorHandler");
const bodyParser = require('body-parser');
const compression = require("compression");
const helmet = require("helmet");
const app = express();
//const worker = require("./scheduler/worker")
//const kue = require("./scheduler/kue")
const routes = require("./routes/index.js");
const cors = require("cors");

app.use(compression());
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.json());
 app.use('/api',routes);

app.use(errorHandler);

app.listen(APP_PORT,()=>{
    console.log(`Port Running at ${APP_PORT}`);
})
