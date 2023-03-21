const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
    },
    price: {
      type: String,
    },
    lastUpdateDate: {
      type: Date,
      default: new Date(),
    },
  },
  { versionKey: false }
  // timestamps: true
);
const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
