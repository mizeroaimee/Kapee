import { useNavigate } from "react-router-dom";
import { useCategories } from "../../context/CategoryContext";

const fallbackCategories = [
  { _id: "1", name: "Women", image: "https://www.yourfashionself.com/wp-content/uploads/2024/06/classic-elegant-style-768x886.jpg" },
  { _id: "2", name: "Men", image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Solid-Men-Hooded-Blue-Grey-T-Shirt-2-300x350.jpg" },
  { _id: "3", name: "Shoes", image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Shoes-150x150.jpg" },
  { _id: "4", name: "Watches", image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Watch-150x150.jpg" },
  { _id: "5", name: "Bags & Backpacks", image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Bags-150x150.png" },
  { _id: "6", name: "Jewellery", image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Accessories-150x150.jpg" },
  { _id: "7", name: "Accessories", image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Accessories-150x150.jpg" },
];

const CategoryCarousel = () => {
  const { categories, loading } = useCategories();
  const navigate = useNavigate();
  
  const displayCategories = categories.length > 0 ? categories : fallbackCategories;

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        {loading ? (
          <div className="text-center">Loading categories...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {displayCategories.map((cat) => (
              <div 
                key={cat._id} 
                className="text-center cursor-pointer group"
                onClick={() => navigate(`/category/${cat.name}`)}
              >
                <div className="relative overflow-hidden rounded-full w-24 h-24 mx-auto mb-3 bg-white shadow-md group-hover:shadow-lg transition">
                  <img
                    src={cat.image || "/placeholder.png"}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <p className="text-sm font-semibold group-hover:text-primary transition">{cat.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCarousel;
