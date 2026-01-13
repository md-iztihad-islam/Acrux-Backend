import express from 'express';
import { activateBannerController, addBannerController, deactivateBannerController, deleteBannerController, getActiveBannersController, getAllBannersController, getBannerByIdController, getDeactivatedBannersController, updateBannerController } from '../../controllers/bannerController.js';
import { s3Uploader } from '../../config/multerConfig.js';

const router = express.Router();

router.post("/add-banner", s3Uploader.single("image"), addBannerController);
router.delete("/delete-banner/:bannerId", deleteBannerController);
router.put("/update-banner/:bannerId", s3Uploader.single("image"), updateBannerController);
router.get("/get-all-banners", getAllBannersController);
router.get("/get-banner/:bannerId", getBannerByIdController);
router.get("/get-active-banners", getActiveBannersController);
router.get("/get-deactivated-banners", getDeactivatedBannersController);
router.put("/deactivate-banner/:bannerId", deactivateBannerController);
router.put("/activate-banner/:bannerId", activateBannerController);

export default router;

//This is the banner router that handles banner related routes