import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
// import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className=" font-inter">
      {/* <Toaster /> */}
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </div>
  );
}
