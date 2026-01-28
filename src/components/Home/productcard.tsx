import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="group border rounded overflow-hidden bg-white relative cursor-pointer" onClick={() => navigate(`/product/${id}`)}>

      {/* Sale Badge */}
      {sale && (
        <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 z-10 rounded">
          SALE
        </span>
      )}

      {/* Image */}
      <div className="relative h-40 sm:h-48 md:h-64 overflow-hidden">
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

        {/* Hover Icons */}
        <div className="absolute right-2 top-2 sm:right-3 sm:top-3 flex flex-col gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition">
          <button className="bg-white p-1.5 sm:p-2 rounded-full shadow hover:shadow-lg">
            <FiHeart size={16} className="sm:w-5 sm:h-5" />
          </button>
          <button className="bg-white p-1.5 sm:p-2 rounded-full shadow hover:shadow-lg">
            <FiEye size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Add to Cart */}
        <button className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-primary text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition hover:bg-primary-dark rounded">
          <FiShoppingCart className="inline mr-1 sm:w-5 sm:h-5" size={14} />
          Add to Cart
        </button>
      </div>

      {/* Info */}
      <div className="p-2 sm:p-3 md:p-4 text-center">
        <h3 className="text-xs sm:text-sm font-medium mb-1 line-clamp-2">{name}</h3>
        <div className="flex justify-center gap-1 sm:gap-2 flex-wrap">
          <span className="text-primary font-semibold text-xs sm:text-sm">${price}</span>
          {oldPrice && (
            <span className="text-gray-400 line-through text-xs">
              ${oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
