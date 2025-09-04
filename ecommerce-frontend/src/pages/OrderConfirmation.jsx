import { useParams, Link } from "react-router-dom";

const OrderConfirmation = () => {
  const { id } = useParams();

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold text-green-600">✅ Order Placed!</h2>
      <p className="mt-2">Your order ID is: <strong>{id}</strong></p>
      <Link to="/orders" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        View My Orders
      </Link>
    </div>
  );
};

export default OrderConfirmation;
