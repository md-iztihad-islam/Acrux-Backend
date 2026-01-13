import express from "express";
import { addStockController, deleteStockController, getAllStocksController, getStockByIdController, getStockByProductIdController, getStockByProductIdWithoutPriceController, updateStockController } from "../../controllers/stockController.js";

const router = express.Router();

router.post("/add-stock", addStockController);
router.delete("/delete-stock/:stockid", deleteStockController);
router.put("/update-stock/:stockid", updateStockController);
router.get("/get-all-stocks", getAllStocksController);
router.get("/get-stock-by-id/:stockid", getStockByIdController);
router.get("/get-stock-by-product-id/:productid", getStockByProductIdController);
router.get("/get-stock-by-product-id-without-price/:productid", getStockByProductIdWithoutPriceController);

export default router;

//This is the stock router for version 01 API