import { Router } from "express";
import { getUsersFromCookie } from "../controllers/users.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router();

// Route pour récupérer les informations de l'utilisateur connecté
router.get("/me", isAuthenticated, getUsersFromCookie);

export default router;
