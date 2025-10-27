import React from "react";
import Product1 from "../../../assets/images/product1.png";
import StarIcon from "../../../assets/icons/star.svg";
import CartIcon from "../../../assets/icons/cart.svg";

import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
function ProductCard({
  id,
  image,
  title,
  category,
  price,
  rating,
  ratingCount,
}) {
  const dispatch = useDispatch();
  const roundedRating = Math.round(rating);
  const handleAddToCart = () => {
    const product = { id, image, title, category, price, rating };
    console.log(product);
    dispatch(addToCart(product));
  };

  return (
    <div className="overflow-hidden">
      <img
        src={image}
        alt="Court Heels"
        className="w-[286px] h-[260px] object-cover"
      />
      <div>
        <div className="flex pt-4 justify-between">
          <h3 className="text-base font-medium text-gray-900 ">{title}</h3>
          <p className="font-semibold text-[12px] text-gray-900 align-sub ">
            $
            <span className="text-[18px] align-middle ">
              {Math.round(price)}
            </span>
            .00
          </p>
        </div>
        <p className="text-xs font-normal mt-[2px] mb-[4px] text-gray-800">
          {category}
        </p>
        <div className="flex items-center justify-between"></div>
        <div className="flex items-center gap-[2px]">
          {Array(roundedRating)
            .fill(0)
            .map((_, i) => (
              <img key={i} src={StarIcon} alt="Star" className="w-4 h-4" />
            ))}
          <span className="text-[14px] text-gray-800 ml-[12px]">
            ({ratingCount})
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className=" cursor-pointer mt-4 flex items-center  gap-2 w-fit border hover:text-orange-500 hover:border-orange-500 border-gray-300 rounded-full py-2 px-[12px] text-sm font-semibold text-gray-600"
        >
          <img src={CartIcon} alt="Add to Cart" className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
