// src/components/layout/Navbar.jsx
import { Link } from "react-router-dom";
import Logo from "../../assets/icons/logo.svg";
import SearchIcon from "../../assets/icons/search.svg";
import UserIcon from "../../assets/icons/user.svg";
import CartIcon from "../../assets/icons/cart.svg";
import HeartIcon from "../../assets/icons/heart.svg";
import ArrowDown from "../../assets/icons/arrow-down2.svg";
import { useSelector } from "react-redux";
export default function Navbar({ onCartClick }) {
  const cart = useSelector((state) => state.cart.items);
  return (
    <nav className="w-full fixed top-[44px] left-0   z-50 bg-white">
      <div className="px-[112px] flex justify-between items-center py-[24px]">
        <div className="flex justify-between items-center gap-[113.61px]">
          {/* Logo */}
          <Link to="/">
            <img src={Logo} alt="Site Logo" className="h-[32px] w-[32px]" />
          </Link>

          {/* Nav Links */}
          <ul className="flex gap-[32px] font-semibold text-[16px] text-gray-900">
            <li>
              <Link to="/men" className="hover:text-orange-500">
                Men
              </Link>
            </li>
            <li>
              <Link to="/women" className="hover:text-orange-500">
                Women
              </Link>
            </li>
            <li>
              <Link to="/kids" className="hover:text-orange-500">
                Kids
              </Link>
            </li>
            <li>
              <Link to="/sale" className="hover:text-orange-500">
                Sale
              </Link>
            </li>
          </ul>
        </div>

        {/* Search + Icons */}
        <div className="flex items-center gap-[32px] ">
          {/* Search bar */}
          <div className="flex items-center border rounded-[6px] px-[12px] py-[8px] w-[375px] h-[36px] bg-gray-100 border-gray-300">
            <img
              src={SearchIcon}
              alt="Search"
              className="w-5 h-5 cursor-pointer"
            />
            <input
              type="text"
              placeholder="Search here..."
              className="w-full pl-[6px] text-sm text-gray-400 focus:outline-none"
            />
          </div>

          {/* Profile */}
          <button className="font-semibold text-[16px] text-gray-900 flex flex-col items-center gap-[12.5px]">
            <img src={UserIcon} alt="User" className="w-5 h-5" />
            <Link to="/profile" className="hover:text-orange-500 ">
              Profile
            </Link>
          </button>
          {/* categories */}
          <button className="font-semibold text-[16px] text-gray-900 flex flex-col items-center gap-[12.5px]">
            <img src={HeartIcon} alt="User" className="w-6 h-6" />
            <Link to="/men" className="hover:text-orange-500">
              All Categories{" "}
              <img
                src={ArrowDown}
                alt="Dropdown"
                className="w-5 h-5 inline ml-[8px]"
              />
            </Link>
          </button>

          {/* Cart */}
          <button
            onClick={onCartClick}
            className="relative hover:text-orange-500 font-semibold text-[16px] text-gray-900 flex flex-col items-center gap-[12.5px]"
          >
            <img src={CartIcon} alt="Cart" className="w-6 h-6" />{" "}
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
            Cart
          </button>
        </div>
      </div>
    </nav>
  );
}
