const express=require("express");
const router=express.Router();
const Order=require("../models/order");
const Cart=require("../models/cart");
const {protect,admin}=require("../middleware/authMiddleware");

router.post("/place",protect, async (req,res) => {
    try{
        const cart=await Cart.findOne({user:req.user._id}).populate("products.product");

        if(!cart ||  cart.products.length===0) return res.status(400).json({message:"Cart is empty!!"});

        const totalPrice=cart.products.reduce(
            (sum,item)=> sum+item.product.price * item.quantity,0
        );

        const order = new Order({
            user: req.user._id,
            products: cart.products,
            totalPrice
        });

        await order.save();

        cart.products=[];
        await cart.save();
        res.status(201).json(order);

    }catch(err){
        res.status(500).json({error:err.message});
    }
});

// 📌 Get logged-in user’s orders
router.get("/my-orders", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("products.product");
  res.json(orders);
});

router.get("/all", protect, admin, async (req, res) => {
  const orders = await Order.find().populate("user").populate("products.product");
  res.json(orders);
});

module.exports=router;
