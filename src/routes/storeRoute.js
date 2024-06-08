import express from "express";
import asyncHandler from 'express-async-handler';
import { storeAdd } from "../controllers/storeController.js";

export const storeRouter = express.Router();

storeRouter.post('/add', asyncHandler(storeAdd));