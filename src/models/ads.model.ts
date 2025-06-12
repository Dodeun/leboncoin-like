import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Ad, NewAdInput } from "../types/ad.types";
import { db } from "./db";

export const findAllAds = async (): Promise<Ad[]> => {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM ad");
    return rows as Ad[];
};

export const findAdById = async (id: number): Promise<Ad> => {
    const [rows] = await db.query<RowDataPacket[]>(
        `
        SELECT *
        FROM ad
        WHERE ad_id = ?;
        `,
        [id]
    );
    return rows[0] as Ad;
};

export const insertAd = async ({
    title,
    description,
    price,
    user_id,
    category_id,
}: NewAdInput): Promise<void> => {
    const fields = ["title", "description", "price", "user_id", "category_id"];
    const values = [title, description, price, user_id, category_id];

    const connectingElement = values.map(() => "?").join(",");
    const sqlQuery = `
        INSERT INTO ad (${fields.join(",")})
        VALUES (${connectingElement});
    `;

    await db.query<ResultSetHeader>(sqlQuery, values);
};

export const patchAd = async (
    id: number,
    updateData: Partial<Ad>
): Promise<void | number> => {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);

    if (fields.length === 0) {
        throw new Error("No fields provided for update");
    }

    const connectingElement = fields.map((field) => `${field} = ?`).join(", ");
    const sqlQuery = `
        UPDATE ad
        SET ${connectingElement}, updated_at = NOW()
        WHERE ad_id = ?;
    `;

    const [result] = await db.query<ResultSetHeader>(sqlQuery, [...values, id]);
    return result.affectedRows;
};

export const deleteAdById = async (id: number): Promise<number> => {
    const [result] = await db.query<ResultSetHeader>(
        "DELETE FROM ad WHERE ad_id = ?",
        [id]
    );

    return result.affectedRows;
};
