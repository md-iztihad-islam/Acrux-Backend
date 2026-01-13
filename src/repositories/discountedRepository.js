import Discounted from "../schemas/discountedSchema.js";

export const addDiscountedRepository = async (discountedData) => {
    try {
        const discounted = await Discounted.create(discountedData);
        return discounted;
    } catch (error) {
        console.log("Error in addDiscountedRepository:", error);
        throw new Error("Could not add discounted item due to " + error);
    }
}

export const deleteDiscountedRepository = async (discountedId) => {
    try {
        const deletedDiscounted = await Discounted.findByIdAndDelete(discountedId);
        return deletedDiscounted;
    } catch (error) {
        console.log("Error in deleteDiscountedRepository:", error);
        throw new Error("Could not delete discounted item due to " + error);
    }
}

export const getDiscountedRepository = async () => {
    try {
        const discounted = await Discounted.find({}).sort({ createdAt: -1 }).populate('products').populate({ path: 'products', populate: { path: 'subCategory', model: 'SubCategory' }});
        // console.log("Discounted items fetched:", discounted);

        return discounted;
    } catch (error) {
        console.log("Error in getDiscountedRepository:", error);
        throw new Error("Could not fetch discounted item due to " + error);
    }
}

export const updateDiscountedRepository = async (discountedId, updatedData) => {
    try {
        const updatedDiscounted = await Discounted.findByIdAndUpdate(discountedId, updatedData, { new: true });

        return updatedDiscounted;
    } catch (error) {
        console.log("Error in updateDiscountedRepository:", error);
        throw new Error("Could not update discounted item due to " + error);
    }
}