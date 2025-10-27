import AdSection from "../components/Home/AdsSec";
import AltFeaturedCollection from "../components/Home/AltFeaturedCollection";
import Brands from "../components/Home/Brands";
import FeaturedCollection from "../components/Home/FeaturedCollection";
import Hero from "../components/Home/Hero";
import Highlights from "../components/Home/Highlights";
import ProductsContainer from "../components/Home/ProductsContainer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "./Cart";
import { useState } from "react";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <>
      <Header />
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <section className="px-[112px] mt-[158px]">
        <Hero />
        <Brands />
        <FeaturedCollection />
        <Highlights />
        <AltFeaturedCollection />
        <ProductsContainer />
        <AdSection />
      </section>
      <Footer />
    </>
  );
}
