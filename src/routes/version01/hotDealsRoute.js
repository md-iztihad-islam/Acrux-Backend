import express from 'express';
import { addHotDealsController, addProductToHotDealsController, deleteHotDealsController, deleteProductFromHotDealsController, getHotDealsController } from '../../controllers/hotDealsController.js';

const router = express.Router();

router.post("/add-hotdeals", addHotDealsController);
router.delete("/delete-hotdeals/:hotDealId", deleteHotDealsController);
router.get("/get-hotdeals", getHotDealsController);
router.put("/add-product-to-hotdeals/:groupId", addProductToHotDealsController);
router.put("/delete-product-from-hotdeals/:productId", deleteProductFromHotDealsController);

export default router;