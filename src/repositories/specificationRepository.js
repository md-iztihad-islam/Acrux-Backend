import Specification from "../schemas/specificatonSchema.js";

export const addSpecificatonRepository = async (specificationData) => {
    try {
        console.log("Specification Data in Repository:", specificationData);
        const specification = await Specification.create(specificationData);
        return specification;
    } catch (error) {
        console.log("Error in addSpecificatonRepository:", error);
        throw new Error("Could not add specifcation from repository due to " + error);
    }
}

export const deleteSpecificationRepository = async (specificationId) => {
    try {
        const deletedSpecification = await Specification.findByIdAndDelete(specificationId);
        return deletedSpecification;
    } catch (error) {
        console.log("Error in deleteSpecificationRepository:", error);
        throw new Error("Could not delete specification from repository due to " + error);
    }
}

export const updateSpecificationRepository = async (specificationId, updatedData) => {
    try {
        const updatedSpecification = await Specification.findByIdAndUpdate(specificationId, updatedData, { new: true });
        return updatedSpecification;
    } catch (error) {
        console.log("Error in updateSpecificationRepository:", error);
        throw new Error("Could not update specification from repository due to " + error);
    }
}

export const getAllSpecificationsRepository = async () => {
    try {
        const specifications = await Specification.find({});
        return specifications;
    } catch (error) {
        console.log("Error in getAllSpecificationsRepository:", error);
        throw new Error("Could not fetch specifications from repository due to " + error);
    }
}

export const getSpecificationByIdRepository = async (specificationId) => {
    try {
        const specification = await Specification.findById(specificationId);
        return specification;
    } catch (error) {
        console.log("Error in getSpecificationByIdRepository:", error);
        throw new Error("Could not fetch specification from repository due to " + error);
    }
}

export const getSpecificationsBySubCategoryRepository = async (subCategoryId) => {
    try {
        const specifications = await Specification.find({ subCategory: subCategoryId }).populate('subCategory').populate('category');
        return specifications;
    } catch (error) {
        console.log("Error in getSpecificationsBySubCategoryRepository:", error);
        throw new Error("Could not fetch specifications by sub-category from repository due to " + error);
    }
}