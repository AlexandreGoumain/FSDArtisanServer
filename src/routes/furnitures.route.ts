import { Router } from "express";
import {
    createFurniture,
    deleteFurniture,
    getAllFurnitures,
    getFurnitureById,
    updateFurniture,
} from "../controllers/furnitures.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router();

// Route to get all furnitures
router.get("/", isAuthenticated, getAllFurnitures);

// Route to get a single furniture by ID
router.get("/:id", isAuthenticated, getFurnitureById);

// Route to create a new furniture
router.post("/", isAuthenticated, createFurniture);

// Route to update a furniture by ID
router.put("/:id", isAuthenticated, updateFurniture);

// Route to delete a furniture by ID
router.delete("/:id", isAuthenticated, deleteFurniture);

export default router;
