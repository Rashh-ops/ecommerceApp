import {useState,useContext} from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;

const Login=()=>{
    const {login}=useContext(AuthContext);
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("");

    const handleLogin=async (e)=>{
        e.preventDefault();
        try{
            const {data}=await axios.post(import.meta.env.VITE_API_URL +"/api/auth/login",{email,password});
            login(data.user,data.token);
            navigate("/");
        }catch(err){
            alert("Login failed!!");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
            >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Login
            </button>
            </form>
        </div>
);

};
export default Login;