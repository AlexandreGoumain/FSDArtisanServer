import { z } from 'zod';
import RessourceCategory from '../models/ressourceCategories';

export const createRessourceCategoryValidation = z.object({
    label: z.string().min(1, "Le label de la catégorie de ressource est requis").refine(async (label) => {
        // Vérification en DB que le label de la catégorie de ressource n'existe pas déjà
        const existingCategory = await RessourceCategory.findOne({ label });
        if (existingCategory) {
            return false;
        }
        return true;
    }, "Une catégorie de ressource avec ce label existe déjà")
});