const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/product/orderController');

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;