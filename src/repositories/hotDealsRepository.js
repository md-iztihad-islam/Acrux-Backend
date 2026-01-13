import HotDeals from "../schemas/hotDealsSchema.js";

export const addHotDealsRepository = async (hotDealsData) => {
    try {
        const hotDeals = await HotDeals.create(hotDealsData);
        return hotDeals;
    } catch (error) {
        console.log("Error in addHotDealsRepository:", error);
        throw new Error("Could not add hot deals from repository due to " + error);
    }
}

export const deleteHotDealsRepository = async (hotDealsId) => {
    try {
        const deletedHotDeals = await HotDeals.findByIdAndDelete(hotDealsId);
        return deletedHotDeals;
    } catch (error) {
        console.log("Error in deleteHotDealsRepository:", error);
        throw new Error("Could not delete hot deals from repository due to " + error);
    }
}

export const getHotDealsRepository = async () => {
    try {
        const hotDeals = await HotDeals.find({}).sort({ createdAt: -1 }).populate('products').populate({ path: 'products', populate: { path: 'subCategory', model: 'SubCategory' }});
        return hotDeals;
    } catch (error) {
        console.log("Error in getHotDealsRepository:", error);
        throw new Error("Could not fetch hot deals from repository due to " + error);
    }
}

export const updateHotDealsRepository = async (hotDealsId, updatedData) => {
    try {
        const updatedHotDeals = await HotDeals.findByIdAndUpdate(hotDealsId, updatedData, { new: true });
        return updatedHotDeals;
    } catch (error) {
        console.log("Error in updateHotDealsRepository:", error);
        throw new Error("Could not update hot deals from repository due to " + error);
    }
}