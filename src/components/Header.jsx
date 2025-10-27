import PhoneIcon from "../../assets/icons/phone.svg";
import ArrowDown from "../../assets/icons/arrow-down.svg";
import FlagUS from "../../assets/icons/flag-us.svg";

import { handleLogout } from "../utils/authHelpers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <header className="w-full fixed top-0 left-0  z-50 bg-[#292424] text-white text-xs font-medium">
      <div className="px-[112px] flex justify-between items-center py-[14px]">
        {/* Left: Contact */}
        <div className="flex items-center gap-[4px]">
          <img src={PhoneIcon} alt="Phone" className="w-4 h-4" />
          <span>+1 2345 6789</span>
        </div>

        {/* Center: Promo */}
        <div>
          <p>
            Get 50% Off on Selected Items
            <span className="text-[#F56630] ml-[24px] pl-[24px] border-l border-l-white ">
              Shop Now
            </span>
          </p>
        </div>

        {/* Right: Language / Country */}
        <div className="flex items-center gap-[32px]">
          <div className="flex items-center gap-[8px] cursor-pointer">
            <span>EN</span>
            <img src={ArrowDown} alt="Dropdown" className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-[8px] cursor-pointer">
            <img
              src={FlagUS}
              alt="United States"
              className="w-4 h-4 rounded-sm"
            />
            <p>United States</p>
            <img src={ArrowDown} alt="Dropdown" className="w-4 h-4" />
          </div>
          <button
            className="cursor-pointer text-[#F56630] ml-[24px] "
            onClick={() => handleLogout(dispatch, navigate)}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
