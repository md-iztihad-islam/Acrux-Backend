import express from 'express';
import { addFilterController, deleteFilterController, getAllFiltersController, getFilterByIdController, getFiltersBySubCategoryIdController, updateFilterController } from '../../controllers/filterController.js';

const router = express.Router();

router.post("/add-filter", addFilterController);
router.delete("/delete-filter/:filterid", deleteFilterController);
router.put("/update-filter/:filterid", updateFilterController);
router.get("/get-all-filters", getAllFiltersController);
router.get("/get-filter/:filterid", getFilterByIdController);
router.get("/get-filters-by-sub-category/:subcategoryid", getFiltersBySubCategoryIdController);

export default router;

//This is the filter router that handles filter related routes