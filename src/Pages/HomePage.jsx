import React from "react";
import HeroSection from "../Components/HomeComponents/HeroSection";
import PopulerFoods from "../Components/HomeComponents/PopulerFoods";
import CTA from "../Components/HomeComponents/CTA";
import OurChefs from "../Components/HomeComponents/OurChefs";

const HomePage = () => {
  return (
    <div className="">
      <HeroSection></HeroSection>
      <PopulerFoods></PopulerFoods>
      <OurChefs></OurChefs>
      <CTA></CTA>
    </div>
  );
};

export default HomePage;
