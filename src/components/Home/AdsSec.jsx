import React from "react";
import Arrow from "../../../assets/icons/arrow-right.svg";
import BackgroundImg from "../../../assets/images/ads.png";

const AdSection = () => {
  return (
    <section className="mb-10">
      <div
        className="relative bg-cover bg-center w-full h-[245px] flex gap-24 items-center pl-8"
        style={{ backgroundImage: `url(${BackgroundImg})` }}
      >
        <div className="flex-col text-4xl font-semibold text-white">
          <p>Free delivery on</p>
          <p>all Lagos Orders</p>
        </div>
        <button className="flex items-center justify-center text-white font-semibold text-base w-32 lg:w-36 h-14 bg-[#EB5017] hover:bg-[#EB5017]/80 p-4 rounded-lg">
          Shop now
          <img src={Arrow} alt="" />
        </button>
      </div>
      <div></div>
    </section>
  );
};

export default AdSection;
