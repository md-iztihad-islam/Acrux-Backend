import { addFilterRepository, deleteFilterRepository, getAllFiltersRepository, getFilterByIdRepository, getFiltersBySubCategoryIdRepository, updateFilterRepository } from "../repositories/filterRepository.js";

//Service functions for Filter model

//Function to add a new filter

export const addFilterService = async (filterData) => {
    try {
        const filter = await addFilterRepository(filterData);
        return filter;
    } catch (error) {
        console.log("Error in addFilterService:", error);
        throw new Error("Could not add filter from service due to " + error)
    }
}

//Function to delete a filter by ID

export const deleteFilterService = async (filterId) => {
    try {
        const deletedFilter = await deleteFilterRepository(filterId);
        return deletedFilter;
    } catch (error) {
        console.log("Error in deleteFilterService:", error);
        throw new Error("Could not delete filter from service due to " + error);
    }
}

//Function to update a filter by ID

export const updateFilterService = async (filterId, updatedData) => {
    try {
        const updatedFilter = await updateFilterRepository(filterId, updatedData);
        return updatedFilter;
    } catch (error) {
        console.log("Error in updateFilterService:", error);
        throw new Error("Could not update filter from service due to " + error);
    }
}

//Function to get all filters

export const getAllFiltersService = async () => {
    try {
        const filters = await getAllFiltersRepository();
        return filters;
    } catch (error) {
        console.log("Error in getAllFiltersService:", error);
        throw new Error("Could not fetch filters from service due to " + error);
    }
}

//Function to get a filter by ID

export const getFilterByIdService = async (filterId) => {
    try {
        const filter = await getFilterByIdRepository(filterId);
        return filter;
    } catch (error) {
        console.log("Error in getFilterByIdService:", error);
        throw new Error("Could not fetch filter by ID from service due to " + error);
    }
}

//Function to get filters by Sub-Category ID

export const getFiltersBySubCategoryIdService = async (subCategoryId) => {
    try {
        const filters = await getFiltersBySubCategoryIdRepository(subCategoryId);
        return filters;
    } catch (error) {
        console.log("Error in getFiltersBySubCategoryIdService:", error);
        throw new Error("Could not fetch filters by Sub-Category ID from service due to " + error);
    }
}