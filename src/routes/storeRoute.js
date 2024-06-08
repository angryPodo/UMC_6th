import express from "express";
import { storeAdd } from "../controllers/storeController.js";

export const storeRouter = express.Router();

storeRouter.post('/add', storeAdd);