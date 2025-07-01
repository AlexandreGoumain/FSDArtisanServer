import { Schema, model, Document } from 'mongoose';

// Interface TypeScript pour typer un utilisateur
export interface ISupplier extends Document {
  name: string;
}

// Schéma Mongoose
const supplierSchema = new Schema<ISupplier>(
  {
    name: {
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
const Supplier = model<ISupplier>('Supplier', supplierSchema);

export default Supplier;
