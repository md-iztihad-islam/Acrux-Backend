import { activateBannerService, addBannerService, deactivateBannerService, deleteBannerService, getActiveBannersService, getAllBannersService, getBannerByIdService, getDeactivatedBannersService, updateBannerService } from "../services/bannerService.js";

// Controller function to add a new banner

// Controller function to add a new banner

export const addBannerController = async (req, res) => {
    try {
        const bannerData = req.body;
        const bannerImage = req.file;

        console.log("Banner data received:", bannerData);


        if(!bannerImage) {
            return res.status(400).json({
                success: false,
                message: "Banner image is required"
            });
        }

        bannerData.image = bannerImage.location;

        const newBanner = await addBannerService(bannerData);

        if(!newBanner) {
            return res.status(400).json({
                success: false,
                message: "Failed to add banner"
            });
        }

        return res.status(201).json({
            success: true,
            message: "Banner added successfully",
            data: newBanner
        });
    } catch (error) {
        console.log("Error in addBannerController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

// Controller function to delete a banner by ID

export const deleteBannerController = async (req, res) => {
    try {
        const { bannerId } = req.params;
        const deletedBanner = await deleteBannerService(bannerId);

        if(!deletedBanner) {
            return res.status(404).json({
                success: false,
                message: "Banner not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Banner deleted successfully",
            data: deletedBanner
        });
    } catch (error) {
        console.log("Error in deleteBannerController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

// Controller function to update a banner by ID

export const updateBannerController = async (req, res) => {
    try {
        const { bannerId } = req.params;
        const updatedData = req.body;
        const bannerImage = req.file;

        console.log("Banner data to update:", updatedData);

        if(bannerImage) {
            updatedData.image = bannerImage.location;
        }
        const updatedBanner = await updateBannerService(bannerId, updatedData);

        if(!updatedBanner) {
            return res.status(404).json({
                success: false,
                message: "Banner not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Banner updated successfully",
            data: updatedBanner
        });
    } catch (error) {
        console.log("Error in updateBannerController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

// Controller function to get all banners

export const getAllBannersController = async (_, res) => {
    try {
        const banners = await getAllBannersService();

        if(!banners) {
            return res.status(404).json({
                success: false,
                message: "No banners found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Banners fetched successfully",
            data: banners
        });
    } catch (error) {
        console.log("Error in getAllBannersController:", error);
        return res.status(500).json({   
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

// Controller function to get a banner by ID

export const getBannerByIdController = async (req, res) => {
    try {
        const { bannerId } = req.params;
        const banner = await getBannerByIdService(bannerId);

        if(!banner) {
            return res.status(404).json({
                success: false,
                message: "Banner not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Banner fetched successfully",
            data: banner
        });
    } catch (error) {
        console.log("Error in getBannerByIdController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

// Controller function to get all active banners

export const getActiveBannersController = async (_, res) => {
    try {
        const activeBanners = await getActiveBannersService();

        if(!activeBanners) {
            return res.status(404).json({
                success: false,
                message: "No active banners found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Active banners fetched successfully",
            data: activeBanners
        });
    } catch (error) {
        console.log("Error in getActiveBannersController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

// Controller function to get all deactivated banners

export const getDeactivatedBannersController = async (_, res) => {
    try {
        const deactivatedBanners = await getDeactivatedBannersService();

        if(!deactivatedBanners) {
            return res.status(404).json({
                success: false,
                message: "No deactivated banners found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Deactivated banners fetched successfully",
            data: deactivatedBanners
        });
    } catch (error) {
        console.log("Error in getDeactivatedBannersController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

// Controller function to deactivate a banner by ID

export const deactivateBannerController = async (req, res) => {
    try {
        const { bannerId } = req.params;
        const deactivatedBanner = await deactivateBannerService(bannerId);

        if(!deactivatedBanner) {
            return res.status(404).json({
                success: false,
                message: "Banner not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Banner deactivated successfully",
            data: deactivatedBanner
        });
    } catch (error) {
        console.log("Error in deactivateBannerController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

// Controller function to activate a banner by ID

export const activateBannerController = async (req, res) => {
    try {
        const { bannerId } = req.params;
        const activatedBanner = await activateBannerService(bannerId);

        if(!activatedBanner) {
            return res.status(404).json({
                success: false,
                message: "Banner not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Banner activated successfully",
            data: activatedBanner
        });
    } catch (error) {
        console.log("Error in activateBannerController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}