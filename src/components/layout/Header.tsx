import { FiUser, FiHeart, FiShoppingCart, FiSearch } from "react-icons/fi";

const Header = () => {
  return (
    <div className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between gap-6">

        {/* Logo */}
        <div className="text-3xl font-bold">
          kapee<span className="text-white">.</span>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 max-w-3xl bg-white rounded overflow-hidden">
          <input
            type="text"
            placeholder="Search for products, categories, brands, sku..."
            className="flex-1 px-4 py-3 text-gray-700 outline-none"
          />

          <select className="border-l px-3 text-gray-600 outline-none">
            <option>All Categories</option>
            <option>Fashion</option>
            <option>Electronics</option>
            <option>Accessories</option>
          </select>

          <button className="px-5 bg-primary text-white flex items-center justify-center">
            <FiSearch size={20} />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 text-sm">

          {/* Account */}
          <div className="flex items-center gap-2 cursor-pointer">
            <FiUser size={22} />
            <div className="leading-tight">
              <p className="text-xs">Hello,</p>
              <p className="font-semibold">Sign in</p>
            </div>
          </div>

          {/* Wishlist */}
          <div className="relative cursor-pointer">
            <FiHeart size={22} />
            <span className="absolute -top-2 -right-2 bg-white text-primary text-xs rounded-full px-1">
              0
            </span>
          </div>

          {/* Cart */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <FiShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-white text-primary text-xs rounded-full px-1">
                0
              </span>
            </div>
            <div className="font-semibold">$0.00</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;


