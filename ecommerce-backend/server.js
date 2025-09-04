const express=require("express");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const cors=require("cors");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();
const app=express();

app.use(cors({
  origin: "https://ecommerceapp-7.onrender.com",
  credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorHandler);

app.get("/",(req,res)=>{
    res.send("Ecomerce API is running");
});
app.get("/error-test", (req, res) => {
  throw new Error("This is a test error!");
});
mongoose   
    .connect(process.env.MONGO_URI)
    .then(()=>console.log("MONGODB CONNECTED"))
    .catch((err)=>console.error("MONGO ERROR",err));
const PORT=process.env.PORT || 5000;


app.listen(PORT,()=>{
    console.log(`Your server is running at port ${PORT}`);
})
