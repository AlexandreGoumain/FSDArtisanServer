import { Router } from 'express';
import { createRessourceCategory, deleteRessourceCategory, getAllRessourceCategories, getRessourceCategoryById, updateRessourceCategory } from '../controllers/ressourceCategories.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = Router();

// Route to get all ressourceCategorys
router.get('/', isAuthenticated, getAllRessourceCategories);

// Route to get a single ressourceCategory by ID
router.get('/:id', isAuthenticated, getRessourceCategoryById);

// Route to create a new ressourceCategory
router.post('/', isAuthenticated, createRessourceCategory);

// Route to update a ressourceCategory by ID
router.put('/:id', isAuthenticated, updateRessourceCategory);

// Route to delete a ressourceCategory by ID
router.delete('/:id', isAuthenticated, deleteRessourceCategory);


export default router;
