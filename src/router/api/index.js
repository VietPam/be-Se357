const express = require("express");
const route = express.Router();

import authRouter from "./auth"

route.use("/auth",authRouter);
export default route;