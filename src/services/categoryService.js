import { addCategoryRepository, deleteCategoryRepository, getAllCategoriesRepository, getCategoryByIdRepository, updateCategoryRepostory } from "../repositories/categoryRepository.js";

//Service functions for Category model

//Function to add a new category

export const addCategorySWervice = async (categoryData) => {
    try {
        const category = await addCategoryRepository(categoryData);
        return category;
    } catch (error) {
        console.log("Error in addCategoryService:", error);
        throw new Error("Could not add category from service due to ", error);
    }
}

//Function to delete a category by ID

export const deleteCategoryService = async (categoryId) => {
    try {
        const deletedCategory = await deleteCategoryRepository(categoryId);
        return deletedCategory;
    } catch (error) {
        console.log("Error in deleteCategoryService:", error);
        throw new Error("Could not delete category from service due to ", error);
    }
}

//Function to update a category by ID

export const updateCategoryService = async (categoryId, updatedData) => {
    try {
        const updatedCategory = await updateCategoryRepostory(categoryId, updatedData);
        return updatedCategory;
    } catch (error) {
        console.log("Error in updateCategoryService:", error);
        throw new Error("Could not update category from service due to ", error);
    }
}

//Function to get all categories

export const getAllCategoriesService = async () => {
    try {
        const categories = await getAllCategoriesRepository();
        return categories;
    } catch (error) {
        console.log("Error in getAllCategoriesService:", error);
        throw new Error("Could not fetch categories from service due to ", error);
    }
}

//Function to get a category by ID

export const getCategoryByIdService = async (categoryId) => {
    try {
        const category = await getCategoryByIdRepository(categoryId);
        return category;
    } catch (error) {
        console.log("Error in getCategoryByIdService:", error);
        throw new Error("Could not fetch category by ID from service due to ", error);
    }
}