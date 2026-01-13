import { addNewArraivalService, addProductToNewArraivalsService, deleteNewArraivalService, deleteProductFromNewArraivalsService, getNewArraivalIdsService, getNewArraivalsService } from "../services/newArraivalsService.js";

export const addNewArraivalController = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { groupId } = req.body;

        const newArraival = await addNewArraivalService(groupId);

        if(!newArraival){
            return res.status(400).json({
                success: false,
                message: "Could not add new arraival"
            })
        }

        return res.status(200).json({
            success: true,
            message: "New arraival added successfully",
            data: newArraival
        })
    } catch (error) {
        console.log("Error in addNewArraivalController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not add new arraival due to " + error
        })
    }
}

export const deleteNewArraivalController = async (req, res) => {
    try {
        const { newArraivalId } = req.params;
        const deletedNewArraival = await deleteNewArraivalService(newArraivalId);

        if(!deletedNewArraival){
            return res.status(400).json({
                success: false,
                message: "Could not delete new arraival"
            })
        }

        return res.status(200).json({
            success: true,
            message: "New arraival deleted successfully",
            data: deletedNewArraival
        })
    } catch (error) {
        console.log("Error in deleteNewArraivalController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not delete new arraival due to " + error
        })
    }
}

export const getNewArraivalsController = async (req, res) => {
    try {
        const newArraivals = await getNewArraivalsService();

        if(!newArraivals){
            return res.status(400).json({
                success: false,
                message: "Could not fetch new arraivals"
            })
        }

        return res.status(200).json({
            success: true,
            message: "New arraivals fetched successfully",
            data: newArraivals
        })
    } catch (error) {
        console.log("Error in getNewArraivalsController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch new arraivals due to " + error
        })
    }
}

export const addProductToNewArraivalsController = async (req, res) => {
    try {
        const { groupId } = req.body;

        const updatedNewArraival = await addProductToNewArraivalsService(groupId);

        if(!updatedNewArraival){
            return res.status(400).json({
                success: false,
                message: "Could not add product to new arraivals"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product added to new arraivals successfully",
            data: updatedNewArraival
        })
    } catch (error) {
        console.log("Error in addProductToNewArraivalsController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not add product to new arraivals due to " + error
        })
    }
}

export const deleteProductFromNewArraivalsController = async (req, res) => {
    try {
        const { productId } = req.params;

        const updatedNewArraival = await deleteProductFromNewArraivalsService(productId);

        if(!updatedNewArraival){
            return res.status(400).json({
                success: false,
                message: "Could not delete product from new arraivals"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted from new arraivals successfully",
            data: updatedNewArraival
        })
    } catch (error) {
        console.log("Error in deleteProductFromNewArraivalsController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not delete product from new arraivals due to " + error
        })
    }
}

export const getNewArraivalsIdsController = async (req, res) => {
    try {
        console.log("Fetching new arraival IDs");
        const newArraival = await getNewArraivalIdsService(); 

        if(!newArraival){
            return res.status(400).json({
                success: false,
                message: "Could not fetch new arraivals"
            })
        }

        return res.status(200).json({
            success: true,
            message: "New arraivals fetched successfully",
            data: newArraival
        })
    } catch (error) {
        console.log("Error in getNewArraivalsController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch new arraivals due to " + error
        })
    }
}