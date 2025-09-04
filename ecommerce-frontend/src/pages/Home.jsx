import {Link} from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import {useState,useEffect} from "react";
import brand11 from "../images/brand11.png";
import brand2 from "../images/brand2.png";
import brand3 from "../images/brand3.jpg";
const API = import.meta.env.VITE_API_URL;

const testimonials=[
    {name:"Alan", feedback:"Idiyappam pollathe products"},{name:"Alvin",feedback:"Logical products"},{name:"karan",feedback:"checkout process was super smooth"}
]

export default function Home(){
    const [products,setProducts]=useState([]);

    useEffect(()=>{
        axios   
            .get(import.meta.env.VITE_API_URL +"/api/products?limit=4")
            .then((res)=> setProducts(res.data))
            .catch((err)=> console.error(err));
    },[]);

    return(
        <div>
            
            <section className="bg-gray-100 py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome</h1>
                <p className="text-lg mb-6">Find the best products at unbeatable price</p>
                <Link to="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Shop Now</Link>
            </section>

            <section className="px-10 bg-white">
                <h2 className="text-2xl font-semibold text-center mb-6">Featured Brands</h2>
                <div className="flex justify-center gap-15">
                    <img src={brand11} alt="Brand 1" className="h-20" />
                    <img src={brand2} alt="Brand 2" className="h-20" />
                    <img src={brand3} alt="Brand 3" className="h-20" />
                </div>
            </section>

            <section className="py-10 bg-gray-50">
                <h2 className="text-2xl font-semibold text-center mb-6">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {products.length>0?(
                        products.map((p)=><ProductCard key={p._id} product={p}/>)
                    ):(
                        <><p className="text-center col-span-4">Loading...</p><p /></>
                    )
                    }
                </div>
            </section>

            <section className="bg-gray-100 py-10 mt-12">
                <h2 className="text-2xl font-bold text-center mb-6">What Our Customers Say</h2>
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
                    {
                        testimonials.map((t,i)=>(
                            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                                <p className="italic">"{t.feedback}"</p>
                                <p className="mt-4 font-semibold text-right">- {t.name}</p>
                            </div>
                        ))
                    }
                </div>
            </section>
        </div>
    );
}
