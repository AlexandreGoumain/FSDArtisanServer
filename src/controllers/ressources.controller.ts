import { Request, Response } from "express";
import { z } from "zod";
import Ressource from "../models/ressources";
import standardResponse from "../utils/standardResponse";
import { createRessourceValidation } from "../validations/ressources.validation";

export const getAllRessources = async (req: Request, res: Response) => {
    try {
        const ressources = await Ressource.find();
        standardResponse(
            res,
            200,
            "Liste des ressources récupérée avec succès.",
            ressources
        );
    } catch (error) {
        standardResponse(
            res,
            500,
            "Erreur serveur lors de la récupération des ressources.",
            error
        );
    }
};

export const getRessourceById = async (req: Request, res: Response) => {
    try {
        const ressource = await Ressource.findById(req.params.id);
        if (!ressource) {
            standardResponse(res, 404, "Ressource non trouvée.");
            return;
        }
        standardResponse(
            res,
            200,
            "Ressource récupérée avec succès.",
            ressource
        );
    } catch (error) {
        standardResponse(
            res,
            500,
            "Erreur serveur lors de la récupération de la ressource.",
            error
        );
    }
};

export const createRessource = async (req: Request, res: Response) => {
    try {
        const { name, description, idCategory, idSupplier } =
            await createRessourceValidation.parseAsync(req.body);
        const newRessource = new Ressource({
            name,
            description,
            idCategory,
            idSupplier,
        });
        await newRessource.save();
        standardResponse(
            res,
            201,
            "Ressource créée avec succès.",
            newRessource
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            standardResponse(res, 400, "Validation échouée.", error.errors);
            return;
        }
        standardResponse(
            res,
            500,
            "Erreur serveur lors de la création de la ressource.",
            error
        );
    }
};

export const updateRessource = async (req: Request, res: Response) => {
    try {
        const { name, description, idCategory, idSupplier } =
            await createRessourceValidation.parseAsync(req.body);
        const ressource = await Ressource.findByIdAndUpdate(
            req.params.id,
            { name, description, idCategory, idSupplier },
            { new: true }
        );
        if (!ressource) {
            standardResponse(res, 404, "Ressource non trouvée.");
            return;
        }
        standardResponse(
            res,
            200,
            "Ressource mise à jour avec succès.",
            ressource
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            standardResponse(res, 400, "Validation échouée.", error.errors);
            return;
        }
        standardResponse(
            res,
            500,
            "Erreur serveur lors de la mise à jour de la ressource.",
            error
        );
    }
};

export const deleteRessource = async (req: Request, res: Response) => {
    try {
        const ressource = await Ressource.findByIdAndDelete(req.params.id);
        if (!ressource) {
            standardResponse(res, 404, "Ressource non trouvée.");
            return;
        }
        standardResponse(
            res,
            200,
            "Ressource supprimée avec succès.",
            ressource
        );
    } catch (error) {
        standardResponse(
            res,
            500,
            "Erreur serveur lors de la suppression de la ressource.",
            error
        );
    }
};
