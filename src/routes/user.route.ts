import express from "express";
import { getUserByEmail, getUserById } from "../controllers/user.controller";

const router = express.Router();

router.get("/:mail", getUserByEmail);
router.get("/:id", getUserById);

export default router;
