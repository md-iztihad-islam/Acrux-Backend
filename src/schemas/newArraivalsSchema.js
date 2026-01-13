import mongoose from "mongoose";

const newArraivalsSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        }
    ]
}, { timestamps: true })

const NewArraivals = mongoose.model("NewArraivals", newArraivalsSchema);

export default NewArraivals;