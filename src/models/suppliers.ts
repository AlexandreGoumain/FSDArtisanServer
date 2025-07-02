import { Document, Schema, model } from "mongoose";

// Interface TypeScript pour typer un fournisseur
export interface ISupplier extends Document {
  name: string;
  email: string;
  phone: string;
}

// Schéma Mongoose
const supplierSchema = new Schema<ISupplier>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Veuillez entrer une adresse email valide"],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt
  }
);

// Modèle Mongoose
const Supplier = model<ISupplier>("Supplier", supplierSchema);

export default Supplier;
