import { ResultSetHeader } from "mysql2";
import { NewUser, User } from "../types/user.types";
import { db } from "./db";
import { findUserById } from "./user.model";

export const insertUser = async ({
    name,
    email,
    hashedPassword,
    city,
    phone_number,
}: NewUser): Promise<User | undefined> => {
    const fields = ["name", "email", "password", "city", "phone_number"];
    const values = [name, email, hashedPassword, city, phone_number ?? null];

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
