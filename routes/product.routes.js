const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();


router.get("/data/:id", productController.getDataById)
router.post("/orderconfirm", productController.orderSubmit)
// router.patch("/update/:id", productController.updateDataById)

router.get("/products", productController.getAllProducts);
router.get("/express", productController.getAllExpressDelivery);
router.get("/regular", productController.getAllRegularDelivery);
router.get("/orders", productController.getAllOrders)

module.exports = router;