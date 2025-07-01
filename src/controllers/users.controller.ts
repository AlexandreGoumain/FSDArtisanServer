import { Request, Response } from "express";
import User from "../models/user";
import standardResponse from "../utils/standardResponse";

export const getUsersFromCookie = async (req: Request, res: Response) => {
    try {
        const { email } = res.locals.user;

        const currentUser = await User.findOne({ email }).select(
            "-password -__v"
        ); // Exclure le mot de passe et la version du document
        if (!currentUser) {
            standardResponse(res, 404, "Utilisateur non trouvé.");
            return;
        }

        standardResponse(
            res,
            200,
            "Utilisateur récupéré avec succès.",
            currentUser
        );
    } catch (error) {
        console.error(
            "Erreur lors de la récupération de l'utilisateur:",
            error
        );
        standardResponse(
            res,
            500,
            "Erreur serveur lors de la récupération de l'utilisateur.",
            error
        );
    }
};
