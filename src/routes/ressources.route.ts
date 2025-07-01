import { Router } from 'express';
import { getAllRessources, getRessourceById, createRessource, updateRessource, deleteRessource } from '../controllers/ressources.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = Router();

// Route to get all ressources
router.get('/', isAuthenticated, getAllRessources);

// Route to get a single ressource by ID
router.get('/:id', isAuthenticated, getRessourceById);

// Route to create a new ressource
router.post('/', isAuthenticated, createRessource);

// Route to update a ressource by ID
router.put('/:id', isAuthenticated, updateRessource);

// Route to delete a ressource by ID
router.delete('/:id', isAuthenticated, deleteRessource);


export default router;
