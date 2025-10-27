import Img1 from "../../../assets/collections/collection1.png";
import Img2 from "../../../assets/collections/collection2.png";
import Img3 from "../../../assets/collections/collection3.png";
import Overlay from "../../../assets/images/overlay2.png";
import Plus from "../../../assets/icons/plus.svg";
import ArrowRight from "../../../assets/icons/arrow-right.svg";

export default function FeaturedCollection() {
  return (
    <section>
      <div>
        {/* Section Title */}
        <div className="flex flex-row justify-between items-center mb-8">
          <h2 className="text-[28px] font-semibold text-gray-900">
            Featured Collections
          </h2>
          <p className="text-[#EB5017] text-[14px] ">
            View all
            <img src={Plus} className="w-5 h-5 inline ml-[8px]" />
          </p>
        </div>

        {/* Collage Grid */}
        <div className="flex flex-row  h-[770px] gap-6">
          {/* Large Left Image */}
          <div className="relative h-[770px] w-[596px]">
            <img
              src={Img1}
              alt="Featured 1"
              className=" object-cover h-[770px] rounded-[10px]"
            />
            <img
              src={Overlay}
              className="absolute inset-0 h-[770px] rounded-[10px]"
              alt=""
            />
            <div className="absolute inset-0  flex flex-col mt-[40px] mb-[86px] ml-[40px] justify-between">
              <button className="bg-[#F56630] text-white px-[12px] py-[4px] rounded-full font-semibold text-[14px] w-fit">
                WORLD GIRLFRIEND’S DAY
              </button>
              <div>
                <h2 className="text-[36px] font-semibold text-white w-[442px] leading-[120%] tracking-[-4%]">
                  Free Delivery on all dresses ordered until November 30
                </h2>
                <p className="text-[14px] text-white mt-[4px] mb-[24px]">
                  All the sleekest dress for you to twin with your girlfriends.
                </p>
                <button className="bg-[#EB5017] text-white text-[16px] px-[16px] py-[16px] rounded-[8px] font-medium">
                  Shop Now{" "}
                  <img src={ArrowRight} className="w-6 h-6 inline ml-[8px]" />
                </button>
              </div>
            </div>
          </div>

          {/* Two Right Images (stacked) */}
          <div className="flex flex-col gap-6">
            <div className="relative h-[373px] w-[596px]">
              <img
                src={Img2}
                alt="Featured 2"
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
            <div className="relative h-[373px] w-[596px]">
              <img
                src={Img3}
                alt="Featured 3"
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
