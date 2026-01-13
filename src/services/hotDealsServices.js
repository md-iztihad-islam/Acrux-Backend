import { addHotDealsRepository, deleteHotDealsRepository, getHotDealsRepository, updateHotDealsRepository } from "../repositories/hotDealsRepository.js";
import { getProductsByGroupIdRepsository } from "../repositories/productRepository.js";

export const addHotDealService = async (groupId) => {
    try {
        const products = await getProductsByGroupIdRepsository(groupId);

        const productIds = products.map(product => product._id);

        const hotDealData = {
            products: productIds
        }

        const hotDeal = await addHotDealsRepository(hotDealData);

        return hotDeal;
    } catch (error) {
        console.log("Error in addHotDealService:", error);
        throw new Error("Could not add hot deal due to " + error);
    }
}

export const deleteHotDealService = async (hotDealId) => {
    try {
        const deletedHotDeal = await deleteHotDealsRepository(hotDealId);
        return deletedHotDeal;
    } catch (error) {
        console.log("Error in deleteHotDealService:", error);
        throw new Error("Could not delete hot deal due to " + error);
    }
}

export const getHotDealsService = async () => {
    try {
        const hotDeal = await getHotDealsRepository();

        return hotDeal;
    } catch (error) {
        console.log("Error in getHotDealsService:", error);
        throw new Error("Could not fetch hot deals due to " + error);
    }
}

export const addProductToHotDealsService = async (groupId) => {
    try {
        const hotDeal = await getHotDealsRepository();  

        const products = await getProductsByGroupIdRepsository(groupId);

        const productIds = products.map(product => product._id);

        hotDeal.products.push(...productIds);

        const updatedHotDeal = await updateHotDealsRepository(hotDeal._id, { products: hotDeal.products });

        return updatedHotDeal;
    } catch (error) {
        console.log("Error in addProductToHotDealsService:", error);
        throw new Error("Could not add product to hot deals due to " + error);
    }
}

export const deleteProductFromHotDealsService = async (productId) => {
    try {
        const hotDeal = await getHotDealsRepository();

        hotDeal.products = hotDeal.products.filter(prodId => prodId.toString() !== productId);

        const updatedHotDeal = await updateHotDealsRepository(hotDeal._id, { products: hotDeal.products });

        return updatedHotDeal;
    } catch (error) {
        console.log("Error in deleteProductFromHotDealsService:", error);
        throw new Error("Could not delete product from hot deals due to " + error);
    }
}