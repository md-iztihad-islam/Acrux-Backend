import express from 'express';
import { addDiscountedController, addProductToDiscountedController, deleteDiscountedController, deleteProductFromDiscountedController, getDiscountedController } from '../../controllers/discountedController.js';

const router = express.Router();

router.post("/add-discounted", addDiscountedController);
router.delete("/delete-discounted/:discountedId", deleteDiscountedController);
router.get("/get-discounted", getDiscountedController);
router.put("/add-product-to-discounted/:groupId", addProductToDiscountedController);
router.put("/delete-product-from-discounted/:groupId", deleteProductFromDiscountedController);

export default router;