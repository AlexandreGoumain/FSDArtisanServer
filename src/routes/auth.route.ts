import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller';

const router = Router();


// Route d'inscription
router.post('/register', register);

// Route de connexion
router.post('/login', login);

// Route de déconnexion
router.post('/logout', logout);



export default router;
