import express from "express";
import {
    getAllItems,
    getItemById,
    createItem,
    patchItemById,
    supprItemById,
} from "../controllers/item.controller";

const router = express.Router();

router.get("/", getAllItems);
router.get("/:id", getItemById);
router.post("/", authMiddleware, createItem);
router.patch("/:id", authMiddleware, patchItemById);
router.delete("/:id", authMiddleware, supprItemById);

export default router;
