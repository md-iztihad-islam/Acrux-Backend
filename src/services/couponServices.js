import { addCouponRepository, deleteCouponRepository, getActiveCouponsRepository, getAllCouponsRepository, getCouponByCodeRepository, getCouponByIdRepository, getDeactivatedCouponsRepository, getExpiredCouponsRepository, incrementCouponUsageRepository, updateCouponRepository } from "../repositories/couponRepository.js";

export const addCouponService = async (couponData) => {
    try {
        const coupon = await addCouponRepository(couponData);
        return coupon;
    } catch (error) {
        console.log("Error in addCouponService:", error);
        throw new Error("Could not add coupon due to " + error);
    }
}

export const updateCouponService = async (couponId, updatedData) => {
    try {
        const updatedCoupon = await updateCouponRepository(couponId, updatedData);
        return updatedCoupon;
    } catch (error) {
        console.log("Error in updateCouponService:", error);
        throw new Error("Could not update coupon due to " + error);
    }
}

export const deleteCouponService = async (couponId) => {
    try {
        const deletedCoupon = await deleteCouponRepository(couponId);
        return deletedCoupon;
    } catch (error) {
        console.log("Error in deleteCouponService:", error);
        throw new Error("Could not delete coupon due to " + error);
    }
}

export const getCouponByIdService = async (couponId) => {
    try {
        const coupon = await getCouponByIdRepository(couponId);
        return coupon;
    } catch (error) {
        console.log("Error in getCouponByIdService:", error);
        throw new Error("Could not fetch coupon due to " + error);
    }
}

export const getAllCouponsService = async () => {
    try {
        const coupons = await getAllCouponsRepository();
        return coupons;
    } catch (error) {
        console.log("Error in getAllCouponsService:", error);
        throw new Error("Could not fetch coupons due to " + error);
    }
}

export const getActiveCouponsService = async () => {
    try {
        const activeCoupons = await getActiveCouponsRepository();
        return activeCoupons;
    } catch (error) {
        console.log("Error in getActiveCouponsService:", error);
        throw new Error("Could not fetch active coupons due to " + error);
    }
}

export const getDeactivatedCouponsService = async () => {
    try {
        const deactivatedCoupons = await getDeactivatedCouponsRepository();
        return deactivatedCoupons;
    } catch (error) {
        console.log("Error in getDeactivatedCouponsService:", error);
        throw new Error("Could not fetch deactivated coupons due to " + error);
    }
}

export const getExpiredCouponsService = async () => {
    try {
        const expiredCoupons = await getExpiredCouponsRepository();
        return expiredCoupons;
    } catch (error) {
        console.log("Error in getExpiredCouponsService:", error);
        throw new Error("Could not fetch expired coupons due to " + error);
    }
}

export const getCouponByCodeService = async (code) => {
    try {
        const coupon = await getCouponByCodeRepository(code);
        return coupon;
    } catch (error) {
        console.log("Error in getCouponByCodeService:", error);
        throw new Error("Could not fetch coupon due to " + error);
    }
}

export const incrementCouponUsageService = async (couponId) => {
    try {
        const updatedCoupon = await incrementCouponUsageRepository(couponId);
        return updatedCoupon;
    } catch (error) {
        console.log("Error in incrementCouponUsageService:", error);
        throw new Error("Could not increment coupon usage due to " + error);
    }
}