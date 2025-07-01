import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.route'
import usersRoutes from './routes/users.route';
import furnituresRoutes from './routes/furnitures.route';
import suppliersRoutes from './routes/suppliers.route'; 
import ressourcesRoutes from './routes/ressources.route';
import ressourceCategoriesRoutes from './routes/ressourceCategories.route';
import furnitureCategoriesRoutes from './routes/furnitureCategories.route'
import connectDB from './config/db';

// Charger les variables d'environnement
dotenv.config();
const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
    cors({
        origin: "http://localhost:5173/", // ← Remplacez par l'URL de votre front-end
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Méthodes autorisées
        credentials: true, // Autoriser les cookies
    })
);

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/furnitures', furnituresRoutes);
app.use('/suppliers', suppliersRoutes);
app.use('/ressources', ressourcesRoutes);
app.use('/ressourceCategories', ressourceCategoriesRoutes);
app.use('/furnitureCategories', furnitureCategoriesRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
