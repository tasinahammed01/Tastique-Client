import React from "react";
import Header from "../SharedComponents/Header";
import { Outlet } from "react-router";
import Footer from "../SharedComponents/Footer";

const MainLayout = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
