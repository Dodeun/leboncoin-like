import { RequestHandler } from "express-serve-static-core";
import { NewUserPayload, User } from "../types/user.types";
import {
    findUserByEmail,
    findUserById,
    insertUser,
} from "../models/user.model";

export const getUserByEmail: RequestHandler<
    { email: string },
    User | { error: string }
> = async (req, res, next) => {
    try {
        const user: User | undefined = await findUserByEmail(req.params.email);
        if (!user) {
            res.status(404).json({ error: "Utilisateur introuvable" });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const getUserById: RequestHandler<
    { id: string },
    User | { error: string }
> = async (req, res, next) => {
    try {
        const parsedId: number = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            res.status(400).json({ error: "Id is not a number" });
            return;
        }

        const user: User | undefined = await findUserById(parsedId);
        if (!user) {
            res.status(404).json({ error: "User could not be found" });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const createUser: RequestHandler<
    {},
    User | { error: string },
    NewUserPayload
> = async (req, res, next) => {
    try {
        const newUser: User | undefined = await insertUser(req.body);
        if (!newUser) {
            res.status(404).json({ error: "User could not be found" });
            return;
        }
        res.status(200).json(newUser);
    } catch (err) {
        next(err);
    }
};
