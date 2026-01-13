import FilterItem from "../schemas/filterItemSchema.js";

//Function to add a new filter item

//Function to add a new filter item

export const addFilterItemRepository = async (filterItemData) => {
    try {
        const filterItem = await FilterItem.create(filterItemData);
        return filterItem;
    } catch (error) {
        console.log("Error in addFilterItemRepository:", error);
        throw new Error("Could not add filter item from repository due to " + error);
    }
}

//Function to delete a filter item by ID

export const deleteFilterItemRepository = async (filterItemId) => {
    try {
        const deletedFilterItem = await FilterItem.findByIdAndDelete(filterItemId);
        return deletedFilterItem;
    } catch (error) {
        console.log("Error in deleteFilterItemRepository:", error);
        throw new Error("Could not delete filter item from repository due to " + error);
    }
}

//Function to update a filter item by ID

export const updateFilterItemRepository = async (filterItemId, updatedData) => {
    try {
        const updatedFilterItem = await FilterItem.findByIdAndUpdate(filterItemId, updatedData, { new: true });
        return updatedFilterItem;
    } catch (error) {
        console.log("Error in updateFilterItemRepository:", error);
        throw new Error("Could not update filter item from repository due to " + error);
    }
}

//Function to get all filter items

export const getAllFilterItemsRepository = async () => {
    try {
        const filterItems = await FilterItem.find({}).populate('filter');
        return filterItems;
    } catch (error) {
        console.log("Error in getAllFilterItemsRepository:", error);
        throw new Error("Could not fetch filter items from repository due to " + error);
    }
}

//Function to get a filter item by ID

export const getFilterItemByIdRepository = async (filterItemId) => {
    try {
        const filterItem = await FilterItem.findById(filterItemId).populate('filter');
        return filterItem;
    } catch (error) {
        console.log("Error in getFilterItemByIdRepository:", error);
        throw new Error("Could not fetch filter item by ID from repository due to " + error);
    }
}

//Function to get filter items by Sub-Category ID

export const getFilterItemsBySubCategoryIdRepository = async ( subCategoryId) => {
    try {
        const filterItems = await FilterItem.find({ subCategory: subCategoryId }).populate('filter').populate('subCategory');
        return filterItems;
    } catch (error) {
        console.log("Error in getFilterItemsBySubCategoryIdRepository:", error);
        throw new Error("Could not fetch filter items by sub-category ID from repository due to " + error);
    }
}

//Function to get filter items by Filter ID

export const getFilterItemsByFilterIdRepository = async (filterId) => {
    try {
        const filterItems = await FilterItem.find({ filter: filterId }).populate('filter');
        console.log("Filter items fetched from repository:", filterItems);
        return filterItems;
    } catch (error) {
        console.log("Error in getFilterItemsByFilterIdRepository:", error);
        throw new Error("Could not fetch filter items by filter ID from repository due to " + error);
    }
}