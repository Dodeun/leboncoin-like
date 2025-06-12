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

export const insertUser = async (
    newUser: NewUserPayload
): Promise<User | undefined> => {
    const fields = Object.keys(newUser);
    const values = Object.values(newUser);

    if (fields.length === 0) {
        return undefined;
    }

    const connectingElement = values.map(() => "?").join(", ");
    const sqlQuery = `
    INSERT INTO user (${fields.join(", ")}) VALUES (${connectingElement})`;

    const [result] = await db.query<ResultSetHeader>(sqlQuery, values);

    const user = await findUserById(result.insertId);

    return user;
};
