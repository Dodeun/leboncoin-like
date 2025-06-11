import express from "express";
import { getUserByEmail, getUserById, createUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/:mail", getUserByEmail);
router.get("/:id", getUserById);
router.post("/", createUser);

export default router;