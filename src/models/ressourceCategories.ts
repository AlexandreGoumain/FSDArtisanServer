import { Schema, model, Document } from 'mongoose';

// Interface TypeScript pour typer un utilisateur
export interface IRessourceCategory extends Document {
  label: string;
}

// Schéma Mongoose
const ressourceCategorySchema = new Schema<IRessourceCategory>(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt
  }
);

// Modèle Mongoose
const RessourceCategory = model<IRessourceCategory>('RessourceCategory', ressourceCategorySchema);

export default RessourceCategory;
