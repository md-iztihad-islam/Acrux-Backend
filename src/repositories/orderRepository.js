import Order from "../schemas/orderSchema.js";

export const addOrderRepository = async (orderData) => {
    try {
        const order = await Order.create(orderData);
        return order;
    } catch (error) {
        console.log("Error in addOrderRepository:", error);
        throw new Error("Could not add order due to " + error);
    }
}

export const updateOrderRepository = async (orderId, updatedData) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedData, { new: true });

        return updatedOrder;
    } catch (error) {
        console.log("Error in updateOrderRepository:", error);
        throw new Error("Could not update order due to " + error);
    }
}

export const getOrderByIdRepository = async (orderId) => {
    try {
        const order = await Order.findById(orderId).populate("products.productId");
        return order;
    } catch (error) {
        console.log("Error in getOrderByIdRepository:", error);
        throw new Error("Could not fetch order due to " + error);
    }
}

export const getAllOrdersRepository = async () => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        return orders;
    } catch (error) {
        console.log("Error in getAllOrdersRepository:", error);
        throw new Error("Could not fetch orders due to " + error);
    }
}

export const getPendingOrdersRepository = async () => {
    try {
        const orders = await Order.find({ orderStatus: "Pending" }).sort({ createdAt: -1 }).populate("products.productId");
        return orders;
    } catch (error) {
        console.log("Error in getPendingOrdersRepository:", error);
        throw new Error("Could not fetch pending orders due to " + error);
    }
}

export const getAcceptedOrdersRepository = async () => {
    try {
        const orders = await Order.find({ orderStatus: "Accepted" }).sort({ createdAt: -1 }).populate("products.productId");
        return orders;
    } catch (error) {
        console.log("Error in getAcceptedOrdersRepository:", error);
        throw new Error("Could not fetch accepted orders due to " + error);
    }
}

export const getCancelledOrdersRepository = async () => {
    try {
        const orders = await Order.find({ orderStatus: "Cancelled" }).sort({ createdAt: -1 }).populate("products.productId");
        return orders;
    } catch (error) {
        console.log("Error in getCancelledOrdersRepository:", error);
        throw new Error("Could not fetch cancelled orders due to " + error);
    }
}