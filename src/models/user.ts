import { Schema, model, Document } from 'mongoose';

// Interface TypeScript pour typer un utilisateur
export interface IUser extends Document {
  email: string;
  password: string;
}

// Schéma Mongoose
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt
  }
);

// Modèle Mongoose
const User = model<IUser>('User', userSchema);

export default User;
