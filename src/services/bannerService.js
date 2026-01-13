import { activateBannerRepository, addBannerRepository, deactivateBannerRepository, deleteBannerRepository, getActiveBannersRepository, getAllBannersRepository, getBannerByIdRepository, getDeactivatedBannersRepository, updateBannerRepository } from "../repositories/bannerRepository.js";

// Service function to add a new banner

// Service function to add a new banner

export const addBannerService = async (bannerData) => {
    try {
        const banner = await addBannerRepository(bannerData);
        return banner;
    } catch (error) {
        console.log("Error in addBannerService:", error);
        throw new Error("Could not add banner from service due to " + error);
    }
}

// Service function to delete a banner by ID

export const deleteBannerService = async (bannerId) => {
    try {
        const deletedBanner = await deleteBannerRepository(bannerId);
        return deletedBanner;
    } catch (error) {
        console.log("Error in deleteBannerService:", error);
        throw new Error("Could not delete banner from service due to " + error);
    }
}

// Service function to update a banner by ID

export const updateBannerService = async (bannerId, updatedData) => {
    try {
        const updatedBanner = await updateBannerRepository(bannerId, updatedData);
        return updatedBanner;
    } catch (error) {
        console.log("Error in updateBannerService:", error);
        throw new Error("Could not update banner from service due to " + error);
    }
}

// Service function to get all banners

export const getAllBannersService = async () => {
    try {
        const banners = await getAllBannersRepository();
        return banners;
    } catch (error) {
        console.log("Error in getAllBannersService:", error);
        throw new Error("Could not fetch banners from service due to " + error);
    }
}

// Service function to get a banner by ID

export const getBannerByIdService = async (bannerId) => {
    try {
        const banner = await getBannerByIdRepository(bannerId); 
        return banner;
    } catch (error) {
        console.log("Error in getBannerByIdService:", error);
        throw new Error("Could not fetch banner from service due to " + error);
    }
}

// Service function to get all active banners

export const getActiveBannersService = async () => {
    try {
        const activeBanners = await getActiveBannersRepository();
        return activeBanners;
    } catch (error) {
        console.log("Error in getActiveBannersService:", error);
        throw new Error("Could not fetch active banners from service due to " + error);
    }
}

// Service function to get all deactivated banners

export const getDeactivatedBannersService = async () => {
    try {
        const deactivatedBanners = await getDeactivatedBannersRepository();
        return deactivatedBanners;
    } catch (error) {
        console.log("Error in getDeactivatedBannersService:", error);
        throw new Error("Could not fetch deactivated banners from service due to " + error);
    }
}

// Service function to deactivate a banner by ID

export const deactivateBannerService = async (bannerId) => {
    try {
        const deactivatedBanner = await deactivateBannerRepository(bannerId);
        return deactivatedBanner;
    } catch (error) {
        console.log("Error in deactivateBannerService:", error);
        throw new Error("Could not deactivate banner from service due to " + error);
    }
}

// Service function to activate a banner by ID

export const activateBannerService = async (bannerId) => {
    try {
        const activatedBanner = await activateBannerRepository(bannerId);
        return activatedBanner;
    } catch (error) {
        console.log("Error in activateBannerService:", error);
        throw new Error("Could not activate banner from service due to " + error);
    }
}