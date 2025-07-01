import { Request, Response } from "express";
import { z } from "zod";
import Supplier from "../models/suppliers";
import standardResponse from "../utils/standardResponse";
import { createSupplierValidation } from "../validations/suppliers.validation";

export const getAllSuppliers = async (req: Request, res: Response) => {
    try {
        const suppliers = await Supplier.find();
        standardResponse(
            res,
            200,
            "Liste des fournisseurs récupérée avec succès.",
            suppliers
        );
    } catch (error) {
        standardResponse(
            res,
            500,
            "Erreur serveur lors de la récupération des fournisseurs.",
            error
        );
    }
};

export const getSupplierById = async (req: Request, res: Response) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            standardResponse(res, 404, "Fournisseur non trouvé.");
            return;
        }
        standardResponse(
            res,
            200,
            "Fournisseur récupéré avec succès.",
            supplier
        );
    } catch (error) {
        standardResponse(
            res,
            500,
            "Erreur serveur lors de la récupération du fournisseur.",
            error
        );
    }
};

export const createSupplier = async (req: Request, res: Response) => {
    try {
        const { name } = await createSupplierValidation.parseAsync(req.body);
        const newSupplier = new Supplier({ name });
        await newSupplier.save();
        standardResponse(
            res,
            201,
            "Fournisseur créé avec succès.",
            newSupplier
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            standardResponse(res, 400, "Validation échouée.", error.errors);
            return;
        }
        standardResponse(
            res,
            500,
            "Erreur serveur lors de la création du fournisseur.",
            error
        );
    }
};

export const updateSupplier = async (req: Request, res: Response) => {
    try {
        const { name } = await createSupplierValidation.parseAsync(req.body);
        const supplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        if (!supplier) {
            standardResponse(res, 404, "Fournisseur non trouvé.");
            return;
        }
        standardResponse(
            res,
            200,
            "Fournisseur mis à jour avec succès.",
            supplier
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            standardResponse(res, 400, "Validation échouée.", error.errors);
            return;
        }
        standardResponse(
            res,
            500,
            "Erreur serveur lors de la mise à jour du fournisseur.",
            error
        );
    }
};

export const deleteSupplier = async (req: Request, res: Response) => {
    try {
        const supplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!supplier) {
            standardResponse(res, 404, "Fournisseur non trouvé.");
            return;
        }
        standardResponse(
            res,
            200,
            "Fournisseur supprimé avec succès.",
            supplier
        );
    } catch (error) {
        standardResponse(
            res,
            500,
            "Erreur serveur lors de la suppression du fournisseur.",
            error
        );
    }
};
