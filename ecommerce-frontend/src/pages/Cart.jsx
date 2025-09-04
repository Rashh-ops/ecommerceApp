import {useState,useEffect,useContext} from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Checkout from "./Checkout";
import { Link } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;

const Cart=()=>{
    const {user}=useContext(AuthContext);
    const [cart,setCart]=useState(null);

    useEffect(()=>{
        const fetchcart=async ()=>{
            try{
                const {data}=await axios.get(import.meta.env.VITE_API_URL +"/api/cart", {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
                setCart(data);
            }catch(err){
                console.error(err);
            }
            

        };
        fetchcart();

    },[]);

    const updateQuantity = async (productId, quantity) => {
  // update local state first
  setCart(prevCart => ({
    ...prevCart,
    products: prevCart.products.map(item =>
      item.product._id === productId
        ? { ...item, quantity }
        : item
    ),
  }));

  // then call backend
  try {
    await axios.put(
      import.meta.env.VITE_API_URL +"/api/cart/update",
      { productId, quantity },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
  } catch (err) {
    console.error(err);
  }
};

    if(!cart) return <p className="text-center mt-6">Loading your cart...</p>;
    return(
        <div className="max-w-4xl mx-auto py-10">
            <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

            {cart.products.length === 0 ? (
                <p>Your cart is empty 🛒</p>
            ) : (
                <div className="space-y-4">
                {cart.products.map((item) => (
                    <div key={item.product._id} className="flex items-center justify-between border p-4 rounded">
                    <div>
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-gray-600">${item.product.price}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product._id, Number(e.target.value))}
                            className="w-16 border p-1 text-center"
                        />
                        <button
                            onClick={() => removeFromCart(item.product._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                            Remove
                        </button>
                    </div>
                    </div>
                ))}
                <div className="mt-6">
                <Link to="/Checkout" >
                    <button className="w-full bg-green-600 text-white py-3 rounded text-lg">
                        Proceed to Checkout
                    </button>
                </Link>
            </div>
                </div>
            )}

            {/* Checkout Button */}
            
        </div>
    );

};
export default Cart;