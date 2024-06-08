import express from "express";
import { addStoreMission } from "../controllers/missionController.js";
import expressAsyncHandler from "express-async-handler";

export const missionRouter = express.Router();

missionRouter.post('/add', expressAsyncHandler(addStoreMission));
