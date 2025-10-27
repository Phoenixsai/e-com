// src/components/home/Brands.jsx
import Brand1 from "../../../assets/brands/brand- 1.png";
import Brand2 from "../../../assets/brands/brand- 2.png";
import Brand3 from "../../../assets/brands/brand- 3.png";
import Brand4 from "../../../assets/brands/brand- 4.png";

export default function Brands() {
  return (
    <section className="mt-[52px] mb-[93px]">
      <div>
        {/* Title (optional, remove if your design doesn’t have text above logos) */}
        <h2 className=" text-[28px] font-semibold mb-[26px] text-gray-800">
          Brands
        </h2>

        {/* Brand Logos */}
        <div className="flex justify-between items-center">
          <img
            src={Brand1}
            alt="Brand 1"
            className="h-[78px] w-[170px] object-contain"
          />
          <img
            src={Brand2}
            alt="Brand 2"
            className="h-[78px] w-[170px] object-contain"
          />
          <img
            src={Brand3}
            alt="Brand 3"
            className="h-[78px] w-[170px] object-contain"
          />
          <img
            src={Brand4}
            alt="Brand 4"
            className="h-[78px] w-[170px] object-contain"
          />
          <img
            src={Brand1}
            alt="Brand 1"
            className="h-[78px] w-[170px] object-contain"
          />
          <img
            src={Brand2}
            alt="Brand 2"
            className="h-[78px] w-[170px] object-contain"
          />
          <img
            src={Brand3}
            alt="Brand 3"
            className="h-[78px] w-[170px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
