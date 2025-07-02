import { Document, Schema, model } from "mongoose";

// Interface TypeScript pour typer un utilisateur
export interface IFurniture extends Document {
  name: string;
  idCategory: Schema.Types.ObjectId; // Référence à la catégorie
  description: string;
  ressources: Array<{
    idRessource: Schema.Types.ObjectId; // Référence à la ressource
    quantity: number; // Quantité de la ressource
  }>;
  quantity: number;
  status: "waiting" | "in_production" | "ready_to_sell"; // État du meuble
}

// Schéma Mongoose
const furnitureSchema = new Schema<IFurniture>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0, // Quantité ne peut pas être négative
    },
    idCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category", // Référence au modèle Category
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["waiting", "in_production", "ready_to_sell"], // Énumération des états possibles
    },
    ressources: [
      {
        idRessource: {
          type: Schema.Types.ObjectId,
          ref: "Ressource", // Référence au modèle Ressource
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 0, // Quantité ne peut pas être négative
        },
      },
    ],
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt
  }
);

// Modèle Mongoose
const Furniture = model<IFurniture>("Furniture", furnitureSchema);

export default Furniture;
