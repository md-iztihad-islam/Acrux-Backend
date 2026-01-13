import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890", 12);

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
    },
    customerName: {
        type: String,
    },
    customerPhone: {
        type: String,
    },
    deliverAddress: {
        type: String,
    },
    area: {
        type: String,
    },
    totalAmount: {
        type: Number,
    },
    orderStatus: {
        type: String,
        default: "Pending"
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            productName: {
                type: String,
            },
            productPrice: {
                type: Number,
            },
            productQuantity: {
                type: Number,
            },
        }
    ],
    notes: {
        type: String,
    },
    invoiceUrl: {
        type: String,
    }
}, { timestamps: true });

orderSchema.pre("save", function(next){
    if(!this.isNew) return next();

    this.orderId = nanoid();
    next();
})

const Order = mongoose.model("Order", orderSchema);

export default Order;