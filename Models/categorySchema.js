const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryName: { type: String, require: true, unique: true, trim: true },
   
});


module.exports = mongoose.model("Category", categorySchema);

