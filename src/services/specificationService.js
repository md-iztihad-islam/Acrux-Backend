import { addSpecificatonRepository, deleteSpecificationRepository, getAllSpecificationsRepository, getSpecificationByIdRepository, getSpecificationsBySubCategoryRepository, updateSpecificationRepository } from "../repositories/specificationRepository.js";

//Service to add a new specification

//Service to add a new specification

export const addSpecificationService = async (specificationData) => {
    try {
        const specification = await addSpecificatonRepository(specificationData);
        return specification;
    } catch (error) {
        console.log("Error in addSpecificationService:", error);
        throw new Error("Could not add specification from service due to ", error);
    }
}

//Service to delete a specification by ID

export const deleteSpecificationService = async (specificationId) => {
    try {
        const deletedSpecification = await deleteSpecificationRepository(specificationId);
        return deletedSpecification;
    } catch (error) {
        console.log("Error in deleteSpecificationService:", error);
        throw new Error("Could not delete specification from service due to ", error);
    }
}

//Service to update a specification by ID

export const updateSpecificationService = async (specificationId, updatedData) => {
    try {
        const updatedSpecification = await updateSpecificationRepository(specificationId, updatedData);
        return updatedSpecification;
    } catch (error) {
        console.log("Error in updateSpecificationService:", error);
        throw new Error("Could not update specification from service due to ", error);
    }
}

//Service to get all specifications

export const getAllSpecificationsService = async () => {
    try {
        const specifications = await getAllSpecificationsRepository();
        return specifications;
    } catch (error) {
        console.log("Error in getAllSpecificationsService:", error);
        throw new Error("Could not fetch specifications from service due to ", error);
    }
}

//Service to get a specification by ID

export const getSpecificationByIdService = async (specificationId) => {
    try {
        const specification = await getSpecificationByIdRepository(specificationId);    
        return specification;
    } catch (error) {
        console.log("Error in getSpecificationByIdService:", error);
        throw new Error("Could not fetch specification from service due to ", error);
    }
}

//Service to get specifications by sub-category ID

export const getSpecificationsBySubCategoryService = async (subCategoryId) => {
    try {
        const specifications = await getSpecificationsBySubCategoryRepository(subCategoryId);
        return specifications;
    } catch (error) {
        console.log("Error in getSpecificationsBySubCategoryService:", error);
        throw new Error("Could not fetch specifications by sub-category from service due to ", error);
    }
}