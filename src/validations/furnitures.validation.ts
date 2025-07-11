import { z } from "zod";
import FurnitureCategory from "../models/furnitureCategories";
import Ressource from "../models/ressources";
import mongoose from "mongoose";

export const createFurnitureValidation = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().nullable(),
  quantity: z
    .number()
    .int()
    .nonnegative("La quantité doit être un nombre entier positif"),
  idCategory: z.string().refine(async (idCategory) => {
    if (!mongoose.Types.ObjectId.isValid(idCategory)) {
      return false;
    }
    // Vérification en DB que l'id de la catégorie existe
    const category = await FurnitureCategory.findById(idCategory);
    if (!category) {
      return false;
    }
    return true;
  }, "L'id de la catégorie ne correspond à aucune catégorie existante"),
  ressources: z
    .array(
      z.object({
        idRessource: z.string().refine(async (idRessource) => {
          if (!mongoose.Types.ObjectId.isValid(idRessource)) {
            return false;
          }
          // Vérification en DB que l'id de la ressource existe
          const ressource = await Ressource.findById(idRessource);
          if (!ressource) {
            return false;
          }
          return true;
        }, "L'id de la ressource ne correspond à aucune ressource existante"),
        quantity: z
          .number()
          .int()
          .nonnegative(
            "La quantité de la ressource doit être un nombre entier positif"
          ),
      })
    )
    .nonempty("La liste des ressources ne peut pas être vide"),
  status: z.enum(["waiting", "in_production", "ready_to_sell"], {
    message: "L'état doit être 'waiting', 'in_production' ou 'ready_to_sell'",
  }),
});
