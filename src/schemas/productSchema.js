import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890", 5);

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
    },
    image: {
        type: String
    },
    stockQuantity: {
        type: Number,
        required: true
    },
    mainPrice: {
        type: Number,
        required: true
    },
    discountAmount: {
        type: Number,
    },
    finalPrice: {
        type: Number,
        required: true
    },
}, {timestamps: true})

productSchema.pre("save", function(next){
    if(!this.isNew || this.productId) return next();

    this.productId = nanoid();
    next();
})

const Product = mongoose.model("Product", productSchema);

export default Product;