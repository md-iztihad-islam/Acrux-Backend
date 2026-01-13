import { addCategorySWervice, deleteCategoryService, getAllCategoriesService, getCategoryByIdService, updateCategoryService } from "../services/categoryService.js";

//Controller functions for Category model

//Controller function to add a new category

export const addCategoryController = async (req, res) => {
    try {
        const categoryData = req.body;
        const newCategory = await addCategorySWervice(categoryData);

        if(!newCategory){
            return res.status(400).json({
                success: false,
                message: "Failed to add category",
            });
        }

        return res.status(201).json({
            success: true,
            message: "Category added successfully",
            data: newCategory
        });
    } catch (error) {
        console.log("Error in addCategoryController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not add category from controller ",
            error: error.message
        })
    }
}

//Controller function to delete a category by ID

export const deleteCategoryController = async (req, res) => {
    try {
        const categoryId = req.params.categoryid;
        const deletedCategory = await deleteCategoryService(categoryId);

        if(!deletedCategory){
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: deletedCategory
        });
    } catch (error) {
        console.log("Error in deleteCategoryController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not delete category from controller ",
            error: error.message
        })
    }
}

//Controller function to update a category by ID

export const updateCategoryController = async (req, res) => {
    try {
        const categoryId = req.params.categoryid;
        const updatedData = req.body;
        const updatedCategory = await updateCategoryService(categoryId, updatedData);

        if(!updatedCategory){
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: updatedCategory
        });
    } catch (error) {
        console.log("Error in updateCategoryController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not update category from controller ",
            error: error.message
        })
    }
}

//Controller function to get all categories

export const getAllCategoriesController = async (_, res) => {
    try {
        const categories = await getAllCategoriesService();

        if(categories.length === 0){
            return res.status(404).json({
                success: false,
                message: "No categories found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: categories
        });
    } catch (error) {
        console.log("Error in getAllCategoriesController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch categories from controller ",
            error: error.message
        })
    }
}

//Controller function to get a category by ID

export const getCategoryByIdController = async (req, res) => {
    try {
        const categoryId = req.params.categoryid;
        const category = await getCategoryByIdService(categoryId);

        if(!category){
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            data: category
        });
    } catch (error) {
        console.log("Error in getCategoryByIdController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch category by ID from controller ",
            error: error.message
        })
    }
}