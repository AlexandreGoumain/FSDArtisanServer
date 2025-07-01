import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.route";
import furnitureCategoriesRoutes from "./routes/furnitureCategories.route";
import furnituresRoutes from "./routes/furnitures.route";
import ressourceCategoriesRoutes from "./routes/ressourceCategories.route";
import ressourcesRoutes from "./routes/ressources.route";
import suppliersRoutes from "./routes/suppliers.route";
import usersRoutes from "./routes/users.route";

// Charger les variables d'environnement
dotenv.config();
const app = express();
connectDB();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(
    cors({
        origin: "http://localhost:5173", // ← Remplacez par l'URL de votre front-end
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Méthodes autorisées
        credentials: true, // Autoriser les cookies
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/furnitures", furnituresRoutes);
app.use("/suppliers", suppliersRoutes);
app.use("/ressources", ressourcesRoutes);
app.use("/ressourceCategories", ressourceCategoriesRoutes);
app.use("/furnitureCategories", furnitureCategoriesRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
