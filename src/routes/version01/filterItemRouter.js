import express from "express";
import { addFilterItemController, deleteFilterItemController, getAllFilterItemsController, getFilterItemByIdController, getFilterItemsByFilterIdController, getFilterItemsBySubCategoryIdController, updateFilterItemController } from "../../controllers/filterItemController.js";

const router = express.Router();

router.post("/add-filter-item", addFilterItemController);
router.delete("/delete-filter-item/:filteritemid", deleteFilterItemController);
router.put("/update-filter-item/:filteritemid", updateFilterItemController);
router.get("/get-all-filter-items", getAllFilterItemsController);
router.get("/get-filter-item/:filteritemid", getFilterItemByIdController);
router.get("/get-filter-items-by-sub-category/:subcategoryid", getFilterItemsBySubCategoryIdController);
router.get("/get-filter-items-by-filter/:filterid", getFilterItemsByFilterIdController);

export default router;

//This is the filter item router that handles filter item related routes