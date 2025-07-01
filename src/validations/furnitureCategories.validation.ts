import { z } from "zod";
import FurnitureCategory from "../models/furnitureCategories";

export const createFurnitureCategoryValidation = z.object({
    label: z
        .string()
        .min(1, "Le label de la catégorie de meuble est requis")
        .refine(async (label) => {
            // Vérification en DB que le label de la catégorie de meuble n'existe pas déjà
            const existingCategory = await FurnitureCategory.findOne({ label });
            if (existingCategory) {
                return false;
            }
            return true;
        }, "Une catégorie de meuble avec ce label existe déjà"),
});
