const express = require("express");
const app = express();
const mongoose = require("mongoose")

app.get('/',(req,res)=> res.send("Hello from viet"))
var server = app.listen(5000, console.log("server listening on port 5000"))