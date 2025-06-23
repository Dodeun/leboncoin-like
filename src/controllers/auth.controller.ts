import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { UserPayload, User, UserWithPassword } from "../types/user.types";
import { findUserByEmail, insertUser } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1h";

export const register: RequestHandler<
    {},
    User | { error: string },
    UserPayload
> = async (req, res, next) => {
    try {
        const data: UserPayload = req.body;
        if (!data.email || !data.name || !data.password || !data.city) {
            res.status(400).json({ error: "Required fields missing" });
            return;
        }

        const existingUser: User = await findUserByEmail(data.email);
        if (existingUser) {
            res.status(409).json({ error: "Email already used" });
            return;
        }

        const newUser: User = await insertUser(data);
        res.status(201).json(newUser);
    } catch (err: any) {
        next(err);
    }
};

export const userLogin: RequestHandler<
    {},
    { token: string; user: User } | { error: string },
    { email: string; password: string }
> = async (req, res, next) => {
    try {
        const { email, password: inputPassword } = req.body;
        if (!email || !inputPassword) {
            res.status(400).json({ error: "Email and password required" });
            return;
        }

        const user: UserWithPassword = await findUserByEmail(email);
        if (!user) {
            res.status(401).json({ error: "User does not exist" });
            return;
        }

        const hashedPassword = user.password;
        const isValid = await bcrypt.compare(inputPassword, hashedPassword);
        if (!isValid) {
            res.status(401).json({ error: "Wrong password" });
            return;
        }

        if (!JWT_SECRET) {
            res.status(500).json({ error: "JWT secret is not configured" });
            return;
        }
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        const { password, ...userWithoutPassword } = user;

        res.status(200).json({ token, user: userWithoutPassword });
    } catch (err) {
        next(err);
    }
};
