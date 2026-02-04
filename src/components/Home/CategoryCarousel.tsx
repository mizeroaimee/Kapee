import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Women", image: "https://www.yourfashionself.com/wp-content/uploads/2024/06/classic-elegant-style-768x886.jpg" },
  { name: "Shoes", image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Shoes-150x150.jpg" },
  { name: "Bags & Backpacks", image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Bags-150x150.png" },
  { name: "Watches", image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Watch-150x150.jpg" },
  { name: "Jewellery", image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Accessories-150x150.jpg" },
  { name: "Accessories", image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Accessories-150x150.jpg" },
  { name: "Dresses", image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Off-White-Printed-Top-5-150x150.jpg" },
  { name: "Tops", image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Off-White-Printed-Top-5-150x150.jpg" },
  { name: "Lingerie & Nightwear", image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Black-Solid-Maxi-Skirt-150x150.jpg" },
  { name: "Trousers & Culottes", image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Pink-Solid-Regular-Trousers-150x150.jpg" },
];

const CategoryCarousel = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = 300;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-8">Shop by Category</h2>
      
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
      >
        <FiChevronLeft size={24} />
      </button>

      {/* Categories */}
      <div
        ref={sliderRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth px-8"
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(cat.name)}
            className="min-w-[120px] flex flex-col items-center text-center cursor-pointer group"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border transition group-hover:shadow-lg">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <p className="mt-3 text-sm font-medium text-gray-700 group-hover:text-primary transition">
              {cat.name}
            </p>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
      >
        <FiChevronRight size={24} />
      </button>
    </section>
  );
};

export default CategoryCarousel;
