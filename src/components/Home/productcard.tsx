import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

type ProductCardProps = {
  id: number;
  name: string;
  image: string;
  hoverImage: string;
  price: number;
  oldPrice?: number;
  sale?: boolean;
};

const ProductCard = ({
  id,
  name,
  image,
  hoverImage,
  price,
  oldPrice,
  sale,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add item using CartContext
    addToCart({
      id,
      name,
      price,
      quantity: 1,
      image,
      selectedColor: "Default",
    });
    
    // Show feedback
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };
  
  // Mock ratings and reviews
  const rating = 4.5;
  const reviewCount = 3;

  return (
    <div className="group bg-white rounded-lg overflow-hidden cursor-pointer transition transform hover:shadow-lg" onClick={() => navigate(`/product/${id}`)}>

      {/* Image Container */}
      <div className="relative bg-gray-100 overflow-hidden">
        {/* Featured Badge */}
        {sale && (
          <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-2.5 py-1 z-10 rounded font-bold">
            FEATURED
          </span>
        )}

        {/* Wishlist Icon */}
        <button className="absolute top-3 right-3 bg-white text-gray-600 p-2 rounded-full shadow-md hover:shadow-lg hover:text-red-500 transition z-20">
          <FiHeart size={18} className="fill-current" />
        </button>

        {/* Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          <img
            src={hoverImage}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        {/* Category and View Button */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-xs font-semibold text-gray-700 uppercase">
            {name.split(' ')[0]}
          </span>
          <button className="text-gray-400 hover:text-gray-600 transition">
            <FiEye size={14} />
          </button>
        </div>

        {/* Product Name */}
        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 line-clamp-2 h-8">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <AiFillStar
                key={i}
                size={12}
                className={i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 font-medium">
            ({reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm sm:text-base font-bold text-gray-900">
            ${price}
          </span>
          {oldPrice && (
            <>
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                ${oldPrice}
              </span>
              <span className="text-xs font-bold text-green-600">
                {Math.round(((oldPrice - price) / oldPrice) * 100)}% Off
              </span>
            </>
          )}
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className={`w-full py-2 rounded text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 ${
            addedToCart 
              ? "bg-green-600 text-white hover:bg-green-700" 
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <FiShoppingCart size={14} />
          {addedToCart ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
