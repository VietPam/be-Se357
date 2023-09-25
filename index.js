const express = require("express");
const app = express();
const mongoose = require("mongoose")
const morgan = require("morgan");
const home = require("./routes/home")
//Logging in console
app.use(morgan("tiny"));

//env variables
require("dotenv").config();
//CORS
var cors = require("cors");
app.use(cors());
app.get('/',(req,res)=> res.send("Hello from viet"))

var productRouter = require('./router/productRouter');
app.use("/api/product",productRouter)

mongoose
    .connect(process.env.connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then( ()=>{
        console.log("MongoDB is connected!");
    })
    .catch((err)=>console.log(err));

app.use("/home", home);

const port = process.env.PORT || 5001
var server = app.listen(port,()=>{
    var port = server.address().port;
    console.log("server listening on port ",port);
})
