import { Request, Response, NextFunction, RequestHandler } from "express";
import {
    findAllAds,
    findAdById,
    insertAd,
    patchAd,
    deleteAdById,
} from "../models/ads.model";

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
    Response | { error: string }
> = async (req, res, next) => {
    try {
        const parsedId: number = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            res.status(400).json({ error: "Id is not a number" });
            return;
        }

        const ad = await findAdById(parsedId);
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
    try {
        await insertAd();
        res.sendStatus(201);
    } catch (err) {
        next(err);
    }
};

export const updateAd: RequestHandler<
    { id: string },
    void | { error: string },
    UpdateAdInput
> = async (req, res, next) => {
    try {
        const parsedId: number = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            res.status(400).json({ error: "Id is not a number" });
            return;
        }

        const affectedRows = await patchAd(parsedId, req.body);
        if (affectedRows === 0) {
            res.status(404).json({ error: "Ad could not be find" });
            return;
        }

        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

export const delAdById: RequestHandler<
    { id: string },
    number | { error: string }
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
