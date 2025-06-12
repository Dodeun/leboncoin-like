import { ResultSetHeader, RowDataPacket } from "mysql2";
import { NewUserPayload, User } from "../types/user.types";
import { db } from "./db";

export const findUserByEmail = async (email: string): Promise<User> => {
    const [rows] = await db.query<User[] & RowDataPacket[]>(
        `
        SELECT *
        FROM user
        WHERE email = ?;
        `,
        [email]
    );
    return rows[0];
};

export const findUserById = async (id: number): Promise<User> => {
    const [rows] = await db.query<User[] & RowDataPacket[]>(
        `
        SELECT *
        FROM user
        WHERE id = ?;
        `,
        [id]
    );
    return rows[0];
};
