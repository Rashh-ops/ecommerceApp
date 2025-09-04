import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;
const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/auth/signup`, { name, email, password });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSignup} className="p-6 bg-white rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Signup</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
