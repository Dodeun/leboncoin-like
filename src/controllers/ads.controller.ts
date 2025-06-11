import { Request, Response, NextFunction, RequestHandler } from "express";
import {
    findAllAds,
    findAdById,
    insertAd,
    patchAd,
    deleteAdById,
} from "../models/ads.model";
import { Ad, NewAdInput } from "../types/ad.types";

export const getAllAds = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const advertisements = await findAllAds();
        res.status(200).json(advertisements);
    } catch (error) {
        next(error);
    }
};

export const getAdById: RequestHandler<
    { id: string },
    Ad | { error: string }
> = async (req, res, next) => {
    try {
        const parsedId: number = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            res.status(400).json({ error: "Id is not a number" });
            return;
        }

        const ad = await findAdById(parsedId) as Ad;
        if (!ad) {
            res.status(404).json({ error: "Can't find ad with this Id" });
        }

        res.status(200).json(ad);
    } catch (err) {
        next(err);
    }
};

export const createAd: RequestHandler<{}, void, NewAdInput> = async (
    req,
    res,
    next
) => {
    const {title, description, price, user_id, category_id} = req.body;
    try {
        await insertAd({title, description, price, user_id, category_id});
        res.sendStatus(201);
    } catch (err) {
        next(err);
    }
};

export const updateAd: RequestHandler<
    { id: string },
    void | { error: string },
    Ad
> = async (req, res, next) => {
    try {
        const {ad_id, ...updateData} = req.body;
        const parsedId: number = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            res.status(400).json({ error: "Id is not a number" });
            return;
        }
        await patchAd(parsedId, updateData);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

export const delAdById: RequestHandler<
    { id: string },
    void | { error: string }
> = async (req, res, next) => {
    try {
        const parsedId: number = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            res.status(400).json({ error: "Id is not a number" });
            return;
        }

        const deletedRows = await deleteAdById(parsedId);
        if (deletedRows === 0) {
            res.status(404).json({ error: "Ad could not be find" });
            return;
        }

        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};
