import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderConfirmation from "./pages/OrderConfirmation";
import ProtectedRoute from "./components/protectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App(){
  return (
    <Router>
         <div className="flex flex-col min-h-screen">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>  
              } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } /> 
            <Route path="/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />
            <Route path="/order-confirmation/:id" element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            } />
          </Routes>
          <Footer/>
      </div>

    </Router>
    
  );
}

export default App;