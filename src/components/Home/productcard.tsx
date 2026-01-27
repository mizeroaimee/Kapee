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
        <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 z-10">
          SALE
        </span>
      )}

      {/* Image */}
      <div className="relative h-64 overflow-hidden">
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
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
          <button className="bg-white p-2 rounded-full shadow hover:shadow-lg">
            <FiHeart />
          </button>
          <button className="bg-white p-2 rounded-full shadow hover:shadow-lg">
            <FiEye />
          </button>
        </div>

        {/* Add to Cart */}
        <button className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-2 text-sm opacity-0 group-hover:opacity-100 transition hover:bg-primary-dark">
          <FiShoppingCart className="inline mr-1" />
          Add to Cart
        </button>
      </div>

      {/* Info */}
      <div className="p-4 text-center">
        <h3 className="text-sm font-medium mb-1">{name}</h3>
        <div className="flex justify-center gap-2">
          <span className="text-primary font-semibold">${price}</span>
          {oldPrice && (
            <span className="text-gray-400 line-through text-sm">
              ${oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
