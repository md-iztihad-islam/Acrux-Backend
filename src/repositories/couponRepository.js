import Coupon from "../schemas/couponSchema.js";

export const addCouponRepository = async (couponData) => {
    try {
        const coupon = await Coupon.create(couponData);
        return coupon;
    } catch (error) {
        console.log("Error in addCouponRepository:", error);
        throw new Error("Could not add coupon due to " + error);
    }
}

export const updateCouponRepository = async (couponId, updatedData) => {
    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updatedData, { new: true });
        return updatedCoupon;
    } catch (error) {
        console.log("Error in updateCouponRepository:", error);
        throw new Error("Could not update coupon due to " + error);
    }
}

export const deleteCouponRepository = async (couponId) => {
    try {
        const deletedCoupon = await Coupon.findByIdAndDelete(couponId); 
        return deletedCoupon;
    } catch (error) {
        console.log("Error in deleteCouponRepository:", error);
        throw new Error("Could not delete coupon due to " + error);
    }
}

export const getCouponByIdRepository = async (couponId) => {
    try {
        const coupon = await Coupon.findById(couponId);
        return coupon;
    } catch (error) {
        console.log("Error in getCouponByIdRepository:", error);
        throw new Error("Could not fetch coupon due to " + error);
    }
}

export const getAllCouponsRepository = async () => {
    try {
        const coupons = await Coupon.find({}).sort({ createdAt: -1 });
        return coupons;
    } catch (error) {
        console.log("Error in getAllCouponsRepository:", error);
        throw new Error("Could not fetch coupons due to " + error);
    }
}

export const getActiveCouponsRepository = async () => {
    try {
        const activeCoupons = await Coupon.find({ isActive: true, expiryDate: { $gt: new Date() } }).sort({ createdAt: -1 });
        console.log("Active Coupons:", activeCoupons);
        return activeCoupons;
    } catch (error) {
        console.log("Error in getActiveCouponsRepository:", error);
        throw new Error("Could not fetch active coupons due to " + error);
    }
}

export const getDeactivatedCouponsRepository = async () => {
    try {
        const deactivatedCoupons = await Coupon.find({ isActive: false, expiryDate: { $gt: new Date() } }).sort({ createdAt: -1 });
        console.log("Deactivated Coupons:", deactivatedCoupons);
        return deactivatedCoupons;
    } catch (error) {
        console.log("Error in getDeactivatedCouponsRepository:", error);
        throw new Error("Could not fetch deactivated coupons due to " + error);
    }
}

export const getExpiredCouponsRepository = async () => {
    try {
        const expiredCoupons = await Coupon.find({ expiryDate: { $lt: new Date() } }).sort({ createdAt: -1 });
        return expiredCoupons;
    } catch (error) {
        console.log("Error in getExpiredCouponsRepository:", error);
        throw new Error("Could not fetch expired coupons due to " + error);
    }
}

export const getCouponByCodeRepository = async (code) => {
    try {
        const coupon = await Coupon.findOne({ code: code });
        return coupon;
    } catch (error) {
        console.log("Error in getCouponByCodeRepository:", error);
        throw new Error("Could not fetch coupon due to " + error);
    }
}

export const incrementCouponUsageRepository = async (couponId) => {
    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(
            couponId,
            { $inc: { timesUsed: 1 } },
            { new: true }
        );
        return updatedCoupon;
    } catch (error) {
        console.log("Error in incrementCouponUsageRepository:", error);
        throw new Error("Could not increment coupon usage due to " + error);
    }
}