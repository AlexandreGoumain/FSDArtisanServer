import RessourceCategory from "../models/ressourceCategories";
import standardResponse from "../utils/standardResponse";
import { Request, Response } from "express";
import { createRessourceCategoryValidation } from "../validations/ressourceCategories.validation";
import { z } from "zod";

export const getAllRessourceCategories = async (req: Request, res: Response) => {
    try {
        const categories = await RessourceCategory.find();
        standardResponse(res, 200, 'Liste des catégories de ressources récupérée avec succès.', categories);
    } catch (error) {
        standardResponse(res, 500, 'Erreur serveur lors de la récupération des catégories de ressources.', error);
    }
}

export const getRessourceCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await RessourceCategory.findById(req.params.id);
        if (!category) {
            standardResponse(res, 404, 'Catégorie de ressource non trouvée.');
            return;
        }
        standardResponse(res, 200, 'Catégorie de ressource récupérée avec succès.', category);
    } catch (error) {
        standardResponse(res, 500, 'Erreur serveur lors de la récupération de la catégorie de ressource.', error);
    }
}

export const createRessourceCategory = async (req: Request, res: Response) => {
    try {
        const { label } = await createRessourceCategoryValidation.parseAsync(req.body);
        const newCategory = new RessourceCategory({ label });
        await newCategory.save();
        standardResponse(res, 201, 'Catégorie de ressource créée avec succès.', newCategory);
    } catch (error) {
        if (error instanceof z.ZodError) {
            standardResponse(res, 400, 'Validation échouée.', error.errors);
            return;
        }
        standardResponse(res, 500, 'Erreur serveur lors de la création de la catégorie de ressource.', error);
    }
}

export const updateRessourceCategory = async (req: Request, res: Response) => {
    try {
        const { label } = await createRessourceCategoryValidation.parseAsync(req.body);
        const category = await RessourceCategory.findByIdAndUpdate(
            req.params.id,
            { label },
            { new: true }
        );
        if (!category) {
            standardResponse(res, 404, 'Catégorie de ressource non trouvée.');
            return;
        }
        standardResponse(res, 200, 'Catégorie de ressource mise à jour avec succès.', category);
    } catch (error) {
        if (error instanceof z.ZodError) {
            standardResponse(res, 400, 'Validation échouée.', error.errors);
            return;
        }
        standardResponse(res, 500, 'Erreur serveur lors de la mise à jour de la catégorie de ressource.', error);
    }
}

export const deleteRessourceCategory = async (req: Request, res: Response) => {
    try {
        const category = await RessourceCategory.findByIdAndDelete(req.params.id);
        if (!category) {
            standardResponse(res, 404, 'Catégorie de ressource non trouvée.');
            return;
        }
        standardResponse(res, 200, 'Catégorie de ressource supprimée avec succès.', category);
    } catch (error) {
        standardResponse(res, 500, 'Erreur serveur lors de la suppression de la catégorie de ressource.', error);
    }
}