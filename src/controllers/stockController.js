import { addStockService, deleteStockService, getAllStocksService, getStockByIdService, getStockByProductIdService, getStockByProductIdWithoutPriceService, updateStockService } from "../services/stockService.js";

export const addStockController = async (req, res) => {
    try {
        const stockData = req.body;
        const stock = await addStockService(stockData);

        if(!stock) {
            return res.status(400).json({
                success: false,
                message: "Could not add product from controller",
                error: error.message,
            });
        }

        return res.status(201).json({
            success: true,
            message: "Stock added successfully",
            data: stock,
        });
    } catch (error) {
        console.log("Error in addStockController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not add stock from controller",
            error: error.message,
        });
    }
};

export const deleteStockController = async (req, res) => {
    try {
        const stockId = req.params.stockid;
        const deletedStock = await deleteStockService(stockId);

        if(!deletedStock){
            return res.status(404).json({
                success: false,
                message: "Stock not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Stock deleted successfully",
            data: deletedStock
        });
    } catch (error) {
        console.log("Error in deleteStockController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not delete stock from controller",
            error: error.message
        });
    }
};

export const updateStockController = async (req, res) => {
    try {
        const stockId = req.params.stockid;
        const updatedData = req.body;
        const updatedStock = await updateStockService(stockId, updatedData);

        if(!updatedStock){
            return res.status(404).json({
                success: false,
                message: "Stock not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Stock updated successfully",
            data: updatedStock
        });
    } catch (error) {
        console.log("Error in updateStockController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not update stock from controller",
            error: error.message
        });
    }
};

export const getAllStocksController = async (req, res) => {
    try {
        const stocks = await getAllStocksService();

        if(!stocks || stocks.length === 0){
            return res.status(404).json({
                success: false,
                message: "No stocks found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Stocks fetched successfully",
            data: stocks
        });
    } catch (error) {
        console.log("Error in getAllStocksController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch stocks from controller",
            error: error.message
        });
    }
};

export const getStockByIdController = async (req, res) => {
    try {
        const stockId = req.params.stockid;
        const stock = await getStockByIdService(stockId);

        if(!stock){
            return res.status(404).json({
                success: false,
                message: "Stock not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Stock fetched successfully",
            data: stock
        });
    } catch (error) {
        console.log("Error in getStockByIdController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch stock from controller",
            error: error.message
        });
    }
};

export const getStockByProductIdController = async (req, res) => {
    try {
        const productId = req.params.productid;
        const stock = await getStockByProductIdService(productId);

        if(!stock || stock.length === 0){
            return res.status(404).json({
                success: false,
                message: "Stock not found for the given product ID",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Stock fetched successfully",
            data: stock
        });
    } catch (error) {
        console.log("Error in getStockByProductIdController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch stock from controller",
            error: error.message
        });
    }
};

export const getStockByProductIdWithoutPriceController = async (req, res) => {
    try {
        const productId = req.params.productid;
        console.log("Fetching stock without price for product ID:", productId);
        const stock = await getStockByProductIdWithoutPriceService(productId);

        if(!stock || stock.length === 0){
            return res.status(404).json({
                success: false,
                message: "Stock not found for the given product ID",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Stock fetched successfully",
            data: stock
        });
    } catch (error) {
        console.log("Error in getStockByProductIdWithoutPriceController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch stock from controller",
            error: error.message
        });
    }
};