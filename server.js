const express = require("express");
const { APP_PORT } = require("./config/index");
const errorHandler = require("./middlewares/errorHandler");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const app = express();
const db = require("./config/db");
const { QueryTypes } = require("sequelize");
//const worker = require("./scheduler/worker")
//const kue = require("./scheduler/kue")
const routes = require("./routes/index.js");

const adminRoutes = require("./routes/registerAuth");
const cors = require("cors");

app.use(compression());
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);

app.get("/yashvarshney", async (req, res) => {
  const data = await db.promise().query(`SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'stcdatabase';
        `);
  res.status(201).send({ data: data });
});

app.listen(APP_PORT, () => {
  console.log(`Port Running at ${APP_PORT}`);
});
