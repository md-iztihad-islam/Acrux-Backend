import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    groupId: {
        type: String,
        required: true,
        unique: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true,
    },
}, { timestamps: true });


const Group = mongoose.model('Group', groupSchema);

export default Group;