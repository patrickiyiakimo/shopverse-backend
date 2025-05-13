const express = require('express');
const router = express.Router();

const orderRoutes = require('./orderRoutes');
const productRoutes = require('./productRoutes');

router.use('/orders', orderRoutes);
router.use('/products', productRoutes);

module.exports = router;
