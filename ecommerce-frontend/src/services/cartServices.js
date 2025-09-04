// services/cartService.js
import axios from "axios";

export const addToCart = async (productId, quantity) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not logged in");

  const res = await axios.post(
    "http://localhost:5000/api/cart/add",
    { productId, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
