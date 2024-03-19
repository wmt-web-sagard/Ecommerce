const Cart = require("../Models/CartSchema");
const CartItem = require("../Models/cartItemSchema");
const User = require("../Models/userSchema");
const jwt = require("jsonwebtoken");

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  
  if(!productId){
    res.status(401).send({message: "Product ID is required"});
  }

  const userId = await tempAuth(req,res);
   

  const user = await User.findById(userId).populate("cart")
    // console.log(user.cart);

    const checkCartDuplicateProduct =  user.cart.filter((item)=> (item.productId).toString() === productId )

    // console.log(checkCartDuplicateProduct.length);

    if(checkCartDuplicateProduct.length > 0){
        const cartItemFind =   await CartItem.findByIdAndUpdate(
            checkCartDuplicateProduct[0]._id,
            {$set:{quantity:quantity?checkCartDuplicateProduct[0].quantity+parseInt(quantity):checkCartDuplicateProduct[0].quantity+1}} ,{new:true}
          ).exec();
        //   console.log(cartItemFind);
    }else{

        const cartItem = await new CartItem({
            productId: productId,
            quantity: quantity ? parseInt(quantity) : 1,
          });
        
            await cartItem.save();

              user.cart.push(cartItem);
    }

 
      await user.save({ ValidateBeforeSave: false });



//   console.log(user);
        const newuser = await User.findById(userId).populate("cart")


  res.send(newuser);
};

const updateQuantity =async (req,res) =>{
    const { productId, quantity } = req.body;
  
  if(!productId && !quantity){
    res.status(401).json({msg: "Required fields are empty"});
  }

  let userId = await tempAuth(req,res) ;
   

    const user = await User.findById(userId).populate("cart")
    const checkCartDuplicateProduct =  user.cart.filter((item)=> (item.productId).toString() === productId )

    await CartItem.findByIdAndUpdate(
        checkCartDuplicateProduct[0]._id,
        {$set:{quantity:quantity?checkCartDuplicateProduct[0].quantity+parseInt(quantity):checkCartDuplicateProduct[0].quantity+1}} ,{new:true}
      ).exec();

      const newuser = await User.findById(userId).populate("cart")


  res.send(newuser);
}

const clearCart = async(req,res) =>{
const userId = await tempAuth(req,res);
   
    const user =await User.findById(userId)

    if(user.cart.length === 0){
        return res.status(400).json({ message: 'Your cart is already empty' });
    }

    await User.findByIdAndUpdate(userId,{$set:{cart:[]}})
        res.status(200).json({mg:"user cart has been cleared"});
}

const getUserCurrentCart = async (req,res) =>{
    const userId = await tempAuth(req,res)
   
  
  const user = await User.findById(userId).populate("cart") 
    // console.log(user);

    let TotalPrice = 0;

    await Promise.all(user.cart.map(async (item)=>{
        const product =await CartItem.findById(item._id).populate("productId") 
        TotalPrice =   TotalPrice + (item.quantity * product.productId.discountedPrice)
    }))
    console.log(TotalPrice);

  res.json({cart:user.cart,totalAmount:TotalPrice})
}

const deleteProductCart = async (req,res)=>{
    const productId = req.params.id
    const userId = tempAuth(req,res);

    const user = await User.findById(userId).populate("cart")
    
    // console.log(user);
    const findItemCart = user.cart.filter((item)=>String(item.productId._id)=== String(productId))
    if(findItemCart.length == 0){
       return res.status(400).json({msg:'the item is not in your cart'})
    }

    const filteredCart = user.cart.filter((item)=>String(item.productId._id)!== String(productId))
    // console.log(filteredCart);
    console.log(findItemCart);
    user.cart=filteredCart;
    await user.save()

    res.status(200).send({msg:"the item is deleted from the cart successfully"});
}


const tempAuth = (req,res)=>{
    let userId;
    const authHeader = req.headers["authorization"].split(" ")[1];
   jwt.verify(
    authHeader,
    process.env.ACCESS_TOKEN_SECRET,
    (err, user) => {
      if (err) return res.sendStatus(403);
      // console.log(user);
      userId = user.newUser._id;
    }
  );
  return userId;
}

module.exports = { addToCart , clearCart , updateQuantity , getUserCurrentCart ,deleteProductCart };
