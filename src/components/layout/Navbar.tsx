import { FiMenu, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">

        {/* Shop by Department */}
        <div className="flex items-center gap-3 text-sm font-semibold cursor-pointer">
          <FiMenu size={20} />
          <span>SHOP BY DEPARTMENT</span>
        </div>

        {/* Main Menu */}
        <nav className="flex items-center gap-8 text-sm font-medium">
          <div className="flex items-center gap-1 cursor-pointer">
            Home <FiChevronDown size={14} />
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            Shop <FiChevronDown size={14} />
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            Pages <FiChevronDown size={14} />
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            Blog <FiChevronDown size={14} />
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            Elements <FiChevronDown size={14} />
          </div>

          <div className="cursor-pointer text-primary font-semibold">
            Buy Now
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
