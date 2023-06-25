const Order = require("../models/Order");
const Products = require("../models/Products");
const { getAllProductService, getAllOrdersService } = require("../services/product.service");


exports.getAllProducts = async (req, res) => {
  try {
    const { page, size } = req.query;

    let query = {};
    const { products, count } = await getAllProductService(Number(page), Number(size), query);

    res.status(200).send({
      status: "success",
      data: products,
      count: count
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};


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



exports.getAllOrders = async (req, res) => {
  try {
    const { page, size } = req.query;

    let query = {};
    const { orders, count } = await getAllOrdersService(Number(page), Number(size), query);

    res.status(200).send({
      status: "success",
      data: orders,
      count: count
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};


exports.getDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = await Products.findById(id);

    if (!productData) {
      return res.status(404).json({
        message: 'Data not found',
        status: 'fail'
      });
    }

    res.status(200).json({
      message: 'Data retrieved successfully',
      status: 'success',
      data: productData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
