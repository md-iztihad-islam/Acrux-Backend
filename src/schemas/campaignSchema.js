import mongoose from "mongoose";

const compaignSchema = new mongoose.Schema({
    campaignName: {
        type: String,
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        }
    ]
}, { timestamps: true })

const Campaign = mongoose.model("Campaign", compaignSchema);

export default Campaign;