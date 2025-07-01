import { Request, Response } from 'express';
import Furniture from '../models/Furnitures';
import standardResponse from '../utils/standardResponse';
import { createFurnitureValidation } from '../validations/furnitures.validation';
import { z } from 'zod';

export const getAllFurnitures = async (req: Request, res: Response) => {
    try {
        const furnitures = await Furniture.find();
        standardResponse(res, 200, 'Liste des meubles récupérée avec succès.', furnitures);
    } catch (error) {
        standardResponse(res, 500, 'Erreur serveur lors de la récupération des meubles.', error);
    }
}

export const getFurnitureById = async (req: Request, res: Response) => {
    try {
        const furniture = await Furniture.findById(req.params.id);
        if (!furniture) {
            standardResponse(res, 404, 'Meuble non trouvé.');
            return;
        }
        standardResponse(res, 200, 'Meuble récupéré avec succès.', furniture);
    } catch (error) {
        standardResponse(res, 500, 'Erreur serveur lors de la récupération du meuble.', error);
    }
}

export const createFurniture = async (req: Request, res: Response) => {
    try {
        const {name, idCategory, quantity, ressources, status} = await createFurnitureValidation.parseAsync(req.body);
        const newFurniture = new Furniture({name, idCategory, quantity, ressources, status});
        await newFurniture.save();
        standardResponse(res, 201, 'Meuble créé avec succès.', newFurniture);
    } catch (error) {
        if (error instanceof z.ZodError) {
            standardResponse(res, 400, 'Validation échouée.', error.errors);
            return;
        }
        standardResponse(res, 500, 'Erreur serveur lors de la création du meuble.', error);
    }

}

export const updateFurniture = async (req: Request, res: Response) => {
    try {
        const {name, idCategory, quantity, ressources, status} = await createFurnitureValidation.parseAsync(req.body);
        const furniture = await Furniture.findByIdAndUpdate(
            req.params.id,
            {name, idCategory, quantity, ressources, status},
            {new: true}
        );
        if (!furniture) {
            standardResponse(res, 404, 'Meuble non trouvé.');
            return;
        }
        standardResponse(res, 200, 'Meuble mis à jour avec succès.', furniture);
    } catch (error) {
        if (error instanceof z.ZodError) {
            standardResponse(res, 400, 'Validation échouée.', error.errors);
            return;
        }
        standardResponse(res, 500, 'Erreur serveur lors de la mise à jour du meuble.', error);
    }
}

export const deleteFurniture = async (req: Request, res: Response) => {
    try {
        const furniture = await Furniture.findByIdAndDelete(req.params.id);
        if (!furniture) {
            standardResponse(res, 404, 'Meuble non trouvé.');
            return;
        }
        standardResponse(res, 200, 'Meuble supprimé avec succès.');
    } catch (error) {
        standardResponse(res, 500, 'Erreur serveur lors de la suppression du meuble.', error);
    }
}