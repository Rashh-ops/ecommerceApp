const express=require("express");
const router=express.Router();
const Product=require("../models/product");
const {protect,admin}=require("../middleware/authMiddleware");

router.get("/",async (req,res)=>{
    try{
        const query={};
        if(req.query.brand) query.brand=req.query.brand;
        if(req.query.category) query.category=req.query.category;

        const products= await Product.find(query);
        res.json(products);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
});

router.get("/:id",async (req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product) return res.status(404).json({message:"Product not found"});
        res.json(product);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
});

router.post("/",protect,admin,async (req,res)=>{
    try{
        const { name, description, price, brand, category, stock, image } = req.body;
        const product = new Product({ name, description, price, brand, category, stock, image });
        await product.save();
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});

    }
});

router.put("/:id",protect,admin,async (req,res)=>{
    try{
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!product) return res.status.json({message:"product not found"});
        res.json(product);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
});

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;