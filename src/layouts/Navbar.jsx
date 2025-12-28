import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Moon, Sun, Menu, X } from "lucide-react";
import { logoutUser } from "../features/auth/userSlice";
import { auth } from "../config/firebase";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../utils/productData";
import toast from "react-hot-toast";

import Logo from "../features/navbar/Logo";
import SearchBar from "../features/navbar/SearchBar";
import CartButton from "../features/navbar/CartButton";
import UserMenu from "../features/navbar/UserMenu";
import MobileMenuForm from "../features/navbar/MobileMenuForm";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const { totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "All";

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [category, setCategory] = useState(urlCategory);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    function syn() {
      setSearchTerm(urlSearch);
      setCategory(urlCategory);
    }
    syn();
  }, [urlSearch, urlCategory]);

  const { data: categories = ["All"] } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: Infinity,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchTerm}&category=${category}`);
    setIsMobileMenuOpen(false); 
  };

  const handleFilterClick = () => {
    setCategory("All");
    setSearchTerm("");
    navigate("/products?category=All");
  };

  const handleLogout = async () => {
   
    await auth.signOut();
    dispatch(logoutUser());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
  
    <nav className="sticky top-0 z-50 bg-neutral-300/70 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 gap-4">
          <Logo />

          <div className="hidden lg:block flex-1 max-w-2xl mx-4">
            <SearchBar searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              category={category}
              setCategory={setCategory}
              categories={categories}
              handleSearch={handleSearch}
             handleFilterClick={handleFilterClick}
            />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            >
              {isDarkMode ? (
                <Sun size={20} className="text-amber-400" />
              ) : (
                <Moon size={20} />
              )}
            </button>

            <CartButton totalQuantity={totalQuantity} user={user} />

            <div className="h-6 w-px bg-slate-300 dark:bg-slate-800 mx-1 hidden sm:block"></div>

            <UserMenu user={user} handleLogout={handleLogout} />

            <button
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        {isMobileMenuOpen && <MobileMenuForm categories={categories} category={category} setCategory={setCategory} 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />}
      </div>
    </nav>
  );
};

export default Navbar;