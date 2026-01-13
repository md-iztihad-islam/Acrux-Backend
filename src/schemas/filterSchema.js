import mongoose from "mongoose";

const filterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true
    }
}, {timestamps: true});

const Filter = mongoose.model("Filter", filterSchema);

export default Filter;