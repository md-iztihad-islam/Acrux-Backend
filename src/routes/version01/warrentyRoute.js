import express from 'express';
import { addWarrentyController, deleteWarrentyController, getAllWarrentiesController, getWarrentyByIdController, updateWarrentyController } from '../../controllers/warrentyController.js';

const router = express.Router();


router.post("/add-warrenty", addWarrentyController);
router.get("/get-all-warrenties", getAllWarrentiesController);
router.get("/get-warrenty-by-id/:id", getWarrentyByIdController);
router.put("/update-warrenty/:id", updateWarrentyController);
router.delete("/delete-warrenty/:id", deleteWarrentyController);

export default router;