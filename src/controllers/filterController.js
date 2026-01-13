import { addFilterService, deleteFilterService, getAllFiltersService, getFilterByIdService, getFiltersBySubCategoryIdService, updateFilterService } from "../services/filterService.js";

//Controller functions for Filter model

//Controller function to add a new filter

export const addFilterController = async (req, res) => {
    try {
        const filterData = req.body;
        const newFilter = await addFilterService(filterData);

        if(!newFilter){
            return res.status(400).json({
                success: false,
                message: "Failed to add filter",
            });
        }

        return res.status(201).json({
            success: true,
            message: "Filter added successfully",
            data: newFilter
        });
    } catch (error) {
        console.log("Error in addFilterController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not add filter from controller",
            error: error.message
        })
    }
}

//Controller function to delete a filter by ID

export const deleteFilterController = async (req, res) => {
    try {
        const filterId = req.params.filterid;
        const deletedFilter = await deleteFilterService(filterId);

        if(!deletedFilter){
            return res.status(404).json({
                success: false,
                message: "Filter not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Filter deleted successfully",
            data: deletedFilter
        });
    } catch (error) {
        console.log("Error in deleteFilterController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not delete filter from controller",
            error: error.message
        })
    }
}

//Controller function to update a filter by ID

export const updateFilterController = async (req, res) => {
    try {
        const filterId = req.params.filterid;
        const updatedData = req.body;
        console.log("Updated Data:", updatedData);
        const updatedFilter = await updateFilterService(filterId, updatedData);

        if(!updatedFilter){
            return res.status(404).json({
                success: false,
                message: "Filter not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Filter updated successfully",
            data: updatedFilter
        });
    } catch (error) {
        console.log("Error in updateFilterController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not update filter from controller",
            error: error.message
        })
    }
}

//Controller function to get all filters

export const getAllFiltersController = async (_, res) => {
    try {
        const filters = await getAllFiltersService();

        if(!filters){
            return res.status(404).json({
                success: false,
                message: "No filters found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Filters fetched successfully",
            data: filters
        });
    } catch (error) {
        console.log("Error in getAllFiltersController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch filters from controller",
            error: error.message
        })
    }
}

//Controller function to get a filter by ID

export const getFilterByIdController = async (req, res) => {
    try {
        const filterId = req.params.filterid;
        const filter = await getFilterByIdService(filterId);

        if(!filter){
            return res.status(404).json({
                success: false,
                message: "Filter not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Filter fetched successfully",
            data: filter
        });
    } catch (error) {
        console.log("Error in getFilterByIdController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch filter by ID from controller",
            error: error.message
        })
    }
}

//Controller function to get filters by Sub-Category ID

export const getFiltersBySubCategoryIdController = async (req, res) => {
    try {
        const subCategoryId = req.params.subcategoryid;
        const filters = await getFiltersBySubCategoryIdService(subCategoryId);

        if(!filters || filters.length === 0){
            return res.status(404).json({
                success: false,
                message: "No filters found for the given Sub-Category ID",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Filters fetched successfully",
            data: filters
        });
    } catch (error) {
        console.log("Error in getFiltersBySubCategoryController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch filters by Sub-Category ID from controller",
            error: error.message
        })
    }
}