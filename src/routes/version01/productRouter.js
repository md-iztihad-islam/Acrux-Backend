import express from 'express';
import { addProductController, addReviewToProductController, deleteProductController, getAllProductsController, getProductByIdController, getProductByProductIdController, getProductsBySubcategoryController, searchProductsController, updateProductController } from '../../controllers/productController.js';
import { s3Uploader } from '../../config/multerConfig.js';

const router = express.Router();

router.post("/add-product", s3Uploader.single("image"), addProductController);
router.delete("/delete-product/:productid", deleteProductController);
router.put("/update-product/:productid", s3Uploader.single("image"), updateProductController);
router.get("/get-all-products", getAllProductsController);
router.get("/get-product/:productid", getProductByIdController);
router.get("/get-product-by-productid/:productid", getProductByProductIdController);
router.get("/get-products-by-subcategory/:subcategoryid", getProductsBySubcategoryController);
router.put("/add-review/:productid", addReviewToProductController);
router.get("/search", searchProductsController);

export default router;

//This is the product router that handles product related routes