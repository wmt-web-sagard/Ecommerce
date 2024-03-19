const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: { type: String, require: true },
  discription: { type: String, require: true },
  brand: { type: String, require: true },
  originalPrice: { type: Number, required: true },
  discountedPercentage: { type: Number, default: 0 },
  discountedPrice: { type: Number },
  wishList: { type: Boolean, default: false },
  availability: { type: Boolean, default: true },
  categoryId: { type: mongoose.Schema.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("Product", productSchema);
