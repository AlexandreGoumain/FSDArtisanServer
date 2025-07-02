import Ressource from "../models/ressources";
import { Schema } from "mongoose";
import { ISupplier } from "../models/suppliers";


export interface EnrichedSupplier extends ISupplier {
  ressourceCategories: Schema.Types.ObjectId[];
}


export const enrichSupplier = async (supplier: ISupplier): Promise<EnrichedSupplier> => {
  const ressources = await Ressource.find({ idSupplier: supplier._id });

  const ressourceCategories = [
    ...new Set(ressources.map((r) => r.idCategory)),
  ];

  return {
    ...supplier.toObject(),
    ressourceCategories,
  };
};
