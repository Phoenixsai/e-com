// src/components/home/CustomerExperience.jsx
import Icon1 from "../../../assets/icons/original-products.svg";
import Icon2 from "../../../assets/icons/satisfaction.svg";
import Icon3 from "../../../assets/icons/new-arrival.svg";
import Icon4 from "../../../assets/icons/shipping.svg";

export default function Highlights() {
  return (
    <section className="mt-[80px]">
      <div>
        {/* Section Heading */}

        <h2 className="text-[28px] leading-[36px] tracking-[-2%]  font-semibold text-gray-900 mb-[40px]">
          We provide the <br />
          best customer experiences
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-[74px]">
          {/* 1️⃣ Original Products */}
          <div className="">
            <div className="flex ">
              <div>
                <img
                  src={Icon1}
                  alt="Original Products"
                  className="w-[48px] h-[44px] object-contain"
                />
              </div>
            </div>
            <h3 className="text-[18px] font-semibold text-gray-900 mt-[16px] mb-[6px]">
              Original Products
            </h3>
            <p className="text-gray-600 text-sm">
              We ensure money-back guarantee if the product is counterfeit
            </p>
          </div>

          {/* 2️⃣ Satisfaction Guarantee */}
          <div className="">
            <div className="flex ">
              <div>
                <img
                  src={Icon2}
                  alt="Satisfaction Guarantee"
                  className="w-[48px] h-[44px] object-contain"
                />
              </div>
            </div>
            <h3 className="text-[18px] font-semibold text-gray-900 mt-[16px] mb-[6px]">
              Satisfaction Guarantee
            </h3>
            <p className="text-gray-600 text-sm">
              We ensure money-back guarantee if the product is counterfeit
            </p>
          </div>

          {/* 3️⃣ New Arrival Everyday */}
          <div className="">
            <div className="flex ">
              <div>
                <img
                  src={Icon3}
                  alt="New Arrival Everyday"
                  className="w-[48px] h-[44px] object-contain"
                />
              </div>
            </div>
            <h3 className="text-[18px] font-semibold text-gray-900 mt-[16px] mb-[6px]">
              New Arrival Everyday
            </h3>
            <p className="text-gray-600 text-sm">
              We ensure money-back guarantee if the product is counterfeit
            </p>
          </div>

          {/* 4️⃣ Fast & Free Shipping */}
          <div className="">
            <div className="flex ">
              <div>
                <img
                  src={Icon4}
                  alt="Fast & Free Shipping"
                  className="w-[48px] h-[44px] object-contain"
                />
              </div>
            </div>
            <h3 className="text-[18px] font-semibold text-gray-900 mt-[16px] mb-[6px]">
              Fast & Free Shipping
            </h3>
            <p className="text-gray-600 text-sm">
              We ensure money-back guarantee if the product is counterfeit
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
