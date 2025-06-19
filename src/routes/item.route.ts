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
router.post("/", createItem);
router.patch("/:id", patchItemById);
router.delete("/:id", supprItemById);

export default router;
