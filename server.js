const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample data (in production, this would come from a database)
const products = [
  { _id: "1", name: "Women Floral Printed Blouse Top", price: 47, oldPrice: 87, image: "https://tse2.mm.bing.net/th/id/OIP.TNWGnoUDEMUAjzsMEo1BuAHaJ3?pid=Api&P=0&h=220", hoverImage: "https://tse2.mm.bing.net/th/id/OIP.TNWGnoUDEMUAjzsMEo1BuAHaJ3?pid=Api&P=0&h=220.jpg", rating: 4.5, reviews: 32, category: "Women", discount: "46% OFF" },
  { _id: "2", name: "Women Blue Stretchable Jeans", price: 70, oldPrice: 78, image: "https://tse4.mm.bing.net/th/id/OIP.iS1I1nfGEm70srZy8MkY_wHaKq?pid=Api&P=0&h=220", hoverImage: "https://tse4.mm.bing.net/th/id/OIP.iS1I1nfGEm70srZy8MkY_wHaKq?pid=Api&P=0&h=220", rating: 4.3, reviews: 15, category: "Women", discount: "10% OFF" },
  { _id: "3", name: "Yoga", price: 199, image: "https://tse3.mm.bing.net/th/id/OIP.8Y3falts9Ihyu0MyoNy3NAHaE8?pid=Api&P=0&h=220", hoverImage: "https://tse3.mm.bing.net/th/id/OIP.8Y3falts9Ihyu0MyoNy3NAHaE8?pid=Api&P=0&h=220", rating: 4.8, reviews: 67, category: "Women" },
  { _id: "11", name: "Men Hooded Navy Blue", price: 90, oldPrice: 110, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Solid-Men-Hooded-Blue-Grey-T-Shirt-2-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/04/Solid-Men-Hooded-Blue-Grey-T-Shirt-2-300x350.jpg", rating: 4.7, reviews: 156, category: "Men" },
  { _id: "14", name: "Premium Leather Shoes", price: 145, oldPrice: 180, image: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Brown-Leather-Shoes-300x350.jpg", hoverImage: "https://kapee.presslayouts.com/wp-content/uploads/2019/03/Brown-Leather-Shoes-300x350.jpg", rating: 4.8, reviews: 234, category: "Shoes" }
];

const categories = [
  { _id: "1", name: "Women", description: "Women's clothing and accessories" },
  { _id: "2", name: "Men", description: "Men's clothing and accessories" },
  { _id: "3", name: "Shoes", description: "Footwear for all occasions" },
  { _id: "4", name: "Watches", description: "Timepieces and smart watches" },
  { _id: "5", name: "Bags & Backpacks", description: "Bags and travel accessories" },
  { _id: "6", name: "Jewellery", description: "Jewelry and accessories" },
  { _id: "7", name: "Accessories", description: "Fashion accessories" }
];

// Get products with filtering and sorting
app.get('/api/products', (req, res) => {
  let filteredProducts = [...products];
  
  // Filter by category
  if (req.query.category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }
  
  // Filter by price range
  if (req.query.maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= parseInt(req.query.maxPrice));
  }
  
  // Sort products
  if (req.query.sortBy) {
    switch (req.query.sortBy) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => b._id - a._id);
        break;
    }
  }
  
  res.json(filteredProducts);
});

// Get categories
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});