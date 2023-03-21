const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

router.post("/product", ProductController.createProduct);
router.get("/product", ProductController.findAll);
router.get("/product/:id", ProductController.findOne);
router.put("/product/:id", ProductController.updateProduct);
router.delete("/product/:id", ProductController.deleteProduct);
router.get("/product/duplicate/:id", ProductController.duplicateProduct);
// const ProductModel = require("../models/product");

// router.post("/product", (req, res) => {
//   const data = req.body;
//   const product = new ProductModel.Product(data);
//   product.save().then(() => {
//     res.json({
//       resultCode: "20100",
//       resultDesc: "User created success",
//       developerMessage: "User created success",
//     });
//   });
// });
module.exports = router;
