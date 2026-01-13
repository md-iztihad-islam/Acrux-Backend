import express from 'express';
import { addSpecificationController, deleteSpecificationController, getAllSpecificationsController, getSpecificationByIdController, getSpecificationsBySubCategoryController, updateSpecificationController } from '../../controllers/specificationController.js';

const router = express.Router();

router.post("/add-specification", addSpecificationController);
router.delete("/delete-specification/:specificationid", deleteSpecificationController);
router.put("/update-specification/:specificationid", updateSpecificationController);
router.get("/get-all-specifications", getAllSpecificationsController);
router.get("/get-specification/:specificationid", getSpecificationByIdController);
router.get("/get-specifications-by-sub-category/:subcategoryid", getSpecificationsBySubCategoryController);

export default router;

//Controller function to add a new specification