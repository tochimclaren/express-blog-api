import { type NextFunction, type Request, type Response } from "express";
import { z } from "zod";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http.code";

export function zodMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
    if (err instanceof z.ZodError) {
        res.status(BAD_REQUEST).json({
            error: err.flatten(),
        });
        return;
    } else if (err instanceof Error) {
        const error = err as Error & { statusCode?: number };
        res.status(error.statusCode ?? BAD_REQUEST).json({
            message: err.message,
        });
        return;
    }
    res.status(INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
    });
}