import Filter from "../schemas/filterSchema.js";

//Function to add a new filter

//Function to add a new filter

export const addFilterRepository = async (filterData) => {
    try {
        const filter = await Filter.create(filterData);
        return filter;
    } catch (error) {
        console.log("Error in addFilterRepository:", error);
        throw new Error("Could not add filter from repository due to " + error);
    }
}

//Function to delete a filter by ID

export const deleteFilterRepository = async (filterId) => {
    try {
        const deletedFilter = await Filter.findByIdAndDelete(filterId);
        return deletedFilter;
    } catch (error) {
        console.log("Error in deleteFilterRepository:", error);
        throw new Error("Could not delete filter from repository due to " + error);
    }
}

//Function to update a filter by ID

export const updateFilterRepository = async (filterId, updatedData) => {
    try {
        const updatedFilter = await Filter.findByIdAndUpdate(filterId, updatedData, { new: true });
        return updatedFilter;
    } catch (error) {
        console.log("Error in updateFilterRepository:", error);
        throw new Error("Could not update filter from repository due to " + error);
    }
}

//Function to get all filters

export const getAllFiltersRepository = async () => {
    try {
        const filters = await Filter.find({}).populate('subCategory');
        return filters;
    } catch (error) {
        console.log("Error in getAllFiltersRepository:", error);
        throw new Error("Could not fetch filters from repository due to " + error);
    }
}

//Function to get a filter by ID

export const getFilterByIdRepository = async (filterId) => {
    try {
        const filter = await Filter.findById(filterId).populate('subCategory');
        return filter;
    } catch (error) {
        console.log("Error in getFilterByIdRepository:", error);
        throw new Error("Could not fetch filter by ID from repository due to " + error);
    }
}

//Function to get filters by Sub-Category ID

export const getFiltersBySubCategoryIdRepository = async (subCategoryId) => {
    try {
        const filters = await Filter.find({ subCategory: subCategoryId }).populate('subCategory');
        return filters;
    } catch (error) {
        console.log("Error in getFiltersByCategoryIdRepository:", error);
        throw new Error("Could not fetch filters by sub-category ID from repository due to " + error);
    }
}