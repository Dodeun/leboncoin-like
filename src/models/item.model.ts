import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "./db";
import { Item, ItemPayload, ItemUpdatePayload } from "../types/item.types";

export const findAllItems = async (): Promise<Item[]> => {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM item");
    return rows as Item[];
};

export const findItemById = async (id: number): Promise<Item | null> => {
    const [rows] = await db.query<RowDataPacket[]>(
        `
        SELECT *
        FROM ad
        WHERE ad_id = ?;
        `,
        [id]
    );
    const items = rows as Item[];
    return items.length > 0 ? items[0] : null;
};

export const insertItem = async (data: ItemPayload): Promise<Item | null> => {
    const { titre, description, price, user_id, category_id } = data;
    const fields = ["titre", "description", "price", "user_id", "category_id"];
    const values = [titre, description, price, user_id, category_id];

    const connectingElement = values.map(() => "?").join(",");
    const sqlQuery = `
        INSERT INTO item (${fields.join(",")})
        VALUES (${connectingElement});
    `;

    const [result] = await db.query<ResultSetHeader>(sqlQuery, values);

    const insertedId = result.insertId;

    return findItemById(insertedId);
};

export const updateItemById = async (
    id: number,
    data: ItemUpdatePayload
): Promise<Item | null> => {
    const fields: string[] = [];
    const values: (string | number)[] = [];

    for (const [key, value] of Object.entries(data)) {
        fields.push(`${key} = ?`);
        values.push(value as string | number);
    }

    if (fields.length === 0) {
        return findItemById(id);
    }

    const sql = `
        UPDATE item
        SET ${fields.join(", ")}
        WHERE id = ?`;
    values.push(id);

    const [result] = await db.query<ResultSetHeader>(sql, values);

    if (result.affectedRows === 0) {
        return null;
    }

    return findItemById(id);
};

export const deleteItemById = async (id: number): Promise<boolean> => {
    const [result] = await db.query<ResultSetHeader>(
        "DELETE FROM item WHERE ad_id = ?",
        [id]
    );

    return result.affectedRows > 0;
};
