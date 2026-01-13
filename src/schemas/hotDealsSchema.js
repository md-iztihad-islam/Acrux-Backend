import mongoose from "mongoose";

const hotDealsSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        }
    ]
}, { timestamps: true })

const HotDeals = mongoose.model("HotDeals", hotDealsSchema);

export default HotDeals;