const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();


router.get("/data/:id", productController.getDataById)
// router.patch("/update/:id", productController.updateDataById)

router.get("/products", productController.getAllProducts);

module.exports = router;