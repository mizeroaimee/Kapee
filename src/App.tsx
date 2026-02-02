import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/layout/Topbar.tsx";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import Checkout from "./pages/Checkout.tsx";
import About from "./pages/About.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CategoryProvider } from "./context/CategoryContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CategoryProvider>
          <Router>
            <TopBar />
            <Header />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
            <Footer />
          </Router>
        </CategoryProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;









    

