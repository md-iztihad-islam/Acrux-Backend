import { addDiscountedRepository, deleteDiscountedRepository, getDiscountedRepository, updateDiscountedRepository } from "../repositories/discountedRepository.js";
import { getProductsByGroupIdRepsository } from "../repositories/productRepository.js";

export const addDiscountedService = async (groupId) => {
    try {
        const products = await getProductsByGroupIdRepsository(groupId);

        const productIds = products.map(product => product._id);

        const discountedData = {
            products: productIds
        }

        const discounted = await addDiscountedRepository(discountedData);

        return discounted;
    } catch (error) {
        console.log("Error in addDiscountedService:", error);
        throw new Error("Could not add discounted product due to " + error);
    }
}

export const deleteDiscountedService = async (discountedId) => {
    try {
        const deletedDiscounted = await deleteDiscountedRepository(discountedId);
        return deletedDiscounted;
    } catch (error) {
        console.log("Error in deleteDiscountedService:", error);
        throw new Error("Could not delete discounted product due to " + error);
    }
}

export const getDiscountedService = async () => {
    try {
        const discounted = await getDiscountedRepository();

        return discounted;
    } catch (error) {
        console.log("Error in getDiscountedService:", error);
        throw new Error("Could not fetch discounted products due to " + error);
    }
}

export const addProductToDiscountedService = async (groupId) => {
    try {
        const discounted = await getDiscountedRepository();

        const products = await getProductsByGroupIdRepsository(groupId);

        const productIds = products.map(product => product._id);

        discounted.products.push(...productIds);

        const updatedDiscounted = await updateDiscountedRepository(discounted._id, { products: discounted.products });

        return updatedDiscounted;
    } catch (error) {
        console.log("Error in addProductToDiscountedService:", error);
        throw new Error("Could not add product to discounted products due to " + error);
    }
}

export const deleteProductFromDiscountedService = async (groupId) => {
    try {
        const discounted = await getDiscountedRepository();

        const products = await getProductsByGroupIdRepsository(groupId);

        const productIds = products.map(product => product._id);

        discounted.products = discounted.products.filter(prodId => !productIds.includes(prodId));

        const updatedDiscounted = await updateDiscountedRepository(discounted._id, { products: discounted.products });

        return updatedDiscounted;
    } catch (error) {
        console.log("Error in deleteProductFromDiscountedService:", error);
        throw new Error("Could not delete product from discounted products due to " + error);
    }
}
