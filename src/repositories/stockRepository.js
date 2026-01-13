import Stock from "../schemas/stockSchema.js";

export const addStockRepository = async (stockData) => {
    try {
        const stock = await Stock.create(stockData);
        return stock;
    } catch (error) {
        console.log("Error in addStockRepository:", error);
        throw new Error("Could not add product from repository due to " + error);
    }
}

export const deleteStockRepository = async (stockId) => {
    try {
        const deletedStock = await Stock.findByIdAndDelete(stockId);
        return deletedStock;
    } catch (error) {
        console.log("Error in deleteStockRepository:", error);
        throw new Error("Could not delete product from repository due to " + error);
    }
}

export const updateStockRepository = async (stockId, updatedData) => {
    try {
        const updatedStock = await Stock.findByIdAndUpdate(stockId, updatedData, { new: true });
        return updatedStock;
    } catch (error) {
        console.log("Error in updateStockRepository:", error);
        throw new Error("Could not update product from repository due to " + error);
    }
}

export const getAllStocksRepository = async () => {
    try {
        const stocks = await Stock.find({});
        return stocks;
    } catch (error) {
        console.log("Error in getAllStocksRepository:", error);
        throw new Error("Could not fetch products from repository due to " + error);
    }
}

export const getStockByIdRepository = async (stockId) => {
    try {
        const stock = await Stock.findById(stockId);
        return stock;
    } catch (error) {
        console.log("Error in getStockByIdRepository:", error);
        throw new Error("Could not fetch product from repository due to " + error);
    }
}

export const getSctockByProductIdRepository = async (productId) => {
    try {
        const stock = await Stock.find({ productId: productId }).populate('product_Id');
        return stock;
    } catch (error) {
        console.log("Error in getStockByProductIdRepository:", error);
        throw new Error("Could not fetch product from repository due to " + error);
    }
}

export const getStockByProductIdWithoutPriceRepository = async (productId) => {
    try {
        const stock = await Stock.find({ product_Id: productId, status: true }).select('-price');
        return stock;
    } catch (error) {
        console.log("Error in getStockByProductIdWithoutPriceRepository:", error);
        throw new Error("Could not fetch product from repository due to " + error);
    }
}

export const reduceStockQuantityRepository = async (stockId) => {
    try {
        const stock = await Stock.findById(stockId);
        if (!stock) {
            throw new Error("Stock not found");
        }
        stock.remainingQuantity -= 1;
        if (stock.remainingQuantity < 0) {
            stock.remainingQuantity = 0;
        }
        await stock.save();
        return stock;
    } catch (error) {
        console.log("Error in reduceStockQuantityRepository:", error);
        throw new Error("Could not reduce stock quantity due to " + error);
    }
}

export const getStockByCustomOrderIdRepository = async (orderId) => {
    try {
        const stock = await Stock.findOne({ stockId: orderId });
        return stock;
    } catch (error) {
        console.log("Error in getStockByCustomOrderIdRepository:", error);
        throw new Error("Could not fetch stock by custom order ID due to " + error);
    }
}