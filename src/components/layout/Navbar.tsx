import { FiMenu, FiChevronDown, FiX } from "react-icons/fi";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between h-12 sm:h-14">
        {/* Shop by Department - Hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-3 text-xs sm:text-sm font-semibold cursor-pointer hover:text-primary transition">
          <FiMenu size={18} />
          <span className="hidden md:inline">SHOP BY DEPARTMENT</span>
          <span className="md:hidden">SHOP</span>
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
          <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition">
            Home <FiChevronDown size={12} className="hidden lg:block" />
          </div>

          <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition">
            Shop <FiChevronDown size={12} className="hidden lg:block" />
          </div>

          <div className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-primary transition">
            Pages <FiChevronDown size={12} />
          </div>

          <div className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-primary transition">
            Blog <FiChevronDown size={12} />
          </div>

          <div className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-primary transition">
            Elements <FiChevronDown size={12} />
          </div>
        </nav>

        {/* Buy Now Button */}
        <div className="cursor-pointer text-primary font-semibold text-xs sm:text-sm hover:text-primary/80 transition">
          Buy Now
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t bg-gray-50">
          <nav className="px-4 py-4 space-y-3 text-sm">
            <div className="cursor-pointer py-2 hover:text-primary transition">Home</div>
            <div className="cursor-pointer py-2 hover:text-primary transition">Shop</div>
            <div className="cursor-pointer py-2 hover:text-primary transition">Pages</div>
            <div className="cursor-pointer py-2 hover:text-primary transition">Blog</div>
            <div className="cursor-pointer py-2 hover:text-primary transition">Elements</div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
