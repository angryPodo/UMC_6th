import express from "express";
import { storeAdd, addStoreReview } from "../controllers/storeController.js";

export const storeRouter = express.Router();

storeRouter.post('/add', storeAdd);
storeRouter.post('/review', addStoreReview); // 새로운 리뷰 추가 라우트
