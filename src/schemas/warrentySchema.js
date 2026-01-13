import mongoose from "mongoose";

const warrentySchema = new mongoose.Schema({
    title: {
        type: String,
    },
    warrentyPeriod: {
        type: String,
    },
    description: {
        type: String,
    }
}, {timestamps: true})

const Warrenty = mongoose.model("Warrenty", warrentySchema);

export default Warrenty;