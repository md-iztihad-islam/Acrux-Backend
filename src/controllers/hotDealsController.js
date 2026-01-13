import { addHotDealService, addProductToHotDealsService, deleteHotDealService, deleteProductFromHotDealsService, getHotDealsService } from "../services/hotDealsServices.js";

export const addHotDealsController = async (req, res) => {
    try {
        const { groupId } = req.body;

        const hotDeal = await addHotDealService(groupId);

        if(!hotDeal){
            return res.status(400).json({
                success: false,
                message: "Could not add hot deal"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Hot deal added successfully",
            data: hotDeal
        })
    } catch (error) {
        console.log("Error in addHotDealsController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not add hot deals due to " + error
        })
    }
}

export const deleteHotDealsController = async (req, res) => {
    try {
        const { hotDealsId } = req.params;
        const deletedHotDeal = await deleteHotDealService(hotDealsId);

        if(!deletedHotDeal){
            return res.status(400).json({
                success: false,
                message: "Could not delete hot deal"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Hot deal deleted successfully",
            data: deletedHotDeal
        })
    } catch (error) {
        console.log("Error in deleteHotDealsController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not delete hot deal due to " + error
        })
    }
}

export const getHotDealsController = async (req, res) => {
    try {
        const hotDeal = await getHotDealsService();

        if(!hotDeal){
            return res.status(400).json({
                success: false,
                message: "Could not fetch hot deals"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Hot deals fetched successfully",
            data: hotDeal
        })
    } catch (error) {
        console.log("Error in getHotDealsController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch hot deals due to " + error
        })
    }
}

export const addProductToHotDealsController = async (req, res) => {
    try {
        const { groupId } = req.body;

        const updatedHotDeal = await addProductToHotDealsService(groupId);

        if(!updatedHotDeal){    
            return res.status(400).json({
                success: false,
                message: "Could not add product to hot deals"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product added to hot deals successfully",
            data: updatedHotDeal
        })
    } catch (error) {
        console.log("Error in addProductToHotDealsController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not add product to hot deals due to " + error
        })
    }
}

export const deleteProductFromHotDealsController = async (req, res) => {
    try {
        const { productId } = req.params;

        const updatedHotDeal = await deleteProductFromHotDealsService(productId);

        if(!updatedHotDeal){
            return res.status(400).json({
                success: false,
                message: "Could not delete product from hot deals"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted from hot deals successfully",
            data: updatedHotDeal
        })
    } catch (error) {
        console.log("Error in deleteProductFromHotDealsController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not delete product from hot deals due to " + error
        })
    }
}