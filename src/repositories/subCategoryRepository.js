import SubCategory from "../schemas/subCategorySchema.js";

// Repository function to add a new sub-category

//Function to add a new sub-category

export const addSubCategoryRepository = async (subCategoryData) => {
    try {
        const subCategory = await SubCategory.create(subCategoryData);
        return subCategory;
    } catch (error) {
        console.log("Error in addSubCategoryRepository:", error);
        throw new Error("Could not add sub-category from repository due to " + error);
    }
}

//Function to delete a sub-category by ID

export const deleteSubCategoryRepository = async (subCategoryId) => {
    try {
        const deletedSubCategory = await SubCategory.findByIdAndDelete(subCategoryId);
        return deletedSubCategory;
    } catch (error) {
        console.log("Error in deleteSubCategoryRepository:", error);
        throw new Error("Could not delete sub-category from repository due to " + error);
    }
}

//Function to update a sub-category by ID

export const updateSubCategoryRepository = async (subCategoryId, updatedData) => {
    try {
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(subCategoryId, updatedData, { new: true });
        return updatedSubCategory;
    } catch (error) {
        console.log("Error in updateSubCategoryRepository:", error);
        throw new Error("Could not update sub-category from repository due to " + error);
    }
}

//Function to get all sub-categories

export const getAllSubCategoriesRepository = async () => {
    try {
        const subCategories = await SubCategory.find({}).populate('category');
        return subCategories;
    } catch (error) {
        console.log("Error in getAllSubCategoriesRepository:", error);
        throw new Error("Could not fetch sub-categories from repository due to " + error);
    }
}

//Function to get a sub-category by ID

export const getSubCategoryByIdRepository = async (subCategoryId) => {
    try {
        const subCategory = await SubCategory.findById(subCategoryId).populate('category');
        return subCategory;
    } catch (error) {
        console.log("Error in getSubCategoryByIdRepository:", error);
        throw new Error("Could not fetch sub-category by ID from repository due to " + error);
    }
}

//Function to get sub-categories by Category ID

export const getSubCategoriesByCategoryIdRepository = async (categoryId) => {
    try {
        const subCategories = await SubCategory.find({ category: categoryId }).populate('category');
        return subCategories;
    } catch (error) {
        console.log("Error in getSubCategoriesByCategoryIdRepository:", error);
        throw new Error("Could not fetch sub-categories by category ID from repository due to " + error);
    }
}