import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample users data (in production, use a database)
const users = [];

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

// Auth endpoints
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  // Create new user
  const user = {
    _id: Date.now().toString(),
    name,
    email,
    password // In production, hash this password
  };
  
  users.push(user);
  
  // Generate token (in production, use JWT)
  const token = `token_${user._id}`;
  
  res.json({
    user: { _id: user._id, name: user.name, email: user.email },
    token
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = `token_${user._id}`;
  
  res.json({
    user: { _id: user._id, name: user.name, email: user.email },
    token
  });
});

app.get('/api/auth/me', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  const userId = token.replace('token_', '');
  const user = users.find(u => u._id === userId);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  res.json({ _id: user._id, name: user.name, email: user.email });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Check if email exists
app.post('/api/auth/check-email', (req, res) => {
  const { email } = req.body;
  
  const user = users.find(u => u.email === email);
  if (user) {
    res.json({ exists: true });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Get featured products
app.get('/api/products/featured', (req, res) => {
  const featuredProducts = products.slice(0, 5);
  res.json(featuredProducts);
});

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

// Create category
app.post('/api/categories', (req, res) => {
  const { name, description } = req.body;
  
  const newCategory = {
    _id: Date.now().toString(),
    name,
    description: description || ''
  };
  
  categories.push(newCategory);
  res.json({ message: 'Category created successfully', category: newCategory });
});

// Update category
app.put('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  
  const categoryIndex = categories.findIndex(cat => cat._id === id);
  if (categoryIndex === -1) {
    return res.status(404).json({ message: 'Category not found' });
  }
  
  categories[categoryIndex] = {
    ...categories[categoryIndex],
    name: name || categories[categoryIndex].name,
    description: description || categories[categoryIndex].description
  };
  
  res.json({ message: 'Category updated successfully', category: categories[categoryIndex] });
});

// Delete category
app.delete('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  
  const categoryIndex = categories.findIndex(cat => cat._id === id);
  if (categoryIndex === -1) {
    return res.status(404).json({ message: 'Category not found' });
  }
  
  categories.splice(categoryIndex, 1);
  res.json({ message: 'Category deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});