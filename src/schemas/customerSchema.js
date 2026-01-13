import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    customerName: {
        type: String,
    },
    customerPhone: {
        type: String,
        unique: true
    },
    customerEmail: {
        type: String,
    },
    customerAddress: {
        type: String,
    },
    numberOfOrders: {
        type: Number,
        default: 0
    },
    orderIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
}, { timestamps: true })

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;