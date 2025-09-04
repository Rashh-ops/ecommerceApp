const express=require("express");
const router=express.Router();
const Cart=require("../models/cart");
const {protect} = require("../middleware/authMiddleware");

router.get("/",protect ,async (req,res)=>{
    const cart=await Cart.findOne({user:req.user._id}).populate("products.product");
    res.json(cart || {user:req.user._id,products:[]});
});

router.post("/add",protect, async (req,res)=>{
    const {productId,quantity}=req.body;
    const qty=Number(quantity);

    let cart=await Cart.findOne({user:req.user._id});

    if(!cart){
        cart=new Cart({user:req.user._id,products:[]});
    }

    const existingProductIndex=cart.products.findIndex((p)=>p.product.toString()===productId);

    
  if (existingProductIndex > -1) {
    // Already in cart → update quantity
    cart.products[existingProductIndex].quantity += qty;
  } else {
    // New product → push
    cart.products.push({ product: productId, quantity:qty });
  }

  await cart.save();
  res.json(cart);
});

//update quantity
router.put("/update",protect,async(req,res)=>{
    const {productId,quantity}=req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const product = cart.products.find(p => p.product.toString() === productId);
    if (product) {
        product.quantity = quantity;
    }

    await cart.save();
    res.json(cart);
});

router.delete("/remove/:productId", protect, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.products = cart.products.filter(p => p.product.toString() !== req.params.productId);

  await cart.save();
  res.json(cart);
});

module.exports = router;