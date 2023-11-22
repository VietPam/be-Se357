import { errorHandler,URLNotExistHandler } from "../middleware/errorHandler";
import express from "express";
import api from "./api"

export function wrapTheApp(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(api);
  app.use(URLNotExistHandler);
  app.use(errorHandler);
}
