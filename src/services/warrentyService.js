import { addWarrentyRepository, deleteWarrentyRepository, getAllWarrentiesRepository, getWarrentyByIdRepository, updateWarrentyRepository } from "../repositories/warrentyRepository.js";

export const addWarrentyService = async (warrentyData) => {
    try {
        const newWarrenty = await addWarrentyRepository(warrentyData);
        return newWarrenty;
    } catch (error) {
        console.log("Error in addWarrentyService:", error);
        throw new Error("Could not add warrenty from service due to " + error);
    }
}

export const getAllWarrentiesService = async () => {
    try {
        const warrenties = await getAllWarrentiesRepository();
        return warrenties;
    } catch (error) {
        console.log("Error in getAllWarrentiesService:", error);
        throw new Error("Could not fetch warrenties from service due to " + error);
    }
}

export const getWarrentyByIdService = async (warrentyId) => {
    try {
        const warrenty = await getWarrentyByIdRepository(warrentyId);
        return warrenty;
    } catch (error) {
        console.log("Error in getWarrentyByIdService:", error);
        throw new Error("Could not fetch warrenty from service due to " + error);
    }
}

export const updateWarrentyService = async (warrentyId, updatedData) => {
    try {
        const updatedWarrenty = await updateWarrentyRepository(warrentyId, updatedData);
        return updatedWarrenty;
    } catch (error) {
        console.log("Error in updateWarrentyService:", error);
        throw new Error("Could not update warrenty from service due to " + error);
    }
}

export const deleteWarrentyService = async (warrentyId) => {
    try {
        const deletedWarrenty = await deleteWarrentyRepository(warrentyId);
        return deletedWarrenty;
    } catch (error) {
        console.log("Error in deleteWarrentyService:", error);
        throw new Error("Could not delete warrenty from service due to " + error);
    }
}