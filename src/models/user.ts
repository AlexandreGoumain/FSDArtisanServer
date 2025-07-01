import { Document, Schema, model } from "mongoose";

// Interface TypeScript pour typer un utilisateur
export interface IUser extends Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

// Schéma Mongoose
const userSchema = new Schema<IUser>(
    {
        firstname: {
            type: String,
            required: true,
            trim: true,
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
        },
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
const User = model<IUser>("User", userSchema);

export default User;
