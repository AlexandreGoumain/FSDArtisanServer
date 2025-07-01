import FurnitureCategory from "../models/furnitureCategories";
import standardResponse from "../utils/standardResponse";
import { Request, Response } from "express";
import { createFurnitureCategoryValidation } from "../validations/furnitureCategories.validation";
import { z } from "zod";

export const getAllFurnitureCategories = async (req: Request, res: Response) => {
    try {
        const categories = await FurnitureCategory.find();
        standardResponse(res, 200, 'Liste des catégories de meuble récupérée avec succès.', categories);
    } catch (error) {
        standardResponse(res, 500, 'Erreur serveur lors de la récupération des catégories de meuble.', error);
    }
}

export const getFurnitureCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await FurnitureCategory.findById(req.params.id);
        if (!category) {
            standardResponse(res, 404, 'Catégorie de meuble non trouvée.');
            return;
        }
        standardResponse(res, 200, 'Catégorie de meuble récupérée avec succès.', category);
    } catch (error) {
        standardResponse(res, 500, 'Erreur serveur lors de la récupération de la catégorie de meuble.', error);
    }
}

export const createFurnitureCategory = async (req: Request, res: Response) => {
    try {
        const { label } = await createFurnitureCategoryValidation.parseAsync(req.body);
        const newCategory = new FurnitureCategory({ label });
        await newCategory.save();
        standardResponse(res, 201, 'Catégorie de meuble créée avec succès.', newCategory);
    } catch (error) {
        if (error instanceof z.ZodError) {
            standardResponse(res, 400, 'Validation échouée.', error.errors);
            return;
        }
        standardResponse(res, 500, 'Erreur serveur lors de la création de la catégorie de meuble.', error);
    }
}

export const updateFurnitureCategory = async (req: Request, res: Response) => {
    try {
        const { label } = await createFurnitureCategoryValidation.parseAsync(req.body);
        const category = await FurnitureCategory.findByIdAndUpdate(
            req.params.id,
            { label },
            { new: true }
        );
        if (!category) {
            standardResponse(res, 404, 'Catégorie de meuble non trouvée.');
            return;
        }
        standardResponse(res, 200, 'Catégorie de meuble mise à jour avec succès.', category);
    } catch (error) {
        if (error instanceof z.ZodError) {
            standardResponse(res, 400, 'Validation échouée.', error.errors);
            return;
        }
        standardResponse(res, 500, 'Erreur serveur lors de la mise à jour de la catégorie de meuble.', error);
    }
}

export const deleteFurnitureCategory = async (req: Request, res: Response) => {
    try {
        const category = await FurnitureCategory.findByIdAndDelete(req.params.id);
        if (!category) {
            standardResponse(res, 404, 'Catégorie de meuble non trouvée.');
            return;
        }
        standardResponse(res, 200, 'Catégorie de meuble supprimée avec succès.', category);
    } catch (error) {
        standardResponse(res, 500, 'Erreur serveur lors de la suppression de la catégorie de meuble.', error);
    }
}