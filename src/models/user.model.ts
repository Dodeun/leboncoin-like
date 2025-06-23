import bcrypt from "bcrypt";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { UserPayload, User, UserWithPassword } from "../types/user.types";
import { db } from "./db";

const SALT_ROUNDS = 10;

export const findUserByEmail = async (
    email: string
): Promise<UserWithPassword> => {
    const [rows] = await db.query<UserWithPassword[] & RowDataPacket[]>(
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
        SELECT id, email, name, city, phone, created_at
        FROM user
        WHERE user_id = ?;
        `,
        [id]
    );
    return rows[0];
};

export const insertUser = async (data: UserPayload): Promise<User> => {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
    const [result] = await db.query<ResultSetHeader>(
        `
        INSERT INTO user (name, email, password, city, phone)
        VALUES (?,?,?,?,?);
        `,
        [data.email, hashedPassword, data.name, data.city, data.phone || null]
    );
    const id = result.insertId;
    return findUserById(id);
};

export const updateUserById = async (
    id: number,
    data: Partial<UserPayload>
): Promise<User | null> => {
    // If the update contains the password
    let hashedPassword: string | undefined;
    if (data.password) {
        hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
    }

    const fields = [];
    const values: (string | number | null)[] = [];

    if (data.name) {
        fields.push("name = ?");
        values.push(data.name);
    }
    if (data.email) {
        fields.push("email = ?");
        values.push(data.email);
    }
    if (hashedPassword) {
        fields.push("password = ?");
        values.push(hashedPassword);
    }
    if (data.city) {
        fields.push("city = ?");
        values.push(data.city);
    }
    if (data.phone) {
        fields.push("phone = ?");
        values.push(data.phone);
    }

    if (fields.length === 0) {
        return findUserById(id);
    }

    values.push(id);

    const sql = `
    UPDATE user
    SET ${fields.join(", ")}
    WHERE user_id = ?`;

    const [result] = await db.query<ResultSetHeader>(sql, values);

    if (result.affectedRows === 0) {
        return null;
    }

    return findUserById(id);
};

export const deleteUserById = async (id: number): Promise<Boolean> => {
    const [result] = await db.query<ResultSetHeader>(
        `
        DELETE FROM user
        WHERE user_id = ?`,
        [id]
    );

    return result.affectedRows > 0;
};
