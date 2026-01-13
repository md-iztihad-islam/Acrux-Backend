import { addOrderService, cancelOrderService, confirmOrderService, getAcceptedOrdersService, getAllOrdersService, getCancelledOrdersService, getOrderByIdService, getPendingOrdersService } from "../services/orderService.js";

export const addOrderController = async (req, res) => {
    try {
        const orderData = req.body;

        console.log("Received order data:", orderData);

        const order = await addOrderService(orderData);

        if(!order) {
            return res.status(400).json({
                success: false,
                message: "Failed to add order"
            });
        }

        return res.status(201).json({
            success: true,
            message: "Order added successfully",
            data: order
        });
    } catch (error) {
        console.log("Error in addOrderController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not add order due to " + error
        })
    }
}

export const getPendingOrdersController = async (req, res) => {
    try {
        const orders = await getPendingOrdersService();

        if(!orders) {
            return res.status(404).json({
                success: false,
                message: "No pending orders found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Pending orders fetched successfully",
            data: orders
        });
    } catch (error) {
        console.log("Error in getPendingOrdersController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch pending orders due to " + error
        });
    }
}

export const getAcceptedOrdersController = async (req, res) => {
    try {
        const orders = await getAcceptedOrdersService();

        if(!orders) {
            return res.status(404).json({
                success: false,
                message: "No accepted orders found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Accepted orders fetched successfully",
            data: orders
        });
    } catch (error) {
        console.log("Error in getAcceptedOrdersController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch accepted orders due to " + error
        });
    }
}

export const getOrderByIdController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await getOrderByIdService(orderId);

        if(!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: order
        });
    } catch (error) {
        console.log("Error in getOrderByIdController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch order due to " + error
        });
    }
}

export const confirmOrderController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderData } = req.body;
        const order = await confirmOrderService(orderId, orderData);

        if(!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found or could not be confirmed"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order confirmed successfully",
            data: order
        });
    } catch (error) {
        console.log("Error in confirmOrderController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not confirm order due to " + error
        });
    }
}

export const cancelOrderController = async (req, res) => {
    try {
        const { orderId } = req.params;
        
        const order = await cancelOrderService(orderId);

        if(!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found or could not be cancelled"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
        });
    } catch (error) {
        console.log("Error in cancelOrderController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not cancel order due to " + error
        });
    }
}

export const getCancelledOrdersController = async (req, res) => {
    try {
        const orders = await getCancelledOrdersService();

        if(!orders) {
            return res.status(404).json({
                success: false,
                message: "No cancelled orders found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cancelled orders fetched successfully",
            data: orders
        });
    } catch (error) {
        console.log("Error in getCancelledOrdersController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch cancelled orders due to " + error
        });
    }
}

export const getAllOrdersController = async (req, res) => {
    try {
        console.log("getAllOrdersController called");
        const orders = await getAllOrdersService();

        if(!orders) {
            return res.status(404).json({
                success: false,
                message: "No orders found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        });
    } catch (error) {
        console.log("Error in getAllOrdersController:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch orders due to " + error
        });
    }
}