import React from "react";
import Header from "../SharedComponents/Header";
import { Outlet } from "react-router";
import Footer from "../SharedComponents/Footer";
import Loading from "../SharedComponents/Loading/Loading";

const MainLayout = () => {
  return (
    <Loading>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </Loading>
  );
};

export default MainLayout;
