import express from "express";
import { addNewArraivalController, addProductToNewArraivalsController, deleteNewArraivalController, deleteProductFromNewArraivalsController, getNewArraivalsController } from "../../controllers/newArraivalsController.js";

const router = express.Router();

router.post("/add-newarraivals", addNewArraivalController);
router.delete("/delete-newarraivals/:newArraivalId", deleteNewArraivalController);
router.get("/get-newarraivals", getNewArraivalsController);
router.put("/add-product-to-newarraivals/:groupId", addProductToNewArraivalsController);
router.put("/delete-product-from-newarraivals/:productId", deleteProductFromNewArraivalsController);


export default router;