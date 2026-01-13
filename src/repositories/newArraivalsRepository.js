import NewArraivals from "../schemas/newArraivalsSchema.js";
import { getSubCategoryByIdRepository } from "./subCategoryRepository.js";

export const addNewArraivalRepository = async (newArraivalData) => {
    try {
        const newArraival = await NewArraivals.create(newArraivalData);
        return newArraival;
    } catch (error) {
        console.log("Error in addNewArraivalRepository:", error);
        throw new Error("Could not add new arraival from repository due to " + error);
    }
}

export const deleteNewArraivalRepository = async (newArraivalId) => {
    try {
        const newArraival = await NewArraivals.findByIdAndDelete(newArraivalId);
        return newArraival;
    } catch (error) {
        console.log("Error in deleteNewArraivalRepository:", error);
        throw new Error("Could not delete new arraival from repository due to " + error);
    }
}

export const getNewArraivalsRepository = async () => {
    try {
        const newArraivals = await NewArraivals.find({}).populate('products').populate({ path: 'products', populate: { path: 'subCategory', model: 'SubCategory' }}).sort({ createdAt: -1 });        
        return newArraivals;
    } catch (error) {
        console.log("Error in getNewArraivalsRepository:", error);
        throw new Error("Could not fetch new arraivals from repository due to " + error);
    }
}

export const updateNewArraivalRepository = async (newArraivalId, updatedData) => {
    try {
        
    } catch (error) {
        console.log("Error in updateNewArraivalRepository:", error);
        throw new Error("Could not update new arraival from repository due to " + error);
    }
}

export const getNewArraivalIdRepository = async () => {
    try {
        const newArraival = await NewArraivals.findOne({}).sort({ createdAt: -1 }).populate('products');
        return newArraival;
    } catch (error) {
        console.log("Error in getNewArraivalIdRepository:", error);
        throw new Error("Could not fetch new arraival from repository due to " + error);
    }
}