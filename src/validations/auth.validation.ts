import { z } from 'zod';

export const userRegisterValidation = z.object({
    firstname: z
        .string()
        .trim()
        .min(2, {
            message: 'Votre prénom doit contenir au moins 2 caractères',
        }),
    lastname: z
        .string()
        .trim()
        .min(2, {
            message: 'Votre nom doit contenir au moins 2 caractères',
        }),
    email: z
        .string()
        .trim()
        .email({ message: 'Adresse email invalide' })
        .refine((email: string): boolean => {
            // faites votre propre condition ici, appel API, vérif DB ou que sais-je
            // cela fait aussi parti de votre schéma de validation
            return true;
        }),
    password: z
        .string()
        .trim()
        .min(6, {
            message: 'Votre mot de passe doit contenir au moins 6 caractères',
        })
        .regex(/[0-9]/, {
            message: 'Votre mot de passe doit contenir au moins un chiffre',
        })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
            message:
                'Votre mot de passe doit contenir au moins un caractère spécial',
        }),
});