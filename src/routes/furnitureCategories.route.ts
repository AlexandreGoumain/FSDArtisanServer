import { Router } from "express";
import {
    createFurnitureCategory,
    deleteFurnitureCategory,
    getAllFurnitureCategories,
    getFurnitureCategoryById,
    updateFurnitureCategory,
} from "../controllers/furnitureCategories.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router();

// Route to get all furnitureCategorys
router.get("/", isAuthenticated, getAllFurnitureCategories);

// Route to get a single furnitureCategory by ID
router.get("/:id", isAuthenticated, getFurnitureCategoryById);

// Route to create a new furnitureCategory
router.post("/", isAuthenticated, createFurnitureCategory);

// Route to update a furnitureCategory by ID
router.put("/:id", isAuthenticated, updateFurnitureCategory);

// Route to delete a furnitureCategory by ID
router.delete("/:id", isAuthenticated, deleteFurnitureCategory);

export default router;
