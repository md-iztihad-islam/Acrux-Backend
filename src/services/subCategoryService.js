import { addSubCategoryRepository, deleteSubCategoryRepository, getAllSubCategoriesRepository, getSubCategoriesByCategoryIdRepository, getSubCategoryByIdRepository, updateSubCategoryRepository } from "../repositories/subCategoryRepository.js";

//Service functions for Sub-Category model

//Function to add a new sub-category

export const addSubCategoryService = async (subCategogyData) => {
    try {
        const subCategory = await addSubCategoryRepository(subCategogyData);
        return subCategory;
    } catch (error) {
        console.log("Error in addSubCategoryService:", error);
        throw new Error("Could not add sub-category from service due to " + error)
    }
}

//Function to delete a sub-category by ID

export const deleteSubCategoryService = async (subCategoryId) => {
    try {
        const deletedSubCategory = await deleteSubCategoryRepository(subCategoryId);
        return deletedSubCategory;
    } catch (error) {
        console.log("Error in deleteSubCategoryService:", error);
        throw new Error("Could not delete sub-category from service due to " + error);
    }
}

//Function to update a sub-category by ID

export const updateSubCategoryService = async (subCategoryId, updatedData) => {
    try {
        const updatedSubCategory = await updateSubCategoryRepository(subCategoryId, updatedData);
        return updatedSubCategory;
    } catch (error) {
        console.log("Error in updateSubCategoryService:", error);
        throw new Error("Could not update sub-category from service due to " + error);
    }
}

//Function to get all sub-categories

export const getAllSubCategoriesService = async () => {
    try {
        const subCategories = await getAllSubCategoriesRepository();
        return subCategories;
    } catch (error) {
        console.log("Error in getAllSubCategoriesService:", error);
        throw new Error("Could not fetch sub-categories from service due to " + error);
    }
}

//Function to get a sub-category by ID

export const getSubCategoryByIdService = async (subCategoryId) => {
    try {
        const subCategory = await getSubCategoryByIdRepository(subCategoryId);
        return subCategory;
    } catch (error) {
        console.log("Error in getSubCategoryByIdService:", error);
        throw new Error("Could not fetch sub-category by ID from service due to " + error);
    }
}

//Function to get sub-categories by Category ID

export const getSubCategoriesByCategoryIdService = async (categoryId) => {
    try {
        const subCategories = await getSubCategoriesByCategoryIdRepository(categoryId);
        return subCategories;
    } catch (error) {
        console.log("Error in getSubCategoriesByCategoryIdService:", error);
        throw new Error("Could not fetch sub-categories by Category ID from service due to " + error);
    }
}