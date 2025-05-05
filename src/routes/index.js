import express from 'express';
import userRoutes from './user.routes.js'
import productRoutes from './product.routes.js'
import categoryRoutes from './category.routes.js'
const router = express.Router();

router.use('/auth', userRoutes);
router.use('/api', productRoutes);
router.use('/api', categoryRoutes);
export default router;
