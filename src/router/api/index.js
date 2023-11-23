import express from "express";
const route = express.Router();

import authRouter from "./auth.js"

route.use("/auth",authRouter);
export default route;