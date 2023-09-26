const express = require("express");
const app = express();
const mongoose = require("mongoose")
const morgan = require("morgan");
const route = require('./src/router/index');
//Logging in console
app.use(morgan("tiny"));

//env variables
require("dotenv").config();
//CORS
var cors = require("cors");
app.use(cors());
app.use(express.json())
route(app);

mongoose
    .connect(process.env.connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then( ()=>{
        console.log("MongoDB is connected!");
    })
    .catch((err)=>console.log(err));
app.get('/',(req,res)=> res.send("Hello from viet"))

const port = process.env.PORT || 5001
var server = app.listen(port,()=>{
    var port = server.address().port;
    console.log("server listening on port ",port);
})
