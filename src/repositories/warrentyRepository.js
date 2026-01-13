import Warrenty from "../schemas/warrentySchema.js";

export const addWarrentyRepository = async (warrentyData) => {
    try {
        const newWarrenty = await Warrenty.create(warrentyData);
        return newWarrenty;
    } catch (error) {
        console.log("Error in addWarrentyRepository:", error);
        throw new Error("Could not add warrenty to repository due to " + error);
    }
}

export const getAllWarrentiesRepository = async () => {
    try {
        const warrenties = await Warrenty.find({});
        return warrenties;
    } catch (error) {
        console.log("Error in getAllWarrentiesRepository:", error);
        throw new Error("Could not fetch warrenties from repository due to " + error);
    }
}

export const getWarrentyByIdRepository = async (warrentyId) => {
    try {
        const warrenty = await Warrenty.findById(warrentyId);
        return warrenty;
    } catch (error) {
        console.log("Error in getWarrentyByIdRepository:", error);
        throw new Error("Could not fetch warrenty from repository due to " + error);
    }
}

export const updateWarrentyRepository = async (warrentyId, updatedData) => {
    try {
        const updatedWarrenty = await Warrenty.findByIdAndUpdate(warrentyId, updatedData, { new: true });
        return updatedWarrenty;
    } catch (error) {
        console.log("Error in updateWarrentyRepository:", error);
        throw new Error("Could not update warrenty in repository due to " + error);
    }
}

export const deleteWarrentyRepository = async (warrentyId) => {
    try {
        const deletedWarrenty = await Warrenty.findByIdAndDelete(warrentyId);
        return deletedWarrenty;
    } catch (error) {
        console.log("Error in deleteWarrentyRepository:", error);
        throw new Error("Could not delete warrenty from repository due to " + error);
    }
}

