
import { FiTruck, FiShield, FiHeart, FiAward, FiUsers, FiGlobe } from "react-icons/fi";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Kapee</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Your trusted destination for premium fashion and lifestyle products since 2019
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2019, Kapee began as a vision to make premium fashion accessible to everyone. 
                We started with a simple belief: quality fashion shouldn't be a luxury, but a right for all.
              </p>
              <p className="text-gray-600 mb-4">
                Today, we've grown into a comprehensive fashion destination offering everything from 
                trendy clothing and accessories to premium watches and jewelry. Our curated collection 
                features over 18 categories including Women's Fashion, Men's Clothing, Shoes, Bags, 
                and Accessories.
              </p>
              <p className="text-gray-600">
                With thousands of satisfied customers worldwide, we continue to expand our reach while 
                maintaining our commitment to quality, affordability, and exceptional customer service.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                alt="Kapee Store"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-8 bg-blue-50 rounded-lg">
              <FiHeart className="mx-auto text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide high-quality, fashionable products at affordable prices while delivering 
                exceptional customer service and creating a seamless shopping experience for our customers.
              </p>
            </div>
            <div className="text-center p-8 bg-purple-50 rounded-lg">
              <FiGlobe className="mx-auto text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To become the world's most trusted and preferred online fashion destination, 
                empowering people to express their unique style with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Kapee?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience possible
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <FiTruck className="mx-auto text-4xl text-blue-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">
                Free shipping on all orders over $50 worldwide
              </p>
            </div>
            <div className="text-center p-6">
              <FiShield className="mx-auto text-4xl text-green-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600 text-sm">
                30-day money-back guarantee on all products
              </p>
            </div>
            <div className="text-center p-6">
              <FiAward className="mx-auto text-4xl text-yellow-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">
                Carefully curated products from trusted brands
              </p>
            </div>
            <div className="text-center p-6">
              <FiUsers className="mx-auto text-4xl text-purple-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">
                Round-the-clock customer support for all your needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Product Range</h2>
            <p className="text-gray-600">
              Discover our extensive collection across multiple categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              "Women",
              "Men", 
              "Shoes",
              "Watches",
              "Bags & Backpacks",
              "Jewellery",
              "Accessories"
            ].map((category, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition">
                <h4 className="font-semibold text-sm">{category}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-sm opacity-90">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-90">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-sm opacity-90">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of satisfied customers and discover your new favorite fashion pieces today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Shop Now
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;