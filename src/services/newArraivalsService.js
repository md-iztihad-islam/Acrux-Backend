import { addNewArraivalRepository, deleteNewArraivalRepository, getNewArraivalIdRepository, getNewArraivalsRepository, updateNewArraivalRepository } from "../repositories/newArraivalsRepository.js";
import { getProductsByGroupIdRepsository } from "../repositories/productRepository.js";

export const addNewArraivalService = async (groupId) => {
    try {
        console.log("Group ID in service:", groupId);
        const products = await getProductsByGroupIdRepsository(groupId);

        console.log("Products fetched for new arraival:", products);

        const productIds = products.map(product => product._id);

        const newArraivalData = {
            products: productIds
        }

        const newArraival = await addNewArraivalRepository(newArraivalData);
        return newArraival;
    } catch (error) {
        console.log("Error in addNewArraivalRepository:", error);
        throw new Error("Could not add new arraival from repository due to " + error);
    }
}

export const deleteNewArraivalService = async (newArraivalId) => {
    try {
        const newArraival = await deleteNewArraivalRepository(newArraivalId);
        return newArraival;
    } catch (error) {
        console.log("Error in deleteNewArraivalService:", error);
        throw new Error("Could not delete new arraival due to " + error);
    }
}

export const getNewArraivalsService = async () => {
    try {
        const newArraivals = await getNewArraivalsRepository();
        return newArraivals;
    } catch (error) {
        console.log("Error in getNewArraivalsService:", error);
        throw new Error("Could not fetch new arraivals due to " + error);
    }
}

export const addProductToNewArraivalsService = async (groupId) => {
    try {
        const newArraival = await getNewArraivalIdRepository();

        const products = await getProductsByGroupIdRepsository(groupId);

        const productIds = products.map(product => product._id);

        newArraival.products.push(...productIds);

        const updatedNewArraival = await updateNewArraivalRepository(newArraival._id, { products: newArraival.products });

        return updatedNewArraival;
    } catch (error) {
        console.log("Error in addProductToNewArraivalsService:", error);
        throw new Error("Could not add product to new arraivals due to " + error);
    }
}

export const deleteProductFromNewArraivalsService = async (productId) => {
    try {
        const newArraival = await getNewArraivalIdRepository();

        newArraival.products = newArraival.products.filter(prodId => prodId.toString() !== productId);

        const updatedNewArraival = await updateNewArraivalRepository(newArraival._id, { products: newArraival.products });

        return updatedNewArraival;
    } catch (error) {
        console.log("Error in deleteProductFromNewArraivalsService:", error);
        throw new Error("Could not delete product from new arraivals due to " + error);
    }
}

export const getNewArraivalIdsService = async () => {
    try {
        const newArraival = await getNewArraivalIdRepository();

        return newArraival;
    } catch (error) {
        console.log("Error in getNewArraivalsService:", error);
        throw new Error("Could not fetch new arraivals due to " + error);
    }
}