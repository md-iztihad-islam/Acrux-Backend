import express from 'express';
import { addSubCategoryController, deleteSubCategoryController, getAllSubCategoriesController, getSubCategoriesByCategoryIdController, getSubCategoryByIdController, updateSubCategoryController } from '../../controllers/subCategoryController.js';

const router = express.Router();

router.post("/add-sub-category", addSubCategoryController);
router.delete("/delete-sub-category/:subcategoryid", deleteSubCategoryController);
router.put("/update-sub-category/:subcategoryid", updateSubCategoryController);
router.get("/get-all-sub-categories", getAllSubCategoriesController);
router.get("/get-sub-category/:subcategoryid", getSubCategoryByIdController);
router.get("/get-sub-categories-by-category/:categoryid", getSubCategoriesByCategoryIdController);

export default router;

//This is the sub-category router that handles sub-category related routes