require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./src/routes/route")
const cors = require("cors")
const allowedCors = require("./src/helpers/cors")


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

var whitelist = ['http://localhost:3000/', 'http://example2.com/']
var corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate))
app.use(routes, cors(corsOptionsDelegate))


app.listen(process.env.APP_PORT, () => console.log(`Server running at port ${process.env.APP_PORT}`))
