import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import standardResponse from "../utils/standardResponse";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export const isAuthenticated = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { token } = request.cookies; // on récupére le cookie "token" qui contient le JWT

    if (!token)
        standardResponse(response, 401, "Vous devez être connecté", null);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // v en dessous, c'est que verify est bien passé correctement !
        response.locals.user = decoded;
        next();
    } catch (err: any) {
        standardResponse(response, 401, "Token invalide", null);
    }
};
