import Group from "../schemas/groupSchema.js";

export const addGroupRepository = async (groupData) => {
    try {
        const group = await Group.create(groupData);
        return group;
    } catch (error) {
        console.log("Error in addGroupRepository: ", error);
        throw new Error("Could not add group from repository due to ", error);
    }
}

export const addProductToGroupRepository = async (groupId, productId) => {
    try {
        const group = await Group.findOne({ groupId: groupId });
        if (!group) {
            throw new Error("Group not found");
        }

        group.products.push(productId);
        await group.save();
        return group;
    } catch (error) {
        console.log("Error in addProductToGroupRepository: ", error);
        throw new Error("Could not add product to group from repository due to ", error);
    }
}

export const removeProductFromGroupRepository = async (groupId, productId) => {
    try {
        const group = await Group.findOne({ groupId: groupId });
        if (!group) {
            throw new Error("Group not found");
        }

        group.products.pull(productId);
        await group.save();
        return group;
    } catch (error) {
        console.log("Error in removeProductFromGroupRepository: ", error);
        throw new Error("Could not remove product from group from repository due to ", error);
    }
}

export const getGroupByIdRepository = async (groupId) => {
    try {
        const group = await Group.findOne({ groupId }).populate('products').populate('category').populate('subCategory');
        return group;
    } catch (error) {
        console.log("Error in getGroupByIdRepository: ", error);
        throw new Error("Could not fetch group from repository due to ", error);
    }
}

export const getGroupByGroupIdRepository = async (groupId) => {
    try {
        console.log("Fetching group with groupId: ", groupId);
        const group = await Group.findOne({ groupId: groupId }).populate('products').populate('category').populate('subCategory');
        if(group){
            return group.products;
        }else{
            return null;
        }
    } catch (error) {
        console.log("Error in getProductsByGroupIdRepository: ", error);
        throw new Error("Could not fetch products by group ID from repository due to ", error);
    }
}

export const getGroupBySubCategoryRepository = async (subCategoryId) => {
    try {
        const groups = await Group.find({ subCategory: subCategoryId }).populate('products').populate('category').populate('subCategory');
        console.log("Groups fetched for sub-category ID ", subCategoryId, ": ", groups);
        return groups;
    } catch (error) {
        console.log("Error in getGroupBySubCategoryRepository: ", error);
        throw new Error("Could not fetch groups by sub-category from repository due to ", error);
    }
}

