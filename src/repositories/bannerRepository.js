import Banner from "../schemas/bannerSchema.js";

// Repository functions for Banner entity

// Function to add a new banner

export const addBannerRepository = async (bannerData) => {
    try {
        const banner = await Banner.create(bannerData);
        return banner;
    } catch (error) {
        console.log("Error in addBannerRepository:", error);
        throw new Error("Could not add banner from repository due to " + error);
    }
}

// Function to delete a banner by ID

export const deleteBannerRepository = async (bannerId) => {
    try {
        const deletedBanner = await Banner.findByIdAndDelete(bannerId);
        return deletedBanner;
    } catch (error) {
        console.log("Error in deleteBannerRepository:", error);
        throw new Error("Could not delete banner from repository due to " + error);
    }
}

// Function to update a banner by ID

export const updateBannerRepository = async (bannerId, updatedData) => {
    try {
        const updatedBanner = await Banner.findByIdAndUpdate(bannerId, updatedData, { new: true });
        return updatedBanner;
    } catch (error) {
        console.log("Error in updateBannerRepository:", error);
        throw new Error("Could not update banner from repository due to " + error);
    }
}

// Function to get all banners

export const getAllBannersRepository = async () => {
    try {
        const banners = await Banner.find({});
        return banners;
    } catch (error) {
        console.log("Error in getAllBannersRepository:", error);
        throw new Error("Could not fetch banners from repository due to " + error);
    }
}

// Function to get a banner by ID

export const getBannerByIdRepository = async (bannerId) => {
    try {
        const banner = await Banner.findById(bannerId);
        return banner;
    } catch (error) {
        console.log("Error in getBannerByIdRepository:", error);
        throw new Error("Could not fetch banner from repository due to " + error);
    }
}

// Function to get all active banners

export const getActiveBannersRepository = async () => {
    try {
        const banners = await Banner.find({ isActive: true });
        return banners;
    } catch (error) {
        console.log("Error in getActiveBannersRepository:", error);
        throw new Error("Could not fetch active banners from repository due to " + error);
    }
}

// Function to get all deactivated banners

export const getDeactivatedBannersRepository = async () => {
    try {
        const banners = await Banner.find({ isActive: false });
        return banners;
    } catch (error) {
        console.log("Error in getDeactivatedBannersRepository:", error);
        throw new Error("Could not fetch deactivated banners from repository due to " + error);
    }
}

// Function to deactivate a banner by ID

export const deactivateBannerRepository = async (bannerId) => {
    try {
        const updatedBanner = await Banner.findByIdAndUpdate(bannerId, { isActive: false }, { new: true });
        return updatedBanner;
    } catch (error) {
        console.log("Error in deactivateBannerRepository:", error);
        throw new Error("Could not deactivate banner from repository due to " + error);
    }
}

// Function to activate a banner by ID

export const activateBannerRepository = async (bannerId) => {
    try {
        const updatedBanner = await Banner.findByIdAndUpdate(bannerId, { isActive: true }, { new: true });
        return updatedBanner;
    } catch (error) {
        console.log("Error in activateBannerRepository:", error);
        throw new Error("Could not activate banner from repository due to " + error);
    }
}