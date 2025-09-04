const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB connected"))
    .catch((err)=> console.error(err));

const products=[
    {
    name: "Nike Air Max",
    description: "Comfortable running shoes",
    price: 120,
    brand: "Nike",
    category: "Shoes",
    stock: 50,
    image: "https://example.com/nike-airmax.jpg",
  },
  {
    name: "Adidas Ultraboost",
    description: "High performance sneakers",
    price: 150,
    brand: "Adidas",
    category: "Shoes",
    stock: 40,
    image: "https://example.com/adidas-ultraboost.jpg",
  },
  {
    name: "Puma T-Shirt",
    description: "Lightweight sports t-shirt",
    price: 35,
    brand: "Puma",
    category: "Apparel",
    stock: 100,
    image: "https://example.com/puma-tshirt.jpg",
  },
];

const seedProducts= async ()=>{
    try{
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log("Product Inserted");
        process.exit();
    }catch(err){
        console.error(err);
        process.exit(1);
    }
};
seedProducts();