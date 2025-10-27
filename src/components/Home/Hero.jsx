import HeroImage from "../../../assets/images/hero-banner.png";
import Overlay from "../../../assets/images/overlay.png";
import ArrowRight from "../../../assets/icons/arrow-right.svg";

export default function Hero() {
  return (
    <section
      className="relative  h-[520px] rounded-[10px] flex items-center"
      style={{
        backgroundImage: `url(${HeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay (optional, to make text pop) */}
      <img
        src={Overlay}
        className="absolute inset-0 h-[520px] rounded-[10px]"
        alt=""
      />

      {/* Text Content */}
      <div className="relative z-10 ml-[68px] w-[464px]">
        <p className="bg-[#1671D9] text-white px-[12px] py-[4px] rounded-full font-medium text-[14px]  w-fit">
          ENDLESS SUMMER SALE
        </p>
        <h1 className="text-[60px] font-medium text-white my-[24px] leading-[105%] tracking-[-0.02em]">
          Up to <span className="font-bold">60% off</span> <br /> on all items
          till <span className="font-bold">September 11</span>
        </h1>
        <button className="bg-[#EB5017] text-white text-[16px] px-[16px] py-[16.5px] rounded-[8px] font-medium">
          Shop Now <img src={ArrowRight} className="w-6 h-6 inline ml-[8px]" />
        </button>
      </div>
    </section>
  );
}
