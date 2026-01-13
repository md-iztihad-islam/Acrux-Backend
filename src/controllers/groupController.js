import { getGroupBySubCategoryService } from "../services/groupService.js";

export const getGroupBySubCategoryController = async (req, res) => {
    try {
        const subCategoryId = req.params.subcategoryid;
        console.log("Received request to fetch group for sub-category ID: ", subCategoryId);
        const group = await getGroupBySubCategoryService(subCategoryId);

        if(!group){
            return res.status(404).json({
                success: false,
                message: "Group not found for the given sub-category",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Group fetched successfully by sub-category",
            data: group
        });
    } catch (error) {
        console.log("Error in getGroupBySubCategoryController: ", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch group by sub-category from controller",
            error: error.message
        });
    }
}