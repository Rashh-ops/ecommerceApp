import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
const API = import.meta.env.VITE_API_URL;

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="py-10 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
