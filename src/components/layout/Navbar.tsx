import { FiMenu, FiChevronDown, FiX } from "react-icons/fi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    "Women",
    "Men", 
    "Shoes",
    "Watches",
    "Bags & Backpacks",
    "Jewellery",
    "Accessories"
  ];

  return (
    <div className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between h-12 sm:h-14">
        {/* Shop by Department - Hidden on mobile */}
        <div 
          className="hidden sm:flex items-center gap-2 lg:gap-3 text-xs sm:text-sm font-semibold cursor-pointer hover:text-primary transition"
          onMouseEnter={() => setShopDropdownOpen(true)}
          onMouseLeave={() => setShopDropdownOpen(false)}
        >
          <FiMenu size={18} />
          <span className="hidden md:inline">SHOP BY DEPARTMENT</span>
          <span className="md:hidden">SHOP</span>
          <FiChevronDown size={12} />
          
          {/* Department Dropdown */}
          {shopDropdownOpen && (
            <div className="absolute top-full left-0 bg-white border shadow-lg rounded-lg mt-1 py-2 min-w-48">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/category/${category}`}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary transition"
                  onClick={() => setShopDropdownOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden flex items-center gap-2"
        >
          {mobileMenuOpen ? (
            <FiX size={20} />
          ) : (
            <FiMenu size={20} />
          )}
          <span className="text-xs font-semibold">Menu</span>
        </button>

        {/* Main Menu - Hidden on mobile */}
        <nav className="hidden sm:flex items-center gap-3 lg:gap-8 text-xs sm:text-sm font-medium flex-1 justify-center">
          <Link to="/" className="flex items-center gap-1 cursor-pointer hover:text-primary transition">
            Home
          </Link>

          <div className="relative group">
            <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition">
              Shop <FiChevronDown size={12} className="hidden lg:block" />
            </div>
            <div className="absolute top-full left-0 bg-white border shadow-lg rounded-lg mt-1 py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/category/${category}`}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary transition"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition">
              Pages <FiChevronDown size={12} className="hidden lg:block" />
            </div>
            <div className="absolute top-full left-0 bg-white border shadow-lg rounded-lg mt-1 py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <Link
                to="/about"
                className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary transition"
              >
                About Us
              </Link>
              <Link
                to="/checkout"
                className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary transition"
              >
                Checkout
              </Link>
              <Link
                to="/category/all"
                className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary transition"
              >
                All Products
              </Link>
              <Link
                to="/"
                className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary transition"
              >
                Privacy Policy
              </Link>
              <Link
                to="/"
                className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary transition"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          <Link to="/" className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-primary transition">
            Contact
          </Link>
        </nav>

        {/* Buy Now Button */}
        <Link 
          to="/checkout" 
          className="cursor-pointer text-primary font-semibold text-xs sm:text-sm hover:text-primary/80 transition"
        >
          Buy Now
        </Link>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t bg-gray-50">
          <nav className="px-4 py-4 space-y-3 text-sm">
            <Link to="/" className="block cursor-pointer py-2 hover:text-primary transition">
              Home
            </Link>
            <div className="space-y-2">
              <div className="font-semibold text-gray-700">Categories:</div>
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/category/${category}`}
                  className="block cursor-pointer py-1 pl-4 hover:text-primary transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-gray-700">Pages:</div>
              <Link to="/about" className="block cursor-pointer py-1 pl-4 hover:text-primary transition">
                About Us
              </Link>
              <Link to="/checkout" className="block cursor-pointer py-1 pl-4 hover:text-primary transition">
                Checkout
              </Link>
              <Link to="/category/all" className="block cursor-pointer py-1 pl-4 hover:text-primary transition">
                All Products
              </Link>
              <Link to="/" className="block cursor-pointer py-1 pl-4 hover:text-primary transition">
                Privacy Policy
              </Link>
              <Link to="/" className="block cursor-pointer py-1 pl-4 hover:text-primary transition">
                Terms & Conditions
              </Link>
            </div>
            <Link to="/" className="block cursor-pointer py-2 hover:text-primary transition">
              Contact
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
