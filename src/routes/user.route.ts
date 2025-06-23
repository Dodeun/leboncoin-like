import express from "express";
import {
    deleteUser,
    getUserById,
    updateUser,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/:id", authMiddleware, getUserById);
router.patch("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
