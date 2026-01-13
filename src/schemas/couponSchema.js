import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    discountPercentage: {
        type: Number,
    },
    discountAmount: {
        type: Number,
    },
    expiryDate: {
        type: Date,
    },
    usageLimit: {
        type: Number,
    },
    timesUsed: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true })

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;