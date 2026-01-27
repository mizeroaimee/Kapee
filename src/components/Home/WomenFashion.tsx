import { useNavigate } from "react-router-dom";

const womenProducts = [
  {
    id: 5,
    name: "Women Floral Printed Blouse Top",
    price: "$47.00",
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Off-White-Printed-Top-5-300x350.jpg",
    discount: "46% OFF",
    badge: "FEATURED",
  },
  {
    id: 6,
    name: "Women Khaki Solid Top",
    price: "$199.00",
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Khaki-Solid-Top-300x350.jpg",
  },
  {
    id: 7,
    name: "Women Pink Solid Regular Trousers",
    price: "$69.00",
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Pink-Solid-Regular-Trousers-300x350.jpg",
  },
  {
    id: 8,
    name: "Women Navy Blue Solid Parka Jacket",
    price: "$160.00",
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Navy-Blue-Solid-Parka-Jacket-300x350.jpg",
    discount: "15% OFF",
  },
  {
    id: 9,
    name: "Women Blue Skinny Fit Jeans",
    price: "$95.00",
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Blue-Skinny-Fit-Jeans-300x350.jpg",
  },
  {
    id: 10,
    name: "Women Slim Fit Jeans",
    price: "$135.00",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dXs5s1I4aYG61YwAZEP6wWWkgbxYq9bDQw&s",
  },
];

const WomenFashion = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="container mx-auto px-4 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Category Menu */}
        <div className="border p-6">
          <h3 className="text-xl font-semibold mb-4 text-pink-500">
            Women's Fashion
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-black cursor-pointer">Trousers & Capris</li>
            <li className="hover:text-black cursor-pointer">Tops</li>
            <li className="hover:text-black cursor-pointer">Shorts & Skirts</li>
            <li className="hover:text-black cursor-pointer">Lingerie & Nightwear</li>
            <li className="hover:text-black cursor-pointer">Jeans</li>
            <li className="hover:text-black cursor-pointer">Dresses</li>
          </ul>
        </div>

        {/* Banner */}
        <div
          className="relative bg-cover bg-center h-[450px]"
          style={{
            backgroundImage:
              "url('https://kapee.presslayouts.com/wp-content/uploads/2019/07/Product-box-banner-4.jpg')",
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-center p-8">
            <h2 className="text-4xl font-bold text-gray-800"></h2>
            <p className="text-xl mt-2"></p>
          </div>
        </div>

        {/* Products Slider */}
        <div className="col-span-1 lg:col-span-2 relative">
          {/* Left Arrow */}
          <button
            onClick={() =>
              document.getElementById("women-slider")?.scrollBy({
                left: -300,
                behavior: "smooth",
              })
            }
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 z-20 hover:bg-black hover:text-white transition"
          >
            ‹
          </button>

          {/* Right Arrow */}
          <button
            onClick={() =>
              document.getElementById("women-slider")?.scrollBy({
                left: 300,
                behavior: "smooth",
              })
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 z-20 hover:bg-black hover:text-white transition"
          >
            ›
          </button>

          {/* Slider */}
          <div
            id="women-slider"
            className="grid grid-flow-col auto-cols-[230px] gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-8"
          >
            {womenProducts.map((item, index) => (
              <div
                key={index}
                onClick={() => handleProductClick(item.id)}
                className="border p-3 relative bg-white group overflow-hidden hover:shadow-lg transition cursor-pointer"
              >
                {/* Discount */}
                {item.discount && (
                  <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 z-10">
                    {item.discount}
                  </span>
                )}

                {/* Badge */}
                {item.badge && (
                  <span className="absolute top-8 left-2 bg-orange-500 text-white text-xs px-2 py-1 z-10">
                    {item.badge}
                  </span>
                )}

                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-300"
                  />
                </div>

                {/* Hover Icons */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition bg-black/20">
                  <button className="bg-white p-2 rounded-full hover:bg-black hover:text-white transition">
                    🛒
                  </button>
                  <button className="bg-white p-2 rounded-full hover:bg-black hover:text-white transition">
                    ❤️
                  </button>
                  <button className="bg-white p-2 rounded-full hover:bg-black hover:text-white transition">
                    👁️
                  </button>
                </div>

                {/* Text */}
                <h4 className="mt-3 text-sm font-medium group-hover:text-blue-600 transition">
                  {item.name}
                </h4>
                <p className="text-gray-700">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WomenFashion;
