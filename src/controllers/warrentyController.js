import { addWarrentyService, deleteWarrentyService, getAllWarrentiesService, getWarrentyByIdService, updateWarrentyService } from "../services/warrentyService.js";

export const addWarrentyController = async (req, res) => {
    try {
        const warrentyData = req.body;
        const newWarrenty = await addWarrentyService(warrentyData);

        if(!newWarrenty) {
            return res.status(400).json({
                success: false,
                message: "Failed to add warrenty"
            });
        }

        return res.status(201).json({
            success: true,
            message: "Warrenty added successfully",
            data: newWarrenty
        });
    } catch (error) {
        console.log("Error in addWarrentyController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

export const getAllWarrentiesController = async (req, res) => {
    try {
        const warrenties = await getAllWarrentiesService();

        return res.status(200).json({
            success: true,
            message: "Warrenties fetched successfully",
            data: warrenties
        });
    } catch (error) {
        console.log("Error in getAllWarrentiesController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

export const getWarrentyByIdController = async (req, res) => {
    try {
        const warrentyId = req.params.id;
        const warrenty = await getWarrentyByIdService(warrentyId);

        if(!warrenty) {
            return res.status(404).json({
                success: false,
                message: "Warrenty not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Warrenty fetched successfully",
            data: warrenty
        });
    } catch (error) {
        console.log("Error in getWarrentyByIdController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

export const updateWarrentyController = async (req, res) => {
    try {
        const warrentyId = req.params.id;
        const updatedData = req.body;
        const updatedWarrenty = await updateWarrentyService(warrentyId, updatedData);

        if(!updatedWarrenty) {
            return res.status(404).json({
                success: false,
                message: "Warrenty not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Warrenty updated successfully",
            data: updatedWarrenty
        });
    } catch (error) {
        console.log("Error in updateWarrentyController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

export const deleteWarrentyController = async (req, res) => {
    try {
        const warrentyId = req.params.id;
        const deletedWarrenty = await deleteWarrentyService(warrentyId);

        if(!deletedWarrenty) {
            return res.status(404).json({
                success: false,
                message: "Warrenty not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Warrenty deleted successfully",
            data: deletedWarrenty
        });
    } catch (error) {
        console.log("Error in deleteWarrentyController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}