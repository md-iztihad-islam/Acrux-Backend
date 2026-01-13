import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory"
    },
    title: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Specification = mongoose.model("Specification", specificationSchema);

export default Specification;