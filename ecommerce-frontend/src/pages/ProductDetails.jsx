import {useParams} from "react-router-dom";
import {useEffect,useState} from "react";
import axios from "axios";

const ProductDetails=()=>{
    const {id}=useParams();
    const [product,setProduct]=useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(()=>{
        const fetchProduct= async ()=>{
            const {data}=await axios.get(`http://localhost:5000/api/products/${id}`);
            setProduct(data);
        };
        fetchProduct();
        
    },[id]);

    if(!product) return <p>Loading...</p>;

    const addToCart= async ()=>{
        try{
            console.log("Sending to backend:", { productId: product._id, quantity });

            console.log("Token in React:",localStorage.getItem("token"));
            await axios.post("http://localhost:5000/api/cart/add",{productId:product._id,quantity},{headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
            
            alert("Added to cart");
        }catch (err) {
            console.error("Error:", err.response?.data || err.message);
            alert("Failed to add,You must be Logged in");
        }
    };

    return(
        <div className="p-6">
            <img src={product.image} alt={product.name} className="w-64 h-64 object-cover" />
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold">${product.price}</p>
            <label>Quantity: </label>
            <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {[...Array(10).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                    {x+1}
                    </option>
                ))}
            </select>
            <button  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={addToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductDetails;