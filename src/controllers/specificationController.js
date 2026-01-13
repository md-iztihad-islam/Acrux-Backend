import { addSpecificationService, deleteSpecificationService, getAllSpecificationsService, getSpecificationByIdService, getSpecificationsBySubCategoryService, updateSpecificationService } from "../services/specificationService.js";

//Controller function to add a new specification

//Controller function to add a new specification

export const addSpecificationController = async (req, res) => {
    try {
        const specificationData = req.body;
        const specification = await addSpecificationService(specificationData);

        if(!specification){
            return res.status(400).json({
                success: false,
                message: "Could not add specification",
            });
        }

        return res.status(201).json({
            success: true,
            message: "Specification added successfully",
            data: specification
        });
    } catch (error) {
        console.log("Error in addSpecificationController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not add specification from controller ",
            error: error.message
        })
    }
}

//Controller function to delete a specification by ID

export const deleteSpecificationController = async (req, res) => {
    try {
        const specificationId = req.params.specificationid;
        const deletedSpecification = await deleteSpecificationService(specificationId);

        if(!deletedSpecification){
            return res.status(404).json({
                success: false,
                message: "Specification not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Specification deleted successfully",
            data: deletedSpecification
        });
    } catch (error) {
        console.log("Error in deleteSpecificationController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not delete specification from controller ",
            error: error.message
        })
    }
}

//Controller function to update a specification by ID

export const updateSpecificationController = async (req, res) => {
    try {
        const specificationId = req.params.specificationid;
        const updatedData = req.body;
        console.log("Specification data to update:", updatedData);
        console.log("Specification ID to update:", specificationId);
        const updatedSpecification = await updateSpecificationService(specificationId, updatedData);

        if(!updatedSpecification){
            return res.status(404).json({
                success: false,
                message: "Specification not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Specification updated successfully",
            data: updatedSpecification
        });
    } catch (error) {
        console.log("Error in updateSpecificationController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not update specification from controller ",
            error: error.message
        })
    }
}

//Controller function to get all specifications

export const getAllSpecificationsController = async (req, res) => {
    try {
        const specifications = await getAllSpecificationsService();

        if(!specifications){
            return res.status(404).json({
                success: false,
                message: "No specifications found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Specifications fetched successfully",
            data: specifications
        });
    } catch (error) {
        console.log("Error in getAllSpecificationsController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch specifications from controller ",
            error: error.message
        })
    }
}

//Controller function to get a specification by ID

export const getSpecificationByIdController = async (req, res) => {
    try {
        const specificationId = req.params.specificationid;
        const specification = await getSpecificationByIdService(specificationId);

        if(!specification){
            return res.status(404).json({
                success: false,
                message: "Specification not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Specification fetched successfully",
            data: specification
        });
    } catch (error) {
        console.log("Error in getSpecificationByIdController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch specification from controller ",
            error: error.message
        })
    }
}

//Controller function to get specifications by sub-category ID

export const getSpecificationsBySubCategoryController = async (req, res) => {
    try {
        const subCategoryId = req.params.subcategoryid;
        const specifications = await getSpecificationsBySubCategoryService(subCategoryId);

        if(!specifications || specifications.length === 0){
            return res.status(404).json({
                success: false,
                message: "No specifications found for this sub-category",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Specifications fetched successfully",
            data: specifications
        });
    } catch (error) {
        console.log("Error in getSpecificationsBySubCategoryController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch specifications by sub-category from controller ",
            error: error.message
        })
    }
}