import { RowDataPacket } from "mysql2";
import { Ad } from "../types/ad.types";
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

export const insertAd = async (): Promise<void> => {
    // TODO : requête d'insertion de l'ensemble des informations qui composent une annonce pour créer une nouvelle entrée en base
};

export const patchAd = async (): Promise<void> => {
    // TODO : avec l'id sélectionné, requête de modification des informations de l'annonce (mise à jour partielle)
};

export const deleteAdById = async (): Promise<void> => {
    // TODO : requête de suppression de l'annonce, grâce à l'id sélectionné
};
