import {Link} from "react-router-dom"
import { addToCart } from "../services/cartServices";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export default function ProductCard({product}){
    const addToCart= async ()=>{
        try{
            console.log("Sending to backend:", { productId: product._id, quantity:1});

            console.log("Token in React:",localStorage.getItem("token"));
            await axios.post(import.meta.env.VITE_API_URL +"/api/cart/add",{productId:product._id,quantity:1},{headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
            
            alert("Added to cart");
        }catch (err) {
            console.error("Error:", err.response?.data || err.message);
            alert("Failed to add,You must be Logged in");
        }
    };
    return(
        
            <div className="border rounded-lg shadow p-4 hover:shadow-lg transition">
                <Link to={`/products/${product._id}`}>
                    <img src="{product.image}" alt="{product.name}" className="w-full h-40 object-cover rounded"/>
                    <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                    <p className="text-gray-600">${product.price}</p>
                </Link>
                    <button  onClick={addToCart} className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add to Cart</button>
            </div>
        
        
    );
}