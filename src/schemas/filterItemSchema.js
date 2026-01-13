import mongoose from "mongoose";

const filterItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    filter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Filter",
        required: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true
    }
}, {timestamps: true});

const FilterItem = mongoose.model("FilterItem", filterItemSchema);

export default FilterItem;