import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import useCartSync from "../hooks/useCartSync";
import ScrollToTop from "../common/ScrollToTop";
import Footer from "./Footer";

const MainLayout = () => {
  useCartSync();

  return (
   
    <div className="min-h-screen flex flex-col bg-gray-200 dark:bg-slate-950 text-slate-900
     dark:text-white transition-colors duration-300">
      
      <ScrollToTop />

      <Navbar />

      <main className="flex-grow w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;