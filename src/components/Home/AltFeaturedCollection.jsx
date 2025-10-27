import Img1 from "../../../assets/collections/collection4.png";
import Img2 from "../../../assets/collections/collection5.png";
import Img3 from "../../../assets/collections/collection6.png";
import ArrowRight from "../../../assets/icons/arrow-right.svg";
import ArrowUpRight from "../../../assets/icons/arrow-up-right.svg";

export default function AltFeaturedCollection() {
  return (
    <section className="mt-[98px]">
      {/* Collage Grid */}
      <div className="flex flex-row  h-[533px] gap-[30px]">
        {/* Large Left Image */}
        <div className="relative h-[533px] w-[692px]">
          <img
            src={Img1}
            alt="Featured 1"
            className=" object-cover h-[533px] rounded-[10px]"
          />

          <div className="absolute inset-0  flex flex-col mt-[28px] mb-[42px] ml-[40px] justify-between">
            <div className="flex flex-row justify-between items-center">
              <button className="outline-1 outline-[#F3A218] text-[#F3A218] px-[12px] py-[4px] rounded-full font-semibold text-[14px] w-fit">
                UP TO 80% OFF
              </button>
              <img src={ArrowUpRight} className="w-[56px] h-[56px] mr-[28px]" />
            </div>
            <div className="flex flex-row justify-between items-center mr-[36px]">
              <h2 className="text-[36px] font-semibold text-white w-[351px] leading-[120%] tracking-[-4%]">
                Kiddies Korean Summer Collection
              </h2>
              <button className="bg-[#EB5017] text-white text-[16px] px-[16px] py-[16px] rounded-[8px] font-medium">
                Shop Now{" "}
                <img src={ArrowRight} className="w-6 h-6 inline ml-[8px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Two Right Images (stacked) */}
        <div className="flex flex-col gap-[34px]">
          <div className="relative h-[250px] w-[494px]">
            <img
              src={Img2}
              alt="Featured 2"
              className="w-full h-full object-cover rounded-[10px]"
            />
            <div className="absolute inset-0  flex flex-col  mt-[88px] mb-[46px] ml-[33px] mr-[167px] ">
              <button className="bg-[#F56630] text-white px-[12px] py-[4px] mb-[20px] rounded-full font-semibold text-[14px] w-fit">
                UP TO 80% OFF
              </button>{" "}
              <h2 className="text-[28px] font-semibold text-white w-[284px] leading-[120%] tracking-[-4%]">
                Children Summer Play set
              </h2>
            </div>
          </div>
          <div className="relative h-[250px] w-[494px]">
            <img
              src={Img3}
              alt="Featured 3"
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
