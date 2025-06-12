import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { NewUserPayload, UserLoginPayload } from "../types/user.types";
import { insertUser } from "../models/auth.model";

export const userRegister: RequestHandler<
    {},
    void | { error: string },
    NewUserPayload
> = async (req, res, next) => {
    const { name, email, password, city, phone_number } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await insertUser({
            name,
            email,
            hashedPassword,
            city,
            phone_number,
        });
        res.sendStatus(201);
    } catch (err: any) {
        if (err.code === "ER_DUP_ENTRY") {
            res.status(409).json({ error: "Email already used" });
            return;
        }
        next(err);
    }
};

export const userLogin: RequestHandler<
    {},
    { token: string } | void | { error: string },
    UserLoginPayload
> = async (req, res, next) => {};
