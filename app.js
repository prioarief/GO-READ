require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./src/routes/route")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(routes)

app.listen(process.env.APP_PORT, () => console.log(`Server running at port ${process.env.APP_PORT}`))
