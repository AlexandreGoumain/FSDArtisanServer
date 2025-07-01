import { z } from 'zod';
import Supplier from '../models/suppliers';

export const createSupplierValidation = z.object({
    name: z.string().min(1, "Le nom du fournisseur est requis")
        .refine(async (name) => {
            // Vérification en DB que le nom du fournisseur n'existe pas déjà
            const existingSupplier = await Supplier.findOne({ name });
            if (existingSupplier) {
                return false;
            }
            return true;
        }, "Un fournisseur avec ce nom existe déjà")
});