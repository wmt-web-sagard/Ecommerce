const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
    productId : {type:mongoose.Schema.Types.ObjectId,ref:'Product'},
    quantity :{type:Number , required:true ,default:1},
})

module.exports = mongoose.model("CartItem", cartItemSchema);