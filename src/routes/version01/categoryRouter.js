import express from 'express';
import { addCategoryController, deleteCategoryController, getAllCategoriesController, getCategoryByIdController, updateCategoryController } from '../../controllers/categoryController.js';

const router = express.Router();

router.post("/add-category", addCategoryController);
router.delete("/delete-category/:categoryid", deleteCategoryController);
router.put("/update-category/:categoryid", updateCategoryController);
router.get("/get-all-categories", getAllCategoriesController);
router.get("/get-category/:categoryid", getCategoryByIdController);

export default router;

//This is the category router that handles category related routes 