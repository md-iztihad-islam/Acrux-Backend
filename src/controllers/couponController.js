import { addCouponService, deleteCouponService, getActiveCouponsService, getAllCouponsService, getCouponByCodeService, getCouponByIdService, getDeactivatedCouponsService, getExpiredCouponsService, incrementCouponUsageService, updateCouponService } from "../services/couponServices.js";

export const addCouponController = async (req, res) => {
    try {
        const couponData = req.body;
        const coupon = await addCouponService(couponData);

        if(!coupon) {
            return res.status(400).json({ 
                success: false, 
                message: "Failed to create coupon" 
            });
        }

        return res.status(201).json({ 
            success: true, 
            message: "Coupon created successfully", 
            data: coupon 
        });
    } catch (error) {
        console.log("Error in addCouponController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

export const updateCouponController = async (req, res) => {
    try {
        const couponId = req.params.id;
        const updatedData = req.body;
        const updatedCoupon = await updateCouponService(couponId, updatedData);

        if(!updatedCoupon) {
            return res.status(404).json({ 
                success: false, 
                message: "Coupon not found" 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Coupon updated successfully", 
            data: updatedCoupon 
        });
    } catch (error) {
        console.log("Error in updateCouponController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

export const deleteCouponController = async (req, res) => {
    try {
        const couponId = req.params.id;
        const deletedCoupon = await deleteCouponService(couponId);

        if(!deletedCoupon) {
            return res.status(404).json({ 
                success: false, 
                message: "Coupon not found" 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Coupon deleted successfully", 
            data: deletedCoupon 
        });
    } catch (error) {
        console.log("Error in deleteCouponController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

export const getCouponByIdController = async (req, res) => {
    try {
        const couponId = req.params.id;
        const coupon = await getCouponByIdService(couponId);

        if(!coupon) {
            return res.status(404).json({ 
                success: false, 
                message: "Coupon not found" 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Coupon fetched successfully", 
            data: coupon 
        });
    } catch (error) {
        console.log("Error in getCouponByIdController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

export const getAllCouponsController = async (req, res) => {
    try {
        const coupons = await getAllCouponsService();

        if(!coupons) {
            return res.status(404).json({ 
                success: false, 
                message: "No coupons found" 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Coupons fetched successfully", 
            data: coupons 
        });
    } catch (error) {
        console.log("Error in getAllCouponsController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

export const getActiveCouponsController = async (req, res) => {
    try {
        const activeCoupons = await getActiveCouponsService();

        if(!activeCoupons) {
            return res.status(404).json({ 
                success: false, 
                message: "No active coupons found" 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Active coupons fetched successfully", 
            data: activeCoupons 
        });
    } catch (error) {
        console.log("Error in getActiveCouponsController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

export const getDeactivatedCouponsController = async (req, res) => {
    try {
        const deactivatedCoupons = await getDeactivatedCouponsService();

        if(!deactivatedCoupons) {
            return res.status(404).json({ 
                success: false, 
                message: "No deactivated coupons found" 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Deactivated coupons fetched successfully", 
            data: deactivatedCoupons 
        });
    } catch (error) {
        console.log("Error in getDeactivatedCouponsController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

export const getExpiredCouponsController = async (req, res) => {
    try {
        const expiredCoupons = await getExpiredCouponsService();

        if(!expiredCoupons) {
            return res.status(404).json({ 
                success: false, 
                message: "No expired coupons found" 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Expired coupons fetched successfully", 
            data: expiredCoupons 
        });
    } catch (error) {
        console.log("Error in getExpiredCouponsController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

export const getCouponByCodeController = async (req, res) => {
    try {
        const code = req.params.code;
        console.log("Fetching coupon with code:", code);
        const coupon = await getCouponByCodeService(code);

        if(!coupon) {
            return res.status(404).json({ 
                success: false, 
                message: "Coupon not found" 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Coupon fetched successfully", 
            data: coupon 
        });
    } catch (error) {
        console.log("Error in getCouponByCodeController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

export const incrementCouponUsageController = async (req, res) => {
    try {
        const code = req.params.code;
        const updatedCoupon = await incrementCouponUsageService(code);

        if(!updatedCoupon) {
            return res.status(404).json({ 
                success: false, 
                message: "Coupon not found or could not increment usage" 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Coupon usage incremented successfully", 
            data: updatedCoupon 
        });
    } catch (error) {
        console.log("Error in incrementCouponUsageController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}