import { addDiscountedService, addProductToDiscountedService, deleteDiscountedService, deleteProductFromDiscountedService, getDiscountedService } from "../services/discountedService.js";

export const addDiscountedController = async (req, res) => {
    try {
        const { groupId } = req.body;

        const discounted = await addDiscountedService(groupId);

        if(!discounted){
            return res.status(400).json({
                success: false,
                message: "Could not add discounted product"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Discounted product added successfully",
            data: discounted
        })
    } catch (error) {
        console.log("Error in addDiscountedController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not add discounted product due to " + error
        })
    }
}

export const deleteDiscountedController = async (req, res) => {
    try {
        const { discountedId } = req.params;

        const deletedDiscounted = await deleteDiscountedService(discountedId);

        if(!deletedDiscounted){
            return res.status(400).json({
                success: false,
                message: "Could not delete discounted product"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Discounted product deleted successfully",
            data: deletedDiscounted
        })
    } catch (error) {
        console.log("Error in deleteDiscountedController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not delete discounted product due to " + error
        })
    }
}

export const getDiscountedController = async (req, res) => {
    try {
        const discounted = await getDiscountedService();

        if(!discounted){
            return res.status(400).json({
                success: false,
                message: "Could not fetch discounted products"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Discounted products fetched successfully",
            data: discounted
        })
    } catch (error) {
        console.log("Error in getDiscountedController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch discounted products due to " + error
        })
    }
}

export const addProductToDiscountedController = async (req, res) => {
    try {
        const { groupId } = req.body;

        const updatedDiscounted = await addProductToDiscountedService(groupId);

        if(!updatedDiscounted){
            return res.status(400).json({
                success: false,
                message: "Could not add product to discounted products"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product added to discounted products successfully",
            data: updatedDiscounted
        })
    } catch (error) {
        console.log("Error in addProductToDiscountedController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not add product to discounted products due to " + error
        })
    }
}

export const deleteProductFromDiscountedController = async (req, res) => {
    try {
        const { groupId } = req.body;

        const updatedDiscounted = await deleteProductFromDiscountedService(groupId);

        if(!updatedDiscounted){
            return res.status(400).json({
                success: false,
                message: "Could not delete product from discounted products"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted from discounted products successfully",
            data: updatedDiscounted
        })
    } catch (error) {
        console.log("Error in deleteProductFromDiscountedController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not delete product from discounted products due to " + error
        })
    }
}