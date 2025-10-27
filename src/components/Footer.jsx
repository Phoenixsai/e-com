import React from "react";
import Logo from "../../assets/icons/Logo block.png";

const Footer = () => {
  return (
    <div className="px-28 py-16 bg-[#F9FAFB] shadow-sm">
      <section className="flex items-start justify-between gap-8 mb-16">
        <div className="flex flex-col ">
          <img className="w-24 " src={Logo} alt="" />

          <div className="max-w-[369px]">
            <p className="text-sm mt-[32px] mb-[24px] text-[#344054] font-normal">
              Be the first to receive all the recent updates, articles, and
              valuable materials.
            </p>
          </div>

          <div className="flex gap-2 ">
            <div className="w-[60%] max-w-[238px] bg-white flex justify-center items-center border border-gray-300 rounded-md p-4">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
                className="w-full h-full outline-none bg-transparent"
              />
            </div>

            <button className="flex items-center justify-center text-white font-semibold text-base w-32 lg:w-32 h-14 bg-[#EB5017] hover:bg-[#EB5017]/80 px-6 py-4 rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-base text-[#98A2B3] font-normal">Company</p>
          <div className="gap-4 flex flex-col text-[#667185] font-medium text-base">
            <p>About</p>
            <p>Security</p>
            <p>Blog</p>
            <div className="flex gap-1 items-center">
              <p>Careers</p>
              <div className="border bg-[#FFECE5] text-[#AD3307] py-0.5 px-3 rounded-full flex text-center font-medium text-sm">
                We're hiring!
              </div>
            </div>

            <p>Service Status</p>
            <p>Partnerships</p>
            <p>Mission Roadmap</p>
            <p>Community</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-base text-[#98A2B3] font-normal">Rayna Products</p>
          <div className="gap-4 flex flex-col text-[#667185] font-medium text-base">
            <p>Mass Payments</p>
            <p>Debit Cards</p>
            <p>Rayna for Startups</p>
            <p>Rayna for Developers</p>
            <p>Rayna No-Code</p>
            <p>Asssets</p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-base text-[#98A2B3] font-normal">Company</p>
          <div className="gap-4 flex flex-col text-[#667185] font-medium text-base">
            <p>Financial Services</p>
            <p>Fashion & Beauty</p>
            <p>Agriculture</p>
            <p>Manufacturing</p>
            <p>Education</p>
            <p>Energy & Environment</p>
          </div>
        </div>
      </section>

      {/* Footer Section  */}

      <section className="flex justify-between items-center mt-6 border-t-2 border-[#E4E7EC]">
        <div className="flex justify-between gap-4 mt-8 text-[#667185]">
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>Security</p>
          <p>Sitemap</p>
        </div>

        <div className="flex justify-between items-center mt-8 text-[#98A2B3]">
          <p>© 2023 Rayna. All rights reserved.</p>
        </div>
      </section>
    </div>
  );
};

export default Footer;
