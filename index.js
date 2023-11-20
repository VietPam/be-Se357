const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const route = require("./src/router/index");

app.use(morgan("tiny"));

require("dotenv").config();

const cors = require("cors");
app.use(cors());
app.use(express.json());
route(app);

mongoose
  .connect(process.env.connectionMongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB is connected!");
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 5001;

app.listen(port, () => {
console.log("server listening on port ", port);
});

