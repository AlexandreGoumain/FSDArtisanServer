import { Document, Schema, model } from "mongoose";

// Interface TypeScript pour typer un utilisateur
export interface IRessource extends Document {
    name: string;
    idCategory: Schema.Types.ObjectId;
    idSupplier: Schema.Types.ObjectId;
}

// Schéma Mongoose
const ressourceSchema = new Schema<IRessource>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        idCategory: {
            type: Schema.Types.ObjectId,
            ref: "RessourceCategory", // Référence au modèle RessourceCategory
            required: true,
        },
        idSupplier: {
            type: Schema.Types.ObjectId,
            ref: "Supplier", // Référence au modèle Supplier
            required: true,
        },
    },
    {
        timestamps: true, // Ajoute createdAt et updatedAt
    }
);

// Modèle Mongoose
const Ressource = model<IRessource>("Ressource", ressourceSchema);

export default Ressource;
