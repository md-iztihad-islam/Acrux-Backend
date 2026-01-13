import express from 'express';
import { addOrderController, cancelOrderController, confirmOrderController, getAcceptedOrdersController, getAllOrdersController, getCancelledOrdersController, getOrderByIdController, getPendingOrdersController } from '../../controllers/orderController.js';

const router = express.Router();

router.post('/add-order', addOrderController);
router.get('/pending-orders', getPendingOrdersController);
router.get('/accepted-orders', getAcceptedOrdersController);
router.get('/order-by-orderid/:orderId', getOrderByIdController);
router.patch('/confirm-order/:orderId', confirmOrderController);
router.get('/get-accepted-orders', getAcceptedOrdersController);
router.patch('/cancel-order/:orderId', cancelOrderController);
router.get('/cancelled-orders', getCancelledOrdersController);
router.get('/all-orders', getAllOrdersController);

export default router;