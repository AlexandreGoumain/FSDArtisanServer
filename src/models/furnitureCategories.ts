import { Schema, model, Document } from 'mongoose';

// Interface TypeScript pour typer un utilisateur
export interface IFurnitureCategory extends Document {
  label: string;
}

// Schéma Mongoose
const furnitureCategorySchema = new Schema<IFurnitureCategory>(
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
const FurnitureCategory = model<IFurnitureCategory>('FurnitureCategory', furnitureCategorySchema);

export default FurnitureCategory;
