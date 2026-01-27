import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiGrid, FiList, FiChevronDown } from "react-icons/fi";

// Import products from ProductDetails
const allProducts = [
  { id: 1, name: "Women Floral Printed Blouse Top", price: 47, oldPrice: 87, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Off-White-Printed-Top-5-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Off-White-Printed-Top-5-300x350.jpg", rating: 4.5, reviews: 32, category: "Women", discount: "46% OFF" },
  { id: 2, name: "Women Blue Stretchable Jeans", price: 70, oldPrice: 78, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Blue-Stretchable-Jeans-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Blue-Stretchable-Jeans-300x350.jpg", rating: 4.3, reviews: 15, category: "Women", discount: "10% OFF" },
  { id: 3, name: "Yoga", price: 199, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Khaki-Solid-Top-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Khaki-Solid-Top-300x350.jpg", rating: 4.8, reviews: 67, category: "Women" },
  { id: 4, name: "Women Black Solid Maxi Skirt", price: 68, oldPrice: 75, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Black-Solid-Maxi-Skirt-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Black-Solid-Maxi-Skirt-300x350.jpg", rating: 4.6, reviews: 31, category: "Women" },
  { id: 5, name: "Women Solid Maroon Shirt", price: 49, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Solid-Maroon-Shirt-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Solid-Maroon-Shirt-300x350.jpg", rating: 4.4, reviews: 28, category: "Women" },
  { id: 6, name: "Women Loose Blue Shirt", price: 51, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Loose-Blue-Shirt-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Loose-Blue-Shirt-300x350.jpg", rating: 4.7, reviews: 44, category: "Women" },
  { id: 7, name: "Women Pink Solid Regular Trousers", price: 69, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Pink-Solid-Regular-Trousers-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Pink-Solid-Regular-Trousers-300x350.jpg", rating: 4.6, reviews: 39, category: "Women" },
  { id: 8, name: "Women Navy Blue Solid Parka Jacket", price: 160, oldPrice: 190, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Navy-Blue-Solid-Parka-Jacket-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Navy-Blue-Solid-Parka-Jacket-300x350.jpg", rating: 4.4, reviews: 21, category: "Women" },
  { id: 9, name: "Women Blue Skinny Fit Jeans", price: 95, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Blue-Skinny-Fit-Jeans-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Blue-Skinny-Fit-Jeans-300x350.jpg", rating: 4.2, reviews: 18, category: "Women" },
  { id: 10, name: "Women Slim Fit Jeans", price: 135, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dXs5s1I4aYG61YwAZEP6wWWkgbxYq9bDQw&s", hoverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dXs5s1I4aYG61YwAZEP6wWWkgbxYq9bDQw&s", rating: 4.6, reviews: 82, category: "Women" },
  { id: 11, name: "Men Hooded Navy Blue", price: 90, oldPrice: 110, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Solid-Men-Hooded-Blue-Grey-T-Shirt-2-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Solid-Men-Hooded-Blue-Grey-T-Shirt-2-300x350.jpg", rating: 4.7, reviews: 156, category: "Men" },
  { id: 12, name: "Men Navy & Red Checked", price: 112, oldPrice: 142, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Men-Navy-Red-Checked-Slim-Fit-Casual-Shirt-2-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Men-Navy-Red-Checked-Slim-Fit-Casual-Shirt-2-300x350.jpg", rating: 4.5, reviews: 98, category: "Men" },
  { id: 13, name: "Light Blue Solid Low Rise", price: 92, oldPrice: 115, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/06/Light-Blue-Solid-Low-Rise-Skinny-Fit-Jeans-2-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/06/Light-Blue-Solid-Low-Rise-Skinny-Fit-Jeans-2-300x350.jpg", rating: 4.4, reviews: 67, category: "Men" },
  { id: 14, name: "Premium Leather Shoes", price: 145, oldPrice: 180, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Brown-Leather-Shoes-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Brown-Leather-Shoes-300x350.jpg", rating: 4.8, reviews: 234, category: "Shoes" },
  { id: 15, name: "Elegant Wrist Watch", price: 199, oldPrice: 250, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Black-Leather-Watch-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Black-Leather-Watch-300x350.jpg", rating: 4.9, reviews: 189, category: "Watches" },
  { id: 16, name: "Canvas Backpack", price: 89, oldPrice: 120, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Black-Canvas-Backpack-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Black-Canvas-Backpack-300x350.jpg", rating: 4.6, reviews: 142, category: "Bags & Backpacks" },
  { id: 17, name: "Gold Pendant Necklace", price: 156, oldPrice: 200, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Gold-Necklace-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Gold-Necklace-300x350.jpg", rating: 4.7, reviews: 76, category: "Jewellery" },
  { id: 18, name: "Sunglasses UV Protection", price: 75, oldPrice: 100, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Black-Sunglasses-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Black-Sunglasses-300x350.jpg", rating: 4.5, reviews: 98, category: "Accessories" }
];

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("default");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState(500);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const filteredProducts = allProducts.filter(
    (product) => product.category.toLowerCase() === category?.toLowerCase() && product.price <= priceRange
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const subCategories: { [key: string]: string[] } = {
    "Women": ["Dresses", "Jeans", "Tops", "Shirts", "Shorts & Skirts", "Jackets & Coats"],
    "Men": ["T-Shirts", "Shirts", "Jeans", "Jackets & Coats", "Trousers & Pants"],
    "Shoes": ["Casual Shoes", "Formal Shoes", "Sports Shoes", "Boots"],
    "Watches": ["Analog", "Digital", "Smart Watches"],
    "Bags & Backpacks": ["Backpacks", "Handbags", "Travel Bags"],
    "Jewellery": ["Necklaces", "Rings", "Bracelets", "Earrings"],
    "Accessories": ["Sunglasses", "Scarves", "Belts"]
  };

  const colors = ["Blue", "Black", "Red", "White", "Green"];
  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-600">
          <span className="cursor-pointer hover:text-primary" onClick={() => navigate("/")}>Home</span>
          <span className="mx-2">/</span>
          <span className="cursor-pointer hover:text-primary">Shop</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{category}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 capitalize">{category}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              {/* Product Categories */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4 flex items-center justify-between cursor-pointer">
                  PRODUCT CATEGORIES <FiChevronDown size={18} />
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {subCategories[category as string]?.map((sub, idx) => (
                    <li key={idx} className="hover:text-primary cursor-pointer">
                      {sub} <span className="text-xs">({Math.floor(Math.random() * 20)})</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Filter by Price */}
              <div className="mb-8 border-t pt-6">
                <h3 className="text-lg font-bold mb-4 flex items-center justify-between cursor-pointer">
                  FILTER BY PRICE <FiChevronDown size={18} />
                </h3>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full"
                />
                <div className="mt-4 text-sm font-medium">Price: $0 - ${priceRange}</div>
              </div>

              {/* Filter by Color */}
              <div className="mb-8 border-t pt-6">
                <h3 className="text-lg font-bold mb-4 flex items-center justify-between cursor-pointer">
                  FILTER BY COLOR <FiChevronDown size={18} />
                </h3>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <label key={color} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedColor === color}
                        onChange={() => setSelectedColor(selectedColor === color ? null : color)}
                        className="w-4 h-4"
                      />
                      {color}
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter by Size */}
              <div className="mb-8 border-t pt-6">
                <h3 className="text-lg font-bold mb-4 flex items-center justify-between cursor-pointer">
                  FILTER BY SIZE <FiChevronDown size={18} />
                </h3>
                <div className="space-y-2">
                  {sizes.map((size) => (
                    <label key={size} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSize === size}
                        onChange={() => setSelectedSize(selectedSize === size ? null : size)}
                        className="w-4 h-4"
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>

              {/* Average Rating */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold mb-4 flex items-center justify-between cursor-pointer">
                  AVERAGE RATING <FiChevronDown size={18} />
                </h3>
                <div className="space-y-2 text-sm">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <label key={star} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < star ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                        ))}
                      </div>
                      & Up
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3">
            {/* Top Controls */}
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-bold">{sortedProducts.length}</span> products
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewType("grid")}
                      className={`p-2 ${viewType === "grid" ? "text-primary" : "text-gray-400"}`}
                    >
                      <FiGrid size={20} />
                    </button>
                    <button
                      onClick={() => setViewType("list")}
                      className={`p-2 ${viewType === "list" ? "text-primary" : "text-gray-400"}`}
                    >
                      <FiList size={20} />
                    </button>
                  </div>

                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="border border-gray-300 rounded px-3 py-2 text-sm"
                  >
                    <option value={12}>Show 12</option>
                    <option value={24}>Show 24</option>
                    <option value={36}>Show 36</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm"
                  >
                    <option value="default">Default sorting</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rating</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className={viewType === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" : "space-y-4"}>
                {sortedProducts.slice(0, itemsPerPage).map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer group"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-yellow-400 text-white px-3 py-1 text-xs font-bold rounded">
                          {product.discount}
                        </div>
                      )}
                      {product.oldPrice && !product.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                          Sale
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                      <div className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary">${product.price}</span>
                          {product.oldPrice && (
                            <span className="text-sm text-gray-400 line-through">${product.oldPrice}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">No products found</h2>
                <p className="text-gray-600">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;