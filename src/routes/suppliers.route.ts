import { Router } from 'express';
import { getAllSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier } from '../controllers/suppliers.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = Router();

// Route to get all suppliers
router.get('/', isAuthenticated, getAllSuppliers);

// Route to get a single supplier by ID
router.get('/:id', isAuthenticated, getSupplierById);

// Route to create a new supplier
router.post('/', isAuthenticated, createSupplier);

// Route to update a supplier by ID
router.put('/:id', isAuthenticated, updateSupplier);

// Route to delete a supplier by ID
router.delete('/:id', isAuthenticated, deleteSupplier);


export default router;
