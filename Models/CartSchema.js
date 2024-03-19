const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    cartItems : {type:mongoose.Schema.Types.ObjectId,ref:'CartItem'},
    userId : {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    total : {type:Number,require:true},
})

module.exports = mongoose.model("Cart", cartSchema);