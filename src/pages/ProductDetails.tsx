import { useParams, useNavigate } from "react-router-dom";
import { FiHeart, FiShare2, FiTruck, FiRotateCcw } from "react-icons/fi";
import { useState } from "react";
import CartModal from "../components/layout/CartModal";
import { useCart } from "../context/CartContext";



// Products data
const allProducts = [
  {
    id: 1,
    name: "Leather Handbag",
    price: 39,
    oldPrice: 59,
    image:
      "data:image/jpeg;base64,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",
    hoverImage:
      "data:image/jpeg;base64,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",
    rating: 4.5,
    reviews: 45,
    category: "Women",
    description:
      "Premium leather handbag with multiple compartments. Perfect for everyday use and special occasions.",
    details: {
      material: "Genuine Leather",
      color: "Black",
      dimensions: "12x10x5 inches",
      weight: "1.2 lbs",
      warranty: "2 Years",
    },
  },
  {
    id: 2,
    name: "Classic Wrist Watch",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&h=600&fit=crop",
    rating: 5,
    reviews: 89,
    category: "Watches",
    description: "Elegant classic wrist watch with Swiss movement. Timeless design suitable for any occasion.",
    details: {
      material: "Stainless Steel",
      color: "Silver",
      waterResistance: "50m",
      movement: "Swiss Quartz",
      warranty: "5 Years",
    },
  },
  {
    id: 3,
    name: "Fashion Sneakers",
    price: 69,
    oldPrice: 99,
    image:
      "data:image/jpeg;base64,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",
    rating: 4.8,
    reviews: 120,
    category: "Shoes",
    description: "Comfortable and stylish fashion sneakers perfect for daily wear. Premium quality materials.",
    details: {
      material: "Canvas and Rubber",
      color: "Blue and White",
      size: "Available in all sizes",
      technology: "Cushioned insole",
      warranty: "1 Year",
    },
  },
  {
    id: 4,
    name: "Women Backpack",
    price: 49,
    image:
      "data:image/jpeg;base64,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",
    rating: 4.2,
    reviews: 65,
    category: "Bags & Backpacks",
    description: "Spacious and durable women's backpack ideal for travel and daily commute.",
    details: {
      material: "Polyester",
      color: "Black",
      capacity: "20L",
      compartments: "Multiple",
      warranty: "1 Year",
    },
  },
  {
    id: 5,
    name: "Women Off White Printed Top",
    price: 180,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtLWotIWzHKyJMlRYFoj76E_kBOl5YOBxQQ&s",
    hoverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtLWotIWzHKyJMlRYFoj76E_kBOl5YOBxQQ&s",
    rating: 4.6,
    reviews: 78,
    category: "Women",
    description: "Stylish off-white printed top with unique floral design. Perfect for casual and semi-formal occasions.",
    details: {
      material: "100% Cotton",
      color: "Off White",
      size: "XS to XXL",
      printType: "Digital Print",
      warranty: "6 Months",
    },
  },
  {
    id: 6,
    name: "Women Khaki Solid Top",
    price: 199,
    image: "https://via.placeholder.com/300?text=Khaki+Top",
    hoverImage: "https://via.placeholder.com/300?text=Khaki+Top+Hover",
    rating: 4.7,
    reviews: 92,
    category: "Women",
    description: "Elegant khaki solid top with versatile style. Great for layering or wearing on its own.",
    details: {
      material: "Cotton Blend",
      color: "Khaki",
      size: "XS to XXL",
      fit: "Regular Fit",
      warranty: "6 Months",
    },
  },
  {
    id: 7,
    name: "Women Navy Blue Solid Jacket",
    price: 160,
    oldPrice: 190,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTan0UYa6MFcOICIH5iM_EFfX4gUonPFs_hCQ&s",
    hoverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTan0UYa6MFcOICIH5iM_EFfX4gUonPFs_hCQ&s",
    rating: 4.5,
    reviews: 71,
    category: "Women",
    description: "Navy blue solid jacket perfect for any season. Professional and stylish design.",
    details: {
      material: "Wool Blend",
      color: "Navy Blue",
      size: "XS to XXL",
      pockets: "4 pockets",
      warranty: "1 Year",
    },
  },
  {
    id: 8,
    name: "Women Blue Skinny Jeans",
    price: 140,
    image: "https://via.placeholder.com/300?text=Blue+Skinny+Jeans",
    hoverImage: "https://via.placeholder.com/300?text=Blue+Skinny+Jeans+Hover",
    rating: 4.4,
    reviews: 58,
    category: "Women",
    description: "Stylish blue skinny jeans for a perfect fit. Made with high-quality denim.",
    details: {
      material: "98% Cotton, 2% Spandex",
      color: "Blue",
      size: "25 to 40",
      fit: "Skinny Fit",
      warranty: "6 Months",
    },
  },
  {
    id: 9,
    name: "Women Denim Skirt",
    price: 120,
    oldPrice: 200,
    image: "https://via.placeholder.com/300?text=Denim+Skirt",
    hoverImage: "https://via.placeholder.com/300?text=Denim+Skirt+Hover",
    rating: 4.3,
    reviews: 55,
    category: "Women",
    description: "Trendy denim skirt with a classic look. Perfect for casual and semi-formal wear.",
    details: {
      material: "100% Cotton Denim",
      color: "Blue",
      size: "XS to XXL",
      length: "Knee Length",
      warranty: "6 Months",
    },
  },
  {
    id: 10,
    name: "Women Slim Fit Jeans",
    price: 135,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dXs5s1I4aYG61YwAZEP6wWWkgbxYq9bDQw&s",
    hoverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dXs5s1I4aYG61YwAZEP6wWWkgbxYq9bDQw&s",
    rating: 4.6,
    reviews: 82,
    category: "Women",
    description: "Comfortable slim fit jeans with a flattering silhouette. Great everyday wear.",
    details: {
      material: "98% Cotton, 2% Spandex",
      color: "Blue",
      size: "25 to 40",
      fit: "Slim Fit",
      warranty: "6 Months",
    },
  },
  {
    id: 11,
    name: "Men Hooded Navy Blue",
    price: 90,
    oldPrice: 110,
    image:
      "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Solid-Men-Hooded-Blue-Grey-T-Shirt-2-300x350.jpg",
    hoverImage:
      "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Solid-Men-Hooded-Blue-Grey-T-Shirt-2-300x350.jpg",
    rating: 4.7,
    reviews: 156,
    category: "Men",
    description: "Premium hooded navy blue T-shirt with contemporary design. Perfect for casual wear.",
    details: {
      material: "100% Cotton",
      color: "Navy Blue & Grey",
      size: "S to XXL",
      fit: "Regular Fit",
      warranty: "1 Year",
    },
  },
  {
    id: 12,
    name: "Men Navy & Red Checked",
    price: 112,
    oldPrice: 142,
    image:
      "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Men-Navy-Red-Checked-Slim-Fit-Casual-Shirt-2-300x350.jpg",
    hoverImage:
      "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Men-Navy-Red-Checked-Slim-Fit-Casual-Shirt-2-300x350.jpg",
    rating: 4.5,
    reviews: 98,
    category: "Men",
    description: "Stylish navy and red checked shirt with slim fit design. Ideal for casual outings.",
    details: {
      material: "Cotton Blend",
      color: "Navy & Red",
      size: "S to XXL",
      fit: "Slim Fit",
      warranty: "1 Year",
    },
  },
  {
    id: 13,
    name: "Light Blue Solid Low Rise",
    price: 92,
    oldPrice: 115,
    image:
      "https://kapee.presslayouts.com/wp-content/uploads/2019/06/Light-Blue-Solid-Low-Rise-Skinny-Fit-Jeans-2-300x350.jpg",
    hoverImage:
      "https://kapee.presslayouts.com/wp-content/uploads/2019/06/Light-Blue-Solid-Low-Rise-Skinny-Fit-Jeans-2-300x350.jpg",
    rating: 4.4,
    reviews: 67,
    category: "Men",
    description: "Trendy light blue low-rise skinny fit jeans. Modern style for fashion-forward men.",
    details: {
      material: "99% Cotton, 1% Spandex",
      color: "Light Blue",
      size: "28 to 38",
      fit: "Skinny Fit",
      warranty: "6 Months",
    },
  },
  {
    id: 14,
    name: "Premium Leather Shoes",
    price: 145,
    oldPrice: 180,
    image:
      "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Brown-Leather-Shoes-300x350.jpg",
    hoverImage:
      "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Brown-Leather-Shoes-300x350.jpg",
    rating: 4.8,
    reviews: 234,
    category: "Shoes",
    description: "Premium quality leather shoes perfect for casual and formal occasions.",
    details: {
      material: "Genuine Leather",
      color: "Brown",
      size: "6 to 13",
      type: "Casual",
      warranty: "1 Year",
    },
  },
  {
    id: 15,
    name: "Elegant Wrist Watch",
    price: 199,
    oldPrice: 250,
    image:
      "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Black-Leather-Watch-300x350.jpg",
    hoverImage:
      "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Black-Leather-Watch-300x350.jpg",
    rating: 4.9,
    reviews: 189,
    category: "Watches",
    description: "Sophisticated wrist watch with leather strap and water-resistant design.",
    details: {
      material: "Stainless Steel",
      color: "Black",
      type: "Analog",
      waterResistance: "50m",
      warranty: "2 Years",
    },
  },
  {
    id: 16,
    name: "Canvas Backpack",
    price: 89,
    oldPrice: 120,
    image:
      "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Black-Canvas-Backpack-300x350.jpg",
    hoverImage:
      "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Black-Canvas-Backpack-300x350.jpg",
    rating: 4.6,
    reviews: 142,
    category: "Bags & Backpacks",
    description: "Durable canvas backpack with multiple compartments and comfortable straps.",
    details: {
      material: "Canvas",
      color: "Black",
      capacity: "30L",
      waterProof: "Yes",
      warranty: "1 Year",
    },
  },
  {
    id: 17,
    name: "Gold Pendant Necklace",
    price: 156,
    oldPrice: 200,
    image:
      "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Gold-Necklace-300x350.jpg",
    hoverImage:
      "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Gold-Necklace-300x350.jpg",
    rating: 4.7,
    reviews: 76,
    category: "Jewellery",
    description: "Beautiful gold pendant necklace with exquisite design and quality craftsmanship.",
    details: {
      material: "18K Gold Plated",
      type: "Pendant",
      length: "18 inches",
      weight: "5g",
      warranty: "6 Months",
    },
  },
  {
    id: 18,
    name: "Sunglasses UV Protection",
    price: 75,
    oldPrice: 100,
    image:
      "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Black-Sunglasses-300x350.jpg",
    hoverImage:
      "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Black-Sunglasses-300x350.jpg",
    rating: 4.5,
    reviews: 98,
    category: "Accessories",
    description: "Stylish sunglasses with UV protection and polarized lenses.",
    details: {
      material: "Polycarbonate",
      color: "Black",
      lensType: "Polarized",
      uvProtection: "UV400",
      warranty: "1 Year",
    },
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-primary text-white px-6 py-2 rounded"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          {/* Product Image */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x400?text=" + encodeURIComponent(product.name);
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <p className="text-gray-500">Image not available</p>
                </div>
              )}
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {/* Main image thumbnail */}
              <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 border-primary">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/80x80?text=1";
                  }}
                />
              </div>
              
              {/* Hover image thumbnail */}
              {product.hoverImage && product.hoverImage !== product.image && (
                <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border hover:border-primary cursor-pointer transition">
                  <img
                    src={product.hoverImage}
                    alt={`${product.name} variant`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/80x80?text=2";
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg p-4 sm:p-8">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-primary">
                ${product.price}
              </span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ${product.oldPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Color</label>
              <div className="flex gap-3">
                {["Black", "Blue", "Red"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border-2 rounded transition ${
                      selectedColor === color
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 text-gray-700 hover:border-primary"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  −
                </button>
                <span className="text-xl font-semibold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button 
                onClick={() => {
                  if (product) {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: quantity,
                      image: product.image,
                      selectedColor: selectedColor,
                    });
                    setIsCheckoutOpen(true);
                    setQuantity(1);
                  }
                }}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition">
                Add To Cart
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                <FiHeart size={20} />
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                <FiShare2 size={20} />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-3 border-t pt-6">
              <div className="flex items-center gap-3">
                <FiTruck size={20} className="text-primary" />
                <span className="text-sm">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3">
                <FiRotateCcw size={20} className="text-primary" />
                <span className="text-sm">30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Table */}
        <div className="mt-12 bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Product Specifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(product.details).map(([key, value]) => (
              <div key={key} className="pb-4 border-b">
                <h3 className="text-sm font-semibold text-gray-600 uppercase">
                  {key.replace(/([A-Z])/g, " $1")}
                </h3>
                <p className="text-lg font-medium mt-2">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {allProducts
              .filter((p) => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((p) => (
                <button
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="text-left group border rounded overflow-hidden bg-white hover:shadow-lg transition cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-sm mb-2">{p.name}</h3>
                    <span className="text-primary font-semibold">${p.price}</span>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      <CartModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};

export default ProductDetails;
