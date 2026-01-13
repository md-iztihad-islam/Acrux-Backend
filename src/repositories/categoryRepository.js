import Category from "../schemas/categorySchema.js";

//Repository functions for Category model


//Function to add a new category

export const addCategoryRepository = async (categoryData) => {
    try {
        const category = await Category.create(categoryData);
        return category;
    } catch (error) {
        console.log("Error in addCategoryRepository:", error);
        throw new Error("Could not add category from repository due to ", error);
    }
}

//Function to delete a category by ID

export const deleteCategoryRepository = async (categoryId) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        return deletedCategory;
    } catch (error) {
        console.log("Error in deleteCategoryRepository:", error);
        throw new Error("Could not delete category from repository due to ", error);
    }
}

//Function to update a category by ID

export const updateCategoryRepostory = async (categoryId, updatedData) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, updatedData, { new: true });
        return updatedCategory;
    } catch (error) {
        console.log("Error in updateCategoryRepostory:", error);
        throw new Error("Could not update category from repository due to ", error);
    }
}

//Function to get all categories

export const getAllCategoriesRepository = async () => {
    try {
        const categories = await Category.find({});
        return categories;
    } catch (error) {
        console.log("Error in getAllCategoriesRepository:", error);
        throw new Error("Could not fetch categories from repository due to ", error);
    }
}

//Function to get a category by ID

export const getCategoryByIdRepository = async (categoryId) => {
    try {
        const category = await Category.findById(categoryId);
        return category;
    } catch (error) {
        console.log("Error in getCategoryByIdRepository:", error);
        throw new Error("Could not fetch category by ID from repository due to ", error);
    }
}