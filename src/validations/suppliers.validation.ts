import { z } from "zod";
import Supplier from "../models/suppliers";

export const createSupplierValidation = z.object({
  name: z
    .string()
    .min(1, "Le nom du fournisseur est requis"),
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("L'email n'est pas valide"),

  phone: z
    .string()
    .min(1, "Le numéro de téléphone est requis")
    .regex(/^[0-9+\s().-]{7,20}$/, "Le numéro de téléphone n'est pas valide"),
});
