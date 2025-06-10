import express from "express";
import { getHello } from "../controllers/test.controller";

const router = express.Router();

router.get("/", getHello);

export default router;
