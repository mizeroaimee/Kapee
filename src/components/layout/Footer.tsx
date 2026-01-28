import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiYoutube, FiRss } from "react-icons/fi";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed with:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg sm:text-2xl font-bold mb-3 sm:mb-4">kapee.</h3>
            <p className="text-xs sm:text-sm mb-4 sm:mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">📍</span>
                <span>Lorem Ipsum, 2045 Lorem Ipsum</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary">📞</span>
                <span>+1-234-567-8900</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary">📧</span>
                <span>info@kapee.com</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary">🕐</span>
                <span>Mon - Fri / 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">INFORMATION</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#" className="hover:text-primary transition">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition">Store Location</a></li>
              <li><a href="#" className="hover:text-primary transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-primary transition">Latest News</a></li>
              <li><a href="#" className="hover:text-primary transition">Our Sitemap</a></li>
            </ul>
          </div>

          {/* Our Service */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">OUR SERVICE</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition">Terms of Sale</a></li>
              <li><a href="#" className="hover:text-primary transition">Customer Service</a></li>
              <li><a href="#" className="hover:text-primary transition">Delivery Information</a></li>
              <li><a href="#" className="hover:text-primary transition">Payments</a></li>
              <li><a href="#" className="hover:text-primary transition">Saved Cards</a></li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">MY ACCOUNT</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#" className="hover:text-primary transition">My Account</a></li>
              <li><a href="#" className="hover:text-primary transition">My Shop</a></li>
              <li><a href="#" className="hover:text-primary transition">My Cart</a></li>
              <li><a href="#" className="hover:text-primary transition">Checkout</a></li>
              <li><a href="#" className="hover:text-primary transition">My Wishlist</a></li>
              <li><a href="#" className="hover:text-primary transition">Tracking Order</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">NEWSLETTER</h4>
            <p className="text-sm mb-4">
              Subscribe to our mailing list to get the new updates!
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary-dark transition"
              >
                SIGN UP
              </button>
            </form>
            
            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              <a href="#" className="bg-gray-800 p-2 rounded hover:bg-primary transition">
                <FiFacebook size={18} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded hover:bg-primary transition">
                <FiTwitter size={18} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded hover:bg-primary transition">
                <FiLinkedin size={18} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded hover:bg-primary transition">
                <FiInstagram size={18} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded hover:bg-primary transition">
                <FiYoutube size={18} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded hover:bg-primary transition">
                <FiRss size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            Kapee © 2025 by PresLayouts All Rights Reserved.
          </p>
          
          {/* Payment Methods */}
          <div className="flex gap-3 items-center">
            <span className="text-sm text-gray-400">We Accept:</span>
            <img src="https://img.icons8.com/color/32/000000/visa.png" alt="Visa" className="h-6" />
            <img src="https://img.icons8.com/color/32/000000/paypal.png" alt="PayPal" className="h-6" />
            <img src="https://img.icons8.com/color/32/000000/american-express.png" alt="Amex" className="h-6" />
            <img src="https://img.icons8.com/color/32/000000/mastercard.png" alt="Mastercard" className="h-6" />
            <img src="https://img.icons8.com/color/32/000000/maestro.png" alt="Maestro" className="h-6" />
            <img src="https://img.icons8.com/color/32/000000/discover.png" alt="Discover" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

