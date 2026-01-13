import express from 'express';
import { getGroupBySubCategoryController } from '../../controllers/groupController.js';

const router = express.Router();

router.get("/group-by-sub-category/:subcategoryid", getGroupBySubCategoryController);

export default router;