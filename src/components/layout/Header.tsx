import { FiUser, FiHeart, FiShoppingCart, FiSearch, FiX, FiLogOut } from "react-icons/fi";
import { useState } from "react";
import CartModal from "./CartModal";
import LoginModal from "../auth/LoginModal";
import SignupModal from "../auth/SignupModal";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="bg-primary text-white">
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-6">
        {/* Header Row - Logo, Search, Icons */}
        <div className="flex items-center justify-between gap-2 sm:gap-6">
          {/* Logo */}
          <div className="text-lg sm:text-3xl font-bold flex-shrink-0">
            kapee<span className="text-white">.</span>
          </div>

          {/* Search Bar - Hidden on mobile, shown on md+ */}
          <div className="hidden md:flex flex-1 max-w-2xl lg:max-w-3xl bg-white rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 outline-none text-xs sm:text-sm"
            />

            <select className="border-l px-2 sm:px-3 text-gray-600 outline-none text-xs sm:text-sm">
              <option>All Categories</option>
              <option>Fashion</option>
              <option>Electronics</option>
              <option>Accessories</option>
            </select>

            <button className="px-2 sm:px-5 bg-primary text-white flex items-center justify-center flex-shrink-0">
              <FiSearch size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-2 sm:gap-6 text-xs sm:text-sm flex-shrink-0">
            {/* Account */}
            {user ? (
              <div className="relative group">
                <div className="hidden sm:flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                  <FiUser size={20} />
                  <div className="leading-tight hidden lg:block">
                    <p className="text-xs">Hello,</p>
                    <p className="font-semibold">{user.name}</p>
                  </div>
                </div>
                
                {/* Mobile Account Icon */}
                <div className="sm:hidden cursor-pointer hover:opacity-80 transition">
                  <FiUser size={18} />
                </div>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-900 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
                  <div className="p-3 border-b text-xs">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition text-sm"
                  >
                    <FiLogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="hidden sm:flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
                onClick={() => setLoginOpen(true)}
              >
                <FiUser size={20} />
                <div className="leading-tight hidden lg:block">
                  <p className="text-xs">Hello,</p>
                  <p className="font-semibold">Sign in</p>
                </div>
              </div>
            )}

            {/* Mobile Account Icon */}
            {!user && (
              <div
                className="sm:hidden cursor-pointer hover:opacity-80 transition"
                onClick={() => setLoginOpen(true)}
              >
                <FiUser size={18} />
              </div>
            )}

            {/* Wishlist */}
            <div className="relative cursor-pointer hover:opacity-80 transition">
              <FiHeart size={18} className="sm:w-5 sm:h-5" />
              <span className="absolute -top-1 -right-1 bg-white text-primary text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                0
              </span>
            </div>

            {/* Cart */}
            <div className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:opacity-80 transition" onClick={() => setCartOpen(true)}>
              <div className="relative">
                <FiShoppingCart size={18} className="sm:w-5 sm:h-5" />
                <span className="absolute -top-1 -right-1 bg-white text-primary text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  0
                </span>
              </div>
              <div className="hidden sm:block font-semibold text-xs sm:text-sm">$0.00</div>
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden ml-1"
            >
              {mobileMenuOpen ? (
                <FiX size={20} />
              ) : (
                <FiSearch size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 flex bg-white rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 px-3 py-2 text-gray-700 outline-none text-xs"
            />
            <button className="px-3 bg-primary text-white flex items-center justify-center">
              <FiSearch size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Cart Modal */}
      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Login Modal */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToSignup={() => {
          setLoginOpen(false);
          setSignupOpen(true);
        }}
      />

      {/* Signup Modal */}
      <SignupModal
        isOpen={signupOpen}
        onClose={() => setSignupOpen(false)}
        onSwitchToLogin={() => {
          setSignupOpen(false);
          setLoginOpen(true);
        }}
      />
    </div>
  );
};

export default Header;


