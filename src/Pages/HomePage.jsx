import React from "react";
import HeroSection from "../Components/HomeComponents/HeroSection";
import PopulerFoods from "../Components/HomeComponents/PopulerFoods";
import CTA from "../Components/HomeComponents/CTA";

const HomePage = () => {
  return (
    <div className="">
      <HeroSection></HeroSection>
      <PopulerFoods></PopulerFoods>
      <CTA></CTA>
    </div>
  );
};

export default HomePage;
