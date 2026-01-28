
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/layout/Topbar.tsx";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <TopBar />
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;









    

