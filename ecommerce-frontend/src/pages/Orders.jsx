import { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get(`${API}/api/orders/my-orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="border p-4 rounded mb-4">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>Total:</strong> ₹{order.totalPrice}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <ul className="list-disc ml-6 mt-2">
            {order.products.map((p, i) => (
              <li key={i}>
                {p.product.name} (x{p.quantity})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Orders;
