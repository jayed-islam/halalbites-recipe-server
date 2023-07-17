const Order = require("../models/Order");

// order submit
exports.orderSubmit = async (req, res) => {
    try {
        const orderNumber = await Order.countDocuments();
        const orderData = {
            ...req.body,
            orderNumber: orderNumber + 1
        };

        const newOrder = new Order(orderData);
        await newOrder.save();


        res.status(201).json({
            status: "success",
            message: "Successfully Submitted Order",
            orderNumber: newOrder.orderNumber,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error,
        });
    }
};



// Controller function to get user orders by email
exports.getUserOrders = async (req, res) => {
    try {
        const { email } = req.query;

        const orders = await Order.find({ email });

        if (!orders.length) {
            return res.status(404).json({
                status: 'fail',
                message: 'No orders found for the provided email.',
            });
        }

        res.status(200).json({
            status: 'success',
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while fetching user orders.',
            error: error.message,
        });
    }
};