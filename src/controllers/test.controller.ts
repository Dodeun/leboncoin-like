import { Request, Response, NextFunction } from "express";
import { getWelcomeMessage } from "../models/test.model";

export const getHello = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const message = await getWelcomeMessage();
        res.json({ message });
    } catch (err) {
        next(err);
    }
};
