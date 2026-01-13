import { addFilterItemRepository, deleteFilterItemRepository, getAllFilterItemsRepository, getFilterItemByIdRepository, getFilterItemsByFilterIdRepository, getFilterItemsBySubCategoryIdRepository, updateFilterItemRepository } from "../repositories/filterItemRepository.js";

//Service functions for Filter Item model

//Function to add a new filter item

export const addFilterItemService = async (filterItemData) => {
    try {
        const filterItem = await addFilterItemRepository(filterItemData);
        return filterItem;
    } catch (error) {
        console.log("Error in addFilterItemService:", error);
        throw new Error("Could not add filter item from service due to " + error)
    }
}

//Function to delete a filter item by ID

export const deleteFilterItemService = async (filterItemId) => {
    try {
        const deletedFilterItem = await deleteFilterItemRepository(filterItemId);
        return deletedFilterItem;
    } catch (error) {
        console.log("Error in deleteFilterItemService:", error);
        throw new Error("Could not delete filter item from service due to " + error);
    }
}

//Function to update a filter item by ID

export const updateFilterItemService = async (filterItemId, updatedData) => {
    try {
        const updatedFilterItem = await updateFilterItemRepository(filterItemId, updatedData);
        return updatedFilterItem;
    } catch (error) {
        console.log("Error in updateFilterItemService:", error);
        throw new Error("Could not update filter item from service due to " + error);
    }
}

//Function to get all filter items

export const getAllFilterItemsService = async () => {
    try {
        const filterItems = await getAllFilterItemsRepository();
        return filterItems;
    } catch (error) {
        console.log("Error in getAllFilterItemsService:", error);
        throw new Error("Could not fetch filter items from service due to " + error);
    }
}

//Function to get a filter item by ID

export const getFilterItemByIdService = async (filterItemId) => {
    try {
        const filterItem = await getFilterItemByIdRepository(filterItemId);
        return filterItem;
    } catch (error) {
        console.log("Error in getFilterItemByIdService:", error);
        throw new Error("Could not fetch filter item by ID from service due to " + error);
    }
}

//Function to get filter items by Sub-Category ID

export const getFilterItemsBySubCategoryIdService = async (subCategoryId) => {
    try {
        const filterItems = await getFilterItemsBySubCategoryIdRepository(subCategoryId);
        return filterItems;
    } catch (error) {
        console.log("Error in getFilterItemsBySubCategoryIdService:", error);
        throw new Error("Could not fetch filter items by Sub-Category ID from service due to " + error);
    }
}

//Function to get filter items by Filter ID

export const getFilterItemsByFilterIdService = async (filterId) => {
    try {
        const filterItems = await getFilterItemsByFilterIdRepository(filterId);
        return filterItems;
    } catch (error) {
        console.log("Error in getFilterItemsByFilterIdService:", error);
        throw new Error("Could not fetch filter items by Filter ID from service due to " + error);
    }
}