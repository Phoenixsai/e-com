import React from "react";
import DropdownIcon from "../../../assets/icons/chevron-down.png";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/productsSlice";

function ProductsContainer() {
  const dispatch = useDispatch();

  // Get data from Redux store
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  // Fetch products once on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className="mt-[100px] mb-[80px]">
      <div className="">
        <div className="flex items-center justify-between mb-[41px]">
          <h2 className="text-[28px] font-semibold text-gray-900">Popular</h2>
          <div className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full cursor-pointer">
            <span className="text-sm font-medium text-gray-500">Sort by</span>
            <img src={DropdownIcon} alt="Sort" className="" />
          </div>
        </div>
        {/* Loading and error states */}
        {loading && (
          <p className="text-center text-gray-500 py-12">Loading products...</p>
        )}
        {error && (
          <p className="text-center text-red-500 py-12">
            Failed to load products: {error}
          </p>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-4 gap-[18px]">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                category={product.category}
                price={product.price}
                rating={product.rating.rate}
                ratingCount={product.rating.count}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductsContainer;
