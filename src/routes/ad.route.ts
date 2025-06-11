import express from "express";
import { getAllAds, getAdById, createAd, updateAd, delAdById } from "../controllers/ads.controller";

const router = express.Router();

router.get("/", getAllAds);
router.get("/:id", getAdById);
router.post("/", createAd);
router.patch("/:id", updateAd);
router.delete("/:id", delAdById);

export default router;