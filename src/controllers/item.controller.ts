import { Request, Response, NextFunction, RequestHandler } from "express";
import {
    findAllItems,
    findItemById,
    insertItem,
    updateItemById,
    deleteItemById,
} from "../models/item.model";
import { Item, ItemPayload, ItemUpdatePayload } from "../types/item.types";

// GET /api/items
export const getAllItems = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const items: Item[] = await findAllItems();
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
};

// GET /api/items/:id
export const getItemById: RequestHandler<
    { id: string },
    Item | { error: string }
> = async (req, res, next) => {
    try {
        const parsedId: number = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            res.status(400).json({ error: "Id is not a number" });
            return;
        }

        const item: Item | null = await findItemById(parsedId);
        if (!item) {
            res.status(404).json({ error: "Ad could not be found" });
            return;
        }

        res.status(200).json(item);
    } catch (err) {
        next(err);
    }
};

// POST /api/items
export const createItem: RequestHandler<
    {},
    Item | { error: string },
    ItemPayload
> = async (req, res, next) => {
    const data: ItemPayload = req.body;
    try {
        if (
            !data.titre ||
            !data.description ||
            data.price === undefined ||
            !data.user_id ||
            !data.category_id
        ) {
            res.status(400).json({
                error: "Required fields missing or not valid",
            });
        }
        const newItem: Item | null = await insertItem(data);
        if (!newItem) {
            res.status(404).json({ error: "Ad could not be found" });
            return;
        }
        res.status(201).json(newItem);
    } catch (err) {
        next(err);
    }
};

// PATCH /api/items/:id
export const patchItemById: RequestHandler<
    { id: string },
    Item | { error: string },
    ItemUpdatePayload
> = async (req, res, next) => {
    try {
        const parsedId: number = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            res.status(400).json({ error: "Id is not a number" });
            return;
        }
        const fieldsToUpdate: ItemUpdatePayload = req.body;

        const updatedItem = await updateItemById(parsedId, fieldsToUpdate);
        if (!updatedItem) {
            res.status(404).json({ error: "Ad could not be found" });
            return;
        }
        res.status(200).json(updatedItem);
    } catch (err) {
        next(err);
    }
};

// DELETE /api/items/:id
export const supprItemById: RequestHandler<
    { id: string },
    void | { error: string }
> = async (req, res, next) => {
    try {
        const parsedId: number = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            res.status(400).json({ error: "Id is not a number" });
            return;
        }

        const deleted = await deleteItemById(parsedId);
        if (!deleted) {
            res.status(404).json({ error: "Ad could not be found" });
            return;
        }

        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};
