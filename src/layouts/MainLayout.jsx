import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Ensure path is correct based on your folder structure
import useCartSync from "../hooks/useCartSync"; // Check path '../hooks' vs '../../hooks'
import ScrollToTop from "../common/ScrollToTop";
import Footer from "./Footer";
const MainLayout = () => {
  useCartSync();

  return (
    // ROOT: Handles global background color for dark mode
    <div className="min-h-screen flex flex-col bg-gray-200 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* 1. Navbar: No extra wrapper. Let it be sticky and handle its own width/padding. */}
      <ScrollToTop />

      <Navbar />

      {/* 2. Main Content: No padding/margins here. 
          This allows the HomePage banner to touch the Navbar perfectly. 
          Each page component (Outlet) will now manage its own internal spacing. 
      */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
