import express from "express";
import { tempTest } from "../controllers/tempController.js";
import { tempException } from "../controllers/tempController.js";

export const tempRouter = express.Router();

tempRouter.get('/test', tempTest);

tempRouter.get('/exception/:flag', tempException);