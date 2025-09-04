import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState({ products: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const { data } = await axios.get(import.meta.env.VITE_API_URL +"/api/cart", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCart(data);
    };
    fetchCart();
  }, []);

  const placeOrder = async () => {
    try {
      const totalPrice = cart.products.reduce(
        (acc, p) => acc + p.product.price * p.quantity,
        0
      );

      const { data } = await axios.post(
        import.meta.env.VITE_API_URL +"/api/orders/place",
        {
          products: cart.products.map((p) => ({
            product: p.product._id,
            quantity: p.quantity,
          })),
          totalPrice,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      navigate(`/order-confirmation/${data._id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      {cart.products.map((p) => (
        <div key={p.product._id} className="flex justify-between mb-2">
          <span>{p.product.name} (x{p.quantity})</span>
          <span>${p.product.price * p.quantity}</span>
        </div>
      ))}
      <h3 className="font-bold mt-4">
        Total: $
        {cart.products.reduce(
          (acc, p) => acc + p.product.price * p.quantity,
          0
        )}
      </h3>
      <button
        onClick={placeOrder}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
