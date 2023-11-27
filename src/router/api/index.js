import express from "express";
import authRouter from "./auth.js";
import buyerRouter from "./buyer.js";

const route = express.Router();


route.use("/auth", authRouter);
route.use("/buyer", buyerRouter);

export default route;
