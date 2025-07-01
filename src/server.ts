import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.route'
import usersRoutes from './routes/users.route';
import connectDB from './config/db';

// Charger les variables d'environnement
dotenv.config();
const app = express();
connectDB();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

// Middleware
app.use(cors({
  origin: '*', // Autoriser toutes les origines
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
  credentials: true, // Autoriser les cookies
}));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
