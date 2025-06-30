import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { userRegisterValidation } from '../validations/auth.validation';
import { z } from 'zod';

import standardResponse from '../utils/standardResponse';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = userRegisterValidation.parse(req.body);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            standardResponse(res, 400, 'Email déjà utilisé.');
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        standardResponse(res, 201, 'Utilisateur créé avec succès.');
    } catch (error) {
        if (error instanceof z.ZodError) {
            standardResponse(res, 400, 'Validation échouée.', error.errors);
            return
        }
        standardResponse(res, 500, 'Erreur serveur lors de l\'inscription.');

    };
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            standardResponse(res, 400, 'Email ou mot de passe invalide.');
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            standardResponse(res, 400, 'Email ou mot de passe invalide.');
            return;
        }

        const token = jwt.sign({ id: user._id , email: user.email}, JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict',
        })
        standardResponse(res, 200, 'Connexion réussie.');
    }
    catch (error) {
        standardResponse(res, 500, 'Erreur serveur lors de la connexion.', error);
    }
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('token');
    standardResponse(res, 200, 'Déconnexion réussie.');
};