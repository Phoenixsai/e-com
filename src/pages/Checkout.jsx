import React from "react";
import { useSelector } from "react-redux";
import { Calendar, Lock } from "lucide-react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "./Cart";
import { useState } from "react";

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Header />
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <div className="px-[112px] min-h-screen pt-[156px] pb-[127px]">
        <div className="my-[28px]  text-orange-500 font-medium text-[14px]">
          <p>
            Home <span className="text-gray-400">/</span> Cart{" "}
            <span className="text-gray-400">/ Checkout</span>
          </p>
        </div>
        <div className="max-w-7xl mx-auto  grid md:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="md:col-span-2 space-y-[30px]">
            {/* Order Summary */}
            <div className=" rounded-[10px] border border-gray-200 p-8">
              <h2 className="text-[24px] font-semibold text-gray-900">
                Order Summary{" "}
                <span className="ml-[16px] text-[18px] font-semibold bg-orange-500 text-white rounded-full px-[12px] py-[6px]">
                  {cartItems.length}
                </span>
              </h2>
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex  gap-5 py-[24px] ">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-30 h-30 object-cover rounded-[10px]"
                    />
                    <div className="flex-1 py-[19px]">
                      <h3 className="font-semibold text-[20px] text-gray-900">
                        {item.title} X{item.quantity}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Color: <span className="font-medium">Black</span> <br />
                        Size: <span className="font-medium">41</span>
                      </p>
                    </div>
                    <p className="font-semibold text-[20px] py-[19px] text-gray-900">
                      ${Math.round(item.price * item.quantity)}.00
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="rounded-[10px] border border-gray-200 p-8">
              <div className="">
                <h2 className="text-[24px] font-semibold text-gray-900 mb-[24px]">
                  Delivery Information
                </h2>
              </div>
              <form className="grid grid-cols-2 gap-5">
                <div className="col-span-1">
                  <p className="text-sm text-gray-700 font-medium mb-[4px]">
                    First Name
                  </p>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="border rounded-[6px] border-gray-300 px-[16px] py-[18px] w-full outline-orange-200 text-sm text-gray-400 "
                  />
                </div>
                <div className="col-span-1">
                  <p className="text-sm text-gray-700 font-medium mb-[4px]">
                    Last Name
                  </p>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="border rounded-[6px] border-gray-300 px-[16px] py-[18px] w-full outline-orange-200 text-sm text-gray-400 "
                  />
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-700 font-medium mb-[4px]">
                    Address
                  </p>
                  <input
                    type="text"
                    placeholder="Address"
                    className="border rounded-[6px] border-gray-300 px-[16px] py-[18px] w-full outline-orange-200 text-sm text-gray-400 "
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium mb-[4px]">
                    City/Town
                  </p>
                  <input
                    type="text"
                    placeholder="City/Town"
                    className="border rounded-[6px] border-gray-300 px-[16px] py-[18px] w-full outline-orange-200 text-sm text-gray-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium mb-[4px]">
                    Zip Code
                  </p>
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="border rounded-[6px] border-gray-300 px-[16px] py-[18px] w-full outline-orange-200 text-sm text-gray-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium mb-[4px]">
                    Mobile Number
                  </p>
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    className="border rounded-[6px] border-gray-300 px-[16px] py-[18px] w-full outline-orange-200 text-sm text-gray-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium mb-[4px]">
                    Email Address
                  </p>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="border rounded-[6px] border-gray-300 px-[16px] py-[18px] w-full outline-orange-200 text-sm text-gray-400"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Right Section */}
          <div className="rounded-[10px] border border-gray-200 p-8 h-fit ">
            <h2 className="text-[24px] font-semibold text-gray-900 mb-[28px] ">
              Payment Information
            </h2>

            {/* Apply Discount */}
            <div className=" border-b pb-[24px] border-b-gray-200">
              <p className="text-base font-semibold text-gray-900 mb-[12px]">
                Apply Discount
              </p>
              <div className="flex justify-between gap-4">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  className="bg-gray-50 rounded-full py-[18px] px-[20px] outline-orange-200 text-gray-400 text-sm w-full"
                />
                <button className="bg-orange-500 text-white px-[28.5px] py-4 rounded-full text-base font-semibold">
                  Apply
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className=" border-b border-b-gray-200 py-[24px]">
              <p className="text-base font-semibold text-gray-900 mb-[20px]">
                Pay With
              </p>

              <div class="inline-flex items-center gap-[12px] mb-[16px] text-base font-medium text-gray-900">
                <label
                  class="relative flex items-center cursor-pointer"
                  for="card"
                >
                  <input
                    name="payment"
                    type="radio"
                    class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-300 checked:border-orange-400 transition-all"
                    id="card"
                  />
                  <span class="absolute bg-orange-400 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
                <label class="cursor-pointer" for="card">
                  Debit or Credit Card
                </label>
              </div>
              <div class="inline-flex items-center gap-[12px] mb-[16px] text-base font-medium text-gray-900">
                <label
                  class="relative flex items-center cursor-pointer"
                  for="cash"
                >
                  <input
                    name="payment"
                    type="radio"
                    class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-300 checked:border-orange-400 transition-all"
                    id="cash"
                  />
                  <span class="absolute bg-orange-400 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
                <label class="cursor-pointer" for="cash">
                  Pay on Delivery
                </label>
              </div>
            </div>

            {/* Card Information */}
            <div className=" border-b border-b-gray-200 py-[24px]">
              <p className="text-base font-semibold text-gray-900 mb-[16px]">
                Enter Card Information
              </p>
              <form action="">
                <div>
                  <p className="text-sm text-gray-700 font-medium mb-[4px]">
                    Cardholder Name
                  </p>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    className="border rounded-[6px] border-gray-300 px-[16px] py-[18px] w-full outline-orange-200 text-sm text-gray-400"
                  />{" "}
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium mb-[4px]">
                    Card Number
                  </p>
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="border rounded-[6px] border-gray-300 px-[16px] py-[18px] w-full outline-orange-200 text-sm text-gray-400"
                  />{" "}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <p className="text-sm text-gray-700 font-medium mb-[4px]">
                      Expiry Date
                    </p>
                    <input
                      type="text"
                      placeholder="02/2025"
                      className="border rounded-[6px] border-gray-300 px-[16px] py-[18px] w-full outline-orange-200 text-sm text-gray-400"
                    />{" "}
                    <Calendar
                      className="text-gray-400 absolute right-[18px] top-[42px] hover:text-orange-200"
                      size={20}
                    />
                  </div>
                  <div className="relative">
                    <p className="text-sm text-gray-700 font-medium mb-[4px]">
                      CVV
                    </p>
                    <input
                      type="text"
                      placeholder="XXX"
                      className="border rounded-[6px] border-gray-300 px-[16px] py-[18px] w-full outline-orange-200 text-sm text-gray-400"
                    />{" "}
                    <Lock
                      className="text-gray-400 absolute right-[18px] top-[42px] hover:text-orange-200"
                      size={20}
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Price Summary */}
            <div className=" text-sm text-gray-600 pt-[24px] pb-[28px] ">
              <div className="flex justify-between mb-[16px]">
                <span>Sub Total</span>
                <span>${Math.round(subtotal)}.00</span>
              </div>
              <div className="flex justify-between mb-[16px]">
                <span>Tax (10%)</span>
                <span>${Math.round(tax)}.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="border-t border-t-gray-200  flex justify-between font-semibold text-gray-800 mt-[24px] pt-[24px]">
                <span className="text-sm text-gray-600 font-medium">Total</span>
                <span>${Math.round(total)}.00</span>
              </div>
            </div>

            {/* Pay Button */}
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-4 font-semibold">
              Pay ${Math.round(total)}.00
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
