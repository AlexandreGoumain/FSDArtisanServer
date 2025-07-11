import { z } from "zod";
import RessourceCategory from "../models/ressourceCategories";
import Supplier from "../models/suppliers";
import mongoose from "mongoose";

export const createRessourceValidation = z.object({
  name: z.string().min(1, "Le nom de la ressource est requis"),
  description: z.string().nullable(),
  idCategory: z
    .string()
    .refine(async (idCategory) => {
      // Vérification en DB que l'id de la catégorie existe
      if(!mongoose.Types.ObjectId.isValid(idCategory)){
        return false
      }
      const category = await RessourceCategory.findById(idCategory);
      if (!category) {
        return false;
      }
      return true;
    }, "L'id de la catégorie ne correspond à aucune catégorie existante"),
  idSupplier: z
    .string()
    .refine(async (idSupplier) => {
      // Vérification en DB que l'id du fournisseur existe
      if(!mongoose.Types.ObjectId.isValid(idSupplier)){
        return false
      }
      const supplier = await Supplier.findById(idSupplier);
      if (!supplier) {
        return false;
      }
      return true;
    }, "L'id du fournisseur ne correspond à aucun fournisseur existant"),
});
