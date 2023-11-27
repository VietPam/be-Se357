import express from "express";
const route = express.Router();

import authRouter from "./auth.js";
import buyerRouter from "./buyer.js";

route.use("/auth", authRouter);
route.use("/buyer", buyerRouter);

export default route;
