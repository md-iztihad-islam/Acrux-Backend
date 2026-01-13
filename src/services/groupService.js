import { getGroupBySubCategoryRepository } from "../repositories/groupRepository.js";

export const getGroupBySubCategoryService = async (subCategoryId) => {
    try {
        const group = await getGroupBySubCategoryRepository(subCategoryId);
        return group;
    } catch (error) {
        console.log("Error in getGroupBySubCategoryService: ", error);
        throw new Error("Could not fetch group by sub-category from service due to ", error);
    }
}