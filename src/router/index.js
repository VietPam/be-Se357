import { errorHandler,URLNotExistHandler } from "../middleware/errorHandler.js";
import express from "express";
import api from "./api/index.js"

export function wrapTheApp(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(api);
  app.use(URLNotExistHandler);
  app.use(errorHandler);
}
