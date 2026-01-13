import { addSubCategoryService, deleteSubCategoryService, getAllSubCategoriesService, getSubCategoriesByCategoryIdService, getSubCategoryByIdService, updateSubCategoryService } from "../services/subCategoryService.js";

//Controller functions for Sub-Category model

//Controller function to add a new sub-category

export const addSubCategoryController = async (req, res) => {
    try {
        const subCategoryData = req.body;
        const newSubCategory =  await addSubCategoryService(subCategoryData);

        if(!newSubCategory){
            return  res.status(400).json({
                success: false,
                message: "Failed to add sub-category",
            });
        }

        return res.status(201).json({
            success: true,
            message: "Sub-category added successfully",
            data: newSubCategory
        });
    } catch (error) {
        console.log("Error in addSubCategoryController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not add sub-category from controller",
            error: error.message
        })
    }
}

//Controller function to delete a sub-category by ID

export const deleteSubCategoryController = async (req, res) => {
    try {
        const subCategoryId = req.params.subcategoryid;
        const deletedSubCategory = await deleteSubCategoryService(subCategoryId);

        if(!deletedSubCategory){
            return res.status(404).json({
                success: false,
                message: "Sub-category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Sub-category deleted successfully",
            data: deletedSubCategory
        });
    } catch (error) {
        console.log("Error in deleteSubCategoryController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not delete sub-category from controller",
            error: error.message
        })
    }
}

//Controller function to update a sub-category by ID

export const updateSubCategoryController = async (req, res) => {
    try {
        const subCategoryId = req.params.subcategoryid;
        const updatedData = req.body;
        const updatedSubCategory = await updateSubCategoryService(subCategoryId, updatedData);

        if(!updatedSubCategory){
            return res.status(404).json({
                success: false,
                message: "Sub-category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Sub-category updated successfully",
            data: updatedSubCategory
        });
    } catch (error) {
        console.log("Error in updateSubCategoryController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not update sub-category from controller",
            error: error.message
        })
    }
}

//Controller function to get all sub-categories

export const getAllSubCategoriesController = async (_, res) => {
    try {
        const subCategories = await getAllSubCategoriesService();

        if(!subCategories || subCategories.length === 0){
            return res.status(404).json({
                success: false,
                message: "No sub-categories found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Sub-categories fetched successfully",
            data: subCategories
        });
    } catch (error) {
        console.log("Error in getAllSubCategoriesController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch sub-categories from controller",
            error: error.message
        })
    }
}

//Controller function to get a sub-category by ID

export const getSubCategoryByIdController = async (req, res) => {
    try {
        const subCategoryId = req.params.subcategoryid;
        const subCategory = await getSubCategoryByIdService(subCategoryId);

        if(!subCategory){
            return res.status(404).json({
                success: false,
                message: "Sub-category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Sub-category fetched successfully",
            data: subCategory
        });
    } catch (error) {
        console.log("Error in getSubCategoryByIdController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch sub-category by ID from controller",
            error: error.message
        })
    }
}

//Controller function to get sub-categories by Category ID

export const getSubCategoriesByCategoryIdController = async (req, res) => {
    try {
        const categoryId = req.params.categoryid;
        const subCategories = await getSubCategoriesByCategoryIdService(categoryId);

        if(!subCategories || subCategories.length === 0){
            return res.status(404).json({
                success: false,
                message: "No sub-categories found for the given category ID",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Sub-categories fetched successfully",
            data: subCategories
        });
    } catch (error) {
        console.log("Error in getSubCategoriesByCategoryIdController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch sub-categories by Category ID from controller",
            error: error.message
        })
    }
}