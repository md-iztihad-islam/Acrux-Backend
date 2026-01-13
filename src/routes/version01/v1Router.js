import express from 'express';
import categoryRouter from './categoryRouter.js';
import subCategoryRouter from './subCategoryRouter.js';
import filterRouter from './filterRouter.js';
import filterItemRouter from './filterItemRouter.js';
import specificationRouter from './specificationRouter.js';
import productRouter from './productRouter.js';
import bannerRouter from './bannerRoute.js';
import stockRouter from './stockRouter.js';
import newArraivalsRouter from './newArraivalsRoute.js';
import hotDealsRouter from './hotDealsRoute.js';
import discountedRouter from './discountedRoute.js';
import orderRouter from './orderRouter.js';
import couponRouter from './couponRouter.js';
import warrentyRouter from './warrentyRoute.js';
import groupRouter from './groupRouter.js';

const router = express.Router();

router.use('/category', categoryRouter);
router.use('/sub-category', subCategoryRouter);
router.use('/filter', filterRouter);
router.use('/filter-item', filterItemRouter);
router.use('/specification', specificationRouter);
router.use('/product', productRouter);
router.use('/banner', bannerRouter);
router.use('/stock', stockRouter);
router.use('/new-arraivals', newArraivalsRouter);
router.use('/hot-deals', hotDealsRouter);
router.use('/discounted', discountedRouter);
router.use('/order', orderRouter);
router.use('/coupon', couponRouter);
router.use('/warrenty', warrentyRouter);
router.use('/group', groupRouter);

export default router;

//This is the version 1 API router that reoutes to different modules