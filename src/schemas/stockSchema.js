import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    stockId: {
        type: String,
    },
    product_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    productId: {
        type: String,
    },
    serialNumber: [
        {
            type: String
        }
    ],
    quantity: {
        type: Number,
    },
    remainingQuantity: {
        type: Number,
    },
    price: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: true,
    },
    barcodePdfUrl: {
        type: String,
    }
}, { timestamps: true })

stockSchema.pre("save", function(next){
    if(!this.isNew) return next();

    const numberOfProducts = this.quantity || 0;
    const serialNumbers = [];

    const productIdStr = this.productId.toString() + this.stockId;

    for(let i=1; i<=numberOfProducts; i++){
        const serialNum = productIdStr + String(i).padStart(4, '0');
        serialNumbers.push(serialNum);
    }

    this.serialNumber = serialNumbers;
    next();

})

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;