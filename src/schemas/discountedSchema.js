import mongoose from "mongoose";

const discountedSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        }
    ]
}, { timestamps: true })

const Discounted = mongoose.model("Discounted", discountedSchema);

export default Discounted;