import { addCustomerRepository, getCustomerByPhoneRepository } from "../repositories/customerRepository.js";
import { addOrderRepository, getAcceptedOrdersRepository, getAllOrdersRepository, getCancelledOrdersRepository, getOrderByIdRepository, getPendingOrdersRepository } from "../repositories/orderRepository.js";
import { getProductByIdRepository } from "../repositories/productRepository.js";
import { getStockByCustomOrderIdRepository, reduceStockQuantityRepository } from "../repositories/stockRepository.js";
import Order from "../schemas/orderSchema.js";
import Product from "../schemas/productSchema.js";
import generateAndUploadInvoice from "./generateInvoiceService.js";

// export const addOrderService = async (orderData) => {
//     try {
//         const order = await addOrderRepository(orderData);

//         const products = orderData.products;

//         for(let i=0; i < products.length; i++) {
//             const product = await Product.findById(products[i].productId);

//             if(!product) {
//                 throw new Error("Product not found with ID: " + products[i].productId);
//             }

//             product.stockQuantity -= products[i].productQuantity;

//             await product.save();
//         }

//         return order;
//     } catch (error) {
//         console.log("Error in addOrderService:", error);
//         throw new Error("Could not add order due to " + error);
//     }
// }

export const addOrderService = async (orderData) => {
    try {
        // console.log('Starting order service with data:', orderData);
        
        // First, create the order
        const order = await addOrderRepository(orderData);
        // console.log('Order created in database:', order._id);

        // Update product stock quantities
        const products = orderData.products;
        for(let i = 0; i < products.length; i++) {
            const product = await Product.findById(products[i].productId);

            if(!product) {
                console.error('Product not found with ID:', products[i].productId);
                throw new Error("Product not found with ID: " + products[i].productId);
            }

            // Only reduce stock if order is not cancelled
            if (order.orderStatus !== 'Cancelled') {
                product.stockQuantity -= products[i].productQuantity;
                await product.save();
                console.log(`Updated stock for product ${product.productName}: ${product.stockQuantity}`);
            }
        }

        // Generate and upload invoice for all orders
        try {
            // console.log('Generating invoice for order:', order.orderId);
            // Make sure order has all necessary fields
            const invoiceData = {
                ...order.toObject(),
                orderId: order.orderId || `ORDER_${order._id}`,
                createdAt: order.createdAt || new Date(),
                notes: orderData.notes || ''
            };
            
            const invoiceUrl = await generateAndUploadInvoice(invoiceData);
            
            // Update order with invoice URL
            order.invoiceUrl = invoiceUrl;
            await order.save();
            
            console.log(`Invoice generated and uploaded: ${invoiceUrl}`);
            
        } catch (invoiceError) {
            console.error('Failed to generate invoice, but order was created:', invoiceError);
            // Continue even if invoice generation fails
        }

        return order;
    } catch (error) {
        console.error("Error in addOrderService:", error);
        throw new Error("Could not add order due to: " + error.message);
    }
}

// New function to generate invoice for existing order
export const generateOrderInvoiceService = async (orderId) => {
    try {
        const order = await Order.findById(orderId).popuilate("products.productId");

        console.log("Order fetched for invoice generation:", order.products);
        
        if (!order) {
            throw new Error('Order not found');
        }

        // Generate and upload invoice
        const invoiceUrl = await generateAndUploadInvoice(order);
        
        // Update order with invoice URL
        order.invoiceUrl = invoiceUrl;
        await order.save();

        return invoiceUrl;
    } catch (error) {
        console.error('Error in generateOrderInvoiceService:', error);
        throw error;
    }
}

export const getPendingOrdersService = async () => {
    try {
        const orders = await getPendingOrdersRepository();

        return orders;
    } catch (error) {
        console.log("Error in getPendingOrdersService:", error);
        throw new Error("Could not fetch pending orders due to " + error);
    }
}

export const getAcceptedOrdersService = async () => {
    try {
        const orders = await getAcceptedOrdersRepository();
        return orders;
    } catch (error) {
        console.log("Error in getAcceptedOrdersService:", error);
        throw new Error("Could not fetch accepted orders due to " + error);
    }
}

export const getOrderByIdService = async (orderId) => {
    try {
        const order = await getOrderByIdRepository(orderId);
        return order;
    } catch (error) {
        console.log("Error in getOrderByIdService:", error);
        throw new Error("Could not fetch order due to " + error);
    }
}

export const confirmOrderService = async (orderId, orderData) => {
    try {
        const order = await getOrderByIdRepository(orderId);

        order.orderStatus = "Accepted";
        await order.save();


        return order;
    } catch (error) {
        console.log("Error in confirmOrderService:", error);
        throw new Error("Could not confirm order due to " + error);
    }
}

export const cancelOrderService = async (orderId) => {
    try {
        const order = await getOrderByIdRepository(orderId);

        order.orderStatus = "Cancelled";
        await order.save();
    } catch (error) {
        console.log("Error in cancelOrderService:", error);
        throw new Error("Could not cancel order due to " + error);
    }
}

export const getCancelledOrdersService = async () => {
    try {
        const orders = await getCancelledOrdersRepository();
        return orders;
    } catch (error) {
        console.log("Error in getCancelledOrdersService:", error);
        throw new Error("Could not fetch cancelled orders due to " + error);
    }
}

export const getAllOrdersService = async () => {
    try {
        const orders = await getAllOrdersRepository();
        return orders;
    } catch (error) {
        console.log("Error in getAllOrdersService:", error);
        throw new Error("Could not fetch orders due to " + error);
    }
}