// src/components/CartDrawer.jsx
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../features/cartSlice";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import toast from "react-hot-toast";
import { setCart } from "../features/cartSlice";

const Cart = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const loadCartFromSupabase = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from("cart_items")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;

        if (data && data.length > 0) {
          // Transform Supabase data to match cart format
          const cartItems = data.map((item) => ({
            id: item.product_id,
            title: item.title,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
          }));
          dispatch(setCart(cartItems));
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };

    loadCartFromSupabase();
  }, [user, dispatch]);

  // Save cart to Supabase whenever it changes
  useEffect(() => {
    const saveCartToSupabase = async () => {
      if (!user?.id) return;

      try {
        // First, delete all existing cart items for this user
        await supabase.from("cart_items").delete().eq("user_id", user.id);

        // Then insert current cart items
        if (cart.length > 0) {
          const cartData = cart.map((item) => ({
            user_id: user.id,
            product_id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
          }));

          const { error } = await supabase.from("cart_items").insert(cartData);

          if (error) throw error;
        }
      } catch (error) {
        console.error("Error saving cart:", error);
        toast.error("Failed to save cart");
      }
    };

    // Debounce the save operation
    const timeoutId = setTimeout(() => {
      saveCartToSupabase();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [cart, user]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed  inset-0 bg-[rgba(62,56,56,0.5)] backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? " visible" : " invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed  top-0 overflow-y-auto right-0 w-[590px] h-screen bg-white shadow-2xl z-45  transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex mt-[154px] justify-between border-t border-gray-100 bord items-center pt-[40px] pr-[57px] pl-[42px] pb-[24px]  ">
          <div className="flex items-center gap-2">
            <h2 className="text-[28px] font-semibold text-gray-900">My Cart</h2>
            <span className="bg-orange-400 text-white rounded-full text-[18px] font-semibold px-[12px] py-[6px]">
              {cart.length}
            </span>
          </div>
          <button onClick={onClose}>
            <X size={24} className="text-gray-600 hover:text-gray-900" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto pl-[40px] pr-[61px] pb-[28px] pt-[28px] space-y-[28px]">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              Your cart is empty.
            </p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex  gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-[210px] h-[190px] object-cover rounded-[10px] "
                />
                <div className="flex py-[15.5px] flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 text-[16px] leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[15px] font-semibold text-gray-900">
                      {" "}
                      <span className="text-[11px] align-top font-bold">$</span>
                      {Math.round(item.price)}
                      <span className="text-[12px] align-top font-semibold">
                        .00
                      </span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mt-[12px] mb-[16px]">
                    Color: <span className="font-medium">Black</span> <br />
                    Size: <span className="font-medium">41</span>
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between ">
                    <div className="flex items-center justify-between border border-gray-100 bg-gray-50  rounded-full p-[12.5px]">
                      <button
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        className="  rounded-full"
                      >
                        <Minus
                          size={15}
                          className="text-gray-500 hover:text-orange-500"
                        />
                      </button>
                      <span className="px-[27.5px] text-orange-400 text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        className="  rounded-full"
                      >
                        <Plus
                          className="hover:text-orange-500 text-gray-500"
                          size={15}
                        />
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-gray-500 "
                    >
                      <Trash2 size={24} className="hover:text-orange-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="  sticky bottom-0   pl-[42px] pr-[59px] pb-[43px] ">
          <div className="flex justify-between mb-[24px]   border-b-2 border-t-2 border-gray-100 py-[24px]">
            <span className="text-base text-gray-500 ">Subtotal:</span>
            <span className="font-semibold text-[18px] text-gray-900">
              <span className="text-[11px] align-top font-bold">$</span>
              {Math.round(subtotal)}
              <span className="text-[12px] align-top font-semibold">.00</span>
            </span>
          </div>
          <button
            onClick={() => {
              onClose();
              navigate("/checkout");
            }}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-full text-lg"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
