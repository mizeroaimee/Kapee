import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 11,
    name: "Men Hooded Navy Blue",
    price: "$85.00 – $95.00",
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Solid-Men-Hooded-Blue-Grey-T-Shirt-2-300x350.jpg",
    badge: "FEATURED",
    discount: "19% OFF",
  },
  {
    id: 12,
    name: "Men Navy & Red Checked",
    price: "$99.00 – $124.00",
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Men-Navy-Red-Checked-Slim-Fit-Casual-Shirt-2-300x350.jpg",
    discount: "20% OFF",
  },
  {
    id: 13,
    name: "Light Blue Solid Low Rise",
    price: "$89.00 – $96.00",
    image: "https://kapee.presslayouts.com/wp-content/uploads/2019/06/Light-Blue-Solid-Low-Rise-Skinny-Fit-Jeans-2-300x350.jpg",
    discount: "7% OFF",
  },
];

const MenFashion = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Left Category Menu */}
        <div className="border p-4 sm:p-6 hidden md:block">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Men's Fashion</h3>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
            <li className="hover:text-black cursor-pointer">Wallets</li>
            <li className="hover:text-black cursor-pointer">T-Shirts</li>
            <li className="hover:text-black cursor-pointer">Shirts</li>
            <li className="hover:text-black cursor-pointer">Jeans</li>
            <li className="hover:text-black cursor-pointer">Jackets & Coats</li>
          </ul>
        </div>

        {/* Banner */}
        <div className="relative bg-cover bg-center h-[250px] sm:h-[350px] lg:h-[450px] col-span-1 lg:col-span-1"
          style={{ backgroundImage: "url('https://kapee.presslayouts.com/wp-content/uploads/2019/07/Product-box-banner-1-269x360.jpg')" }}>
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-3 sm:p-6 text-white">
            <p className="text-xs sm:text-sm uppercase font-semibold">Men's Clothing</p>
            <h2 className="text-xl sm:text-3xl font-bold">UP TO 50% OFF</h2>
          </div>
        </div>

        {/* Products */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 relative">
          <div className="grid grid-flow-col auto-cols-[150px] sm:auto-cols-[200px] lg:auto-cols-[230px] gap-3 sm:gap-6 overflow-x-auto scroll-smooth px-4 sm:px-8">
            {products.map((item, index) => (
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

export default MenFashion;