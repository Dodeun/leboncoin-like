import { RequestHandler } from "express-serve-static-core";
import { UserPayload, User } from "../types/user.types";
import {
    deleteUserById,
    findUserByEmail,
    findUserById,
    insertUser,
    updateUserById,
} from "../models/user.model";

// This shoudl be in auth.controller apparently
// export const getUserByEmail: RequestHandler<
//     { email: string },
//     User | { error: string }
// > = async (req, res, next) => {
//     try {
//         const user: User | undefined = await findUserByEmail(req.params.email);
//         if (!user) {
//             res.status(404).json({ error: "Utilisateur introuvable" });
//             return;
//         }
//         res.status(200).json(user);
//     } catch (err) {
//         next(err);
//     }
// };

// GET /api/users/:id
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

// This shoudl be in auth.controller apparently
// export const createUser: RequestHandler<
//     {},
//     User | { error: string },
//     UserPayload
// > = async (req, res, next) => {
//     try {
//         const newUser: User | undefined = await insertUser(req.body);
//         if (!newUser) {
//             res.status(404).json({ error: "User could not be found" });
//             return;
//         }
//         res.status(201).json(newUser);
//     } catch (err) {
//         next(err);
//     }
// };

// PATCH /api/users/:id
export const updateUser: RequestHandler<
    { id: string },
    User | { error: string },
    Partial<UserPayload>
> = async (req, res, next) => {
    try {
        const parsedId = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            res.status(400).json({ error: "Id is not a number" });
            return;
        }

        const fieldsToUpdate: Partial<UserPayload> = req.body;

        if ("password" in fieldsToUpdate && !fieldsToUpdate.password) {
            res.status(400).json({ error: "Password can't be empty" });
            return;
        }

        const updatedUser: User | null = await updateUserById(
            parsedId,
            fieldsToUpdate
        );
        if (!updatedUser) {
            res.status(404).json({ error: "User could not be found" });
            return;
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

// DELETE /api/users/:id
export const deleteUser: RequestHandler<
    { id: string },
    void | { error: string }
> = async (req, res, next) => {
    try {
        const parsedId = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            res.status(400).json({ error: "Id is not a number" });
            return;
        }

        const deleted = await deleteUserById(parsedId);
        if (!deleted) {
            res.status(404).json({ error: "User could not be found" });
        }

        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};
