import { addFilterItemService, deleteFilterItemService, getAllFilterItemsService, getFilterItemByIdService, getFilterItemsByFilterIdService, getFilterItemsBySubCategoryIdService, updateFilterItemService } from "../services/filterItemService.js";

//Controller functions for Filter Item model

//Controller function to add a new filter item

export const addFilterItemController = async (req, res) => {
    try {
        const filterData = req.body;
        const newFilterItem = await addFilterItemService(filterData);

        if(!newFilterItem){
            return res.status(400).json({
                success: false,
                message: "Failed to add filter item",
            });
        }

        return res.status(201).json({
            success: true,
            message: "Filter item added successfully",
            data: newFilterItem
        });
    } catch (error) {
        console.log("Error in addFilterItemController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not add filter item from controller",
            error: error.message
        })
    }
}

//Controller function to delete a filter item by ID

export const deleteFilterItemController = async (req, res) => {
    try {
        const filterItemId = req.params.filteritemid;
        const deletedFilterItem = await deleteFilterItemService(filterItemId);

        if(!deletedFilterItem){
            return res.status(404).json({
                success: false,
                message: "Filter item not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Filter item deleted successfully",
            data: deletedFilterItem
        });
    } catch (error) {
        console.log("Error in deleteFilterItemController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not delete filter item from controller",
            error: error.message
        })
    }
}

//Controller function to update a filter item by ID

export const updateFilterItemController = async (req, res) => {
    try {
        const filterItemId = req.params.filteritemid;
        const updatedData = req.body;
        const updatedFilterItem = await updateFilterItemService(filterItemId, updatedData);

        if(!updatedFilterItem){
            return res.status(404).json({
                success: false,
                message: "Filter item not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Filter item updated successfully",
            data: updatedFilterItem
        });
    } catch (error) {
        console.log("Error in updateFilterItemController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not update filter item from controller",
            error: error.message
        })
    }
}

//Controller function to get all filter items

export const getAllFilterItemsController = async (_, res) => {
    try {
        const filterItems = await getAllFilterItemsService();   

        if(!filterItems || filterItems.length === 0){
            return res.status(404).json({
                success: false,
                message: "No filter items found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Filter items fetched successfully",
            data: filterItems
        });
    } catch (error) {
        console.log("Error in getAllFilterItemsController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch filter items from controller",
            error: error.message
        })
    }
}

//Controller function to get a filter item by ID

export const getFilterItemByIdController = async (req, res) => {
    try {
        const filterItemId = req.params.filteritemid;
        const filterItem = await getFilterItemByIdService(filterItemId);

        if(!filterItem){
            return res.status(404).json({
                success: false,
                message: "Filter item not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Filter item fetched successfully",
            data: filterItem
        });
    } catch (error) {
        console.log("Error in getFilterItemByIdController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch filter item by ID from controller",
            error: error.message
        })
    }
}

export const getFilterItemsBySubCategoryIdController = async (req, res) => {
    try {
        const subCategoryId = req.params.subcategoryid;
        console.log("Sub-Category ID received:", subCategoryId);
        const filterItems = await getFilterItemsBySubCategoryIdService(subCategoryId);

        if(!filterItems || filterItems.length === 0){
            return res.status(404).json({
                success: false,
                message: "No filter items found for the given Sub-Category ID",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Filter items fetched successfully",
            data: filterItems
        });
    } catch (error) {
        console.log("Error in getFilterItemsBySubCategoryIdController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch filter items by Sub-Category ID from controller",
            error: error.message
        })
    }
}

//Controller function to get filter items by Filter ID

export const getFilterItemsByFilterIdController = async (req, res) => {
    try {
        const filterId = req.params.filterid;
        console.log("Filter ID received:", filterId);
        const filterItems = await getFilterItemsByFilterIdService(filterId);

        if(!filterItems || filterItems.length === 0){
            return res.status(404).json({
                success: false,
                message: "No filter items found for the given Filter ID",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Filter items fetched successfully",
            data: filterItems
        });
    } catch (error) {
        console.log("Error in getFilterItemsByFilterIdController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch filter items by Filter ID from controller",
            error: error.message
        })
    }
}