import express from 'express';
import { addCouponController, deleteCouponController, getActiveCouponsController, getAllCouponsController, getCouponByCodeController, getCouponByIdController, getDeactivatedCouponsController, getExpiredCouponsController, incrementCouponUsageController, updateCouponController } from '../../controllers/couponController.js';

const router = express.Router();

router.post("/add-coupon", addCouponController);
router.put("/update-coupon/:id", updateCouponController);
router.delete("/delete-coupon/:id", deleteCouponController);
router.get("/get-coupon/:id", getCouponByIdController);
router.get("/get-all-coupons", getAllCouponsController);
router.get("/get-active-coupons", getActiveCouponsController);
router.get("/get-deactive-coupons", getDeactivatedCouponsController);
router.get("/get-expired-coupons", getExpiredCouponsController);
router.put("/increment-usage/:code", incrementCouponUsageController);
router.get("/get-coupon-by-code/:code", getCouponByCodeController);

export default router;
