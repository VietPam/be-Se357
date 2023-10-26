const express = require("express");
const app = express();
const mongoose = require("mongoose")
const morgan = require("morgan");
const route = require('./src/router/index');
//swagger
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
app.get('/',(req,res)=> res.send("Server khỏe vcl"))

/** Swagger Initialization - START */
const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
      info: {
        title: "my-posts",
        description: "API documentation",
        contact: {
          name: "Developer",
        },  
        servers: ["http://localhost:8000/"],
      },
    }),
    apis: ["index.js", "./src/router/*.js"],
  };
  
  const swaggerDocs = swaggerJsdoc(swaggerOption);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  /** Swagger Initialization - END */
const port = process.env.PORT || 5001
var server = app.listen(port,()=>{
    var port = server.address().port;
    console.log("server listening on port ",port);
})
