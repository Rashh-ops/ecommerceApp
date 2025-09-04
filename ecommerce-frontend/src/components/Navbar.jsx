import {useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
const Navbar=()=>{
    const {user,logout}=useContext(AuthContext);

    return(
        <nav className="flex justify-between p-4 bg-gray-900 text-white">
            <Link to={`/`} className="text-xl font-bold">🛍 Shop</Link>
            <div>
                {user ? (
                <>
                    <span className="mr-4">Hello, {user.name}</span>
                    <button onClick={logout} className="bg-red-600 px-3 py-1 rounded mr-4">
                    Logout
                    </button>
                    <a href="/Cart" className="mr-4">Cart</a>
                    <a href="/Orders" className="mr-4">Orders</a>
                </>
                ) : (
                <>
                    <a href="/login" className="mr-4">Login</a>
                    <a href="/signup">Signup</a>
                </>
                )}
            </div>
        </nav>
    );
};
export default Navbar;