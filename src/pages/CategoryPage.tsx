import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiGrid, FiList, FiChevronDown } from "react-icons/fi";
import { api } from "../services/api";
import type { Product, Category } from "../services/api";

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("default");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState(500);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          api.getProducts(),
          api.getCategories()
        ]);
        setProducts(productsData.products);
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, sortBy, priceRange, selectedColor, selectedSize]);

  // Default subcategories if not provided by backend
  const defaultSubCategories: { [key: string]: string[] } = {
    "Women": ["Dresses", "Jeans", "Tops", "Shirts", "Shorts & Skirts", "Jackets & Coats"],
    "Men": ["T-Shirts", "Shirts", "Jeans", "Jackets & Coats", "Trousers & Pants"],
    "Shoes": ["Casual Shoes", "Formal Shoes", "Sports Shoes", "Boots"],
    "Watches": ["Analog", "Digital", "Smart Watches"],
    "Bags & Backpacks": ["Backpacks", "Handbags", "Travel Bags"],
    "Jewellery": ["Necklaces", "Rings", "Bracelets", "Earrings"],
    "Accessories": ["Sunglasses", "Scarves", "Belts"]
  };
  
  const subCategories = defaultSubCategories[category || ''] || [];

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
          <span className="text-gray-900 font-medium">
            {category?.toLowerCase() === "all" ? "All Products" : category}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 capitalize">
          {category?.toLowerCase() === "all" ? "All Products" : category}
        </h1>

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
                  {subCategories.map((sub, idx) => (
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
                  Showing <span className="font-bold">{products.length}</span> products
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
            {loading ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-red-600">Error</h2>
                <p className="text-gray-600">{error}</p>
              </div>
            ) : products.length > 0 ? (
              <div className={viewType === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" : "space-y-4"}>
                {products.slice(0, itemsPerPage).map((product) => (
                  <div
                    key={product._id}
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer group"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={product.image || '/placeholder-image.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-image.svg';
                        }}
                      />
                      {!product.inStock && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded">
                          OUT OF STOCK
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
                              className={`text-sm ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">(3)</span>
                      </div>
                      <div className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary">${product.price}</span>
                        </div>
                        <span className="text-xs text-gray-600">{product.quantity} in stock</span>
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