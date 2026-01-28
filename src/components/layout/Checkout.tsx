import React, { useState } from "react";
import { FiX } from "react-icons/fi";

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: number;
  quantity: number;
  selectedColor: string;
  productId: number;
}

interface FormData {
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  email: string;
  orderNotes: string;
  shipDifferent: boolean;
}

const Checkout: React.FC<CheckoutProps> = ({
  isOpen,
  onClose,
  productName,
  productPrice,
  quantity,
  selectedColor,
  productId,
}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
    email: "",
    orderNotes: "",
    shipDifferent: false,
  });

  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = (): boolean => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode ||
      !formData.phone ||
      !formData.email ||
      !formData.country
    ) {
      alert("Please fill all required fields!");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address!");
      return false;
    }

    const phoneRegex = /^[0-9]{10,}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      alert("Please enter a valid phone number!");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;

    const newOrderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    setOrderId(newOrderId);

    const orderData = {
      orderId: newOrderId,
      productId,
      productName,
      price: productPrice,
      quantity,
      color: selectedColor,
      totalPrice: productPrice * quantity,
      customerInfo: formData,
      orderDate: new Date().toISOString(),
    };

    console.log("Order placed:", orderData);
    localStorage.setItem(`order-${newOrderId}`, JSON.stringify(orderData));
    setOrderCompleted(true);
  };

  const totalPrice = productPrice * quantity;
  const shippingCost = 5.0;
  const subtotal = totalPrice;
  const grandTotal = (subtotal + shippingCost).toFixed(2);

  if (!isOpen) return null;

  // Order Complete View
  if (orderCompleted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-2 sm:p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-4 sm:my-8">
          {/* Header */}
          <div className="flex justify-between items-center p-4 sm:p-6 border-b bg-gray-50">
            <h1 className="text-xl sm:text-2xl font-bold">Order Complete</h1>
            <button onClick={onClose} className="text-gray-500 hover:text-black flex-shrink-0">
              <FiX size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-8 text-center space-y-4 sm:space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h2>
              <p className="text-gray-600 text-lg">Your order has been placed successfully</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">ORDER NUMBER</p>
              <p className="text-2xl font-bold text-gray-900">{orderId}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Product:</span>
                  <span className="font-medium">{productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Color:</span>
                  <span className="font-medium">{selectedColor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-bold text-lg text-orange-600">${grandTotal}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              A confirmation email has been sent to <span className="font-semibold">{formData.email}</span>
            </p>

            <button
              onClick={onClose}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded w-full transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl my-4 sm:my-8">
        {/* Header with Breadcrumb */}
        <div className="bg-gray-100 border-b p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-3 sm:mb-4">
            <div className="text-xs sm:text-sm text-gray-600 truncate">
              Shopping Cart <span className="mx-1">›</span> <span className="text-blue-600 font-semibold">Checkout</span> <span className="mx-1">›</span> Order Complete
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-black flex-shrink-0 self-start sm:self-auto">
              <FiX size={18} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Success Messages */}
          <div className="space-y-2 sm:space-y-3">
            <div className="bg-green-50 border border-green-200 rounded p-2 sm:p-3 text-xs sm:text-sm text-green-800">
              <span className="font-semibold">✓ "{productName}" has been added to your cart.</span>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-2 sm:p-3 text-xs sm:text-sm text-blue-800">
              <span className="font-semibold">ℹ Returning customer? <a href="#" className="underline">Click here to login</a></span>
            </div>
            <div className="bg-red-50 border border-red-200 rounded p-2 sm:p-3 text-xs sm:text-sm text-red-800">
              <span className="font-semibold">⚠ Have a coupon? <a href="#" className="underline">Click here to enter your code</a></span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 p-4 sm:p-8">
          {/* Billing Details Form - Left Column (2/3) */}
          <div className="lg:col-span-2">
            <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">Billing details</h2>

            <form className="space-y-4 sm:space-y-6">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Company name <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Country/Region <span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                >
                  <option value="">Select a country...</option>
                  <option value="USA">United States (US)</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="India">India</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Street address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="House number and street name"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Apartment */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Apartment, suite, etc. <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Town/City */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* State & ZIP */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                  >
                    <option value="">Select a state...</option>
                    <option value="California">California</option>
                    <option value="Texas">Texas</option>
                    <option value="Florida">Florida</option>
                    <option value="NewYork">New York</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Ship to different address */}
              <div className="flex items-center gap-2 py-4 border-t border-b">
                <input
                  type="checkbox"
                  name="shipDifferent"
                  checked={formData.shipDifferent}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <label className="text-sm font-semibold text-gray-900">
                  Ship to a different address?
                </label>
              </div>

              {/* Order Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Order notes <span className="text-gray-500">(optional)</span>
                </label>
                <textarea
                  name="orderNotes"
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 h-24 resize-none"
                />
              </div>
            </form>
          </div>

          {/* Order Summary - Right Column (1/3) */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-20">
              <h3 className="text-xl font-bold mb-6">Your order</h3>

              {/* Product Table */}
              <div className="mb-6 pb-6 border-b">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-600 font-semibold border-b">
                      <th className="text-left pb-3">PRODUCT</th>
                      <th className="text-right pb-3">SUBTOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b py-3">
                      <td className="py-3">
                        <div className="font-medium text-gray-900">{productName}</div>
                        <div className="text-xs text-gray-600">Color: {selectedColor}</div>
                        <div className="text-xs text-gray-600">Shirt × {quantity}</div>
                      </td>
                      <td className="text-right font-semibold text-gray-900">${subtotal.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">Flat rate: ${shippingCost.toFixed(2)}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between mb-6 text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-600">${grandTotal}</span>
              </div>

              {/* Payment Methods Notice */}
              <div className="bg-red-50 border border-red-200 rounded p-4 mb-6 text-sm text-red-800">
                <p className="font-semibold mb-1">⚠ Payment Methods</p>
                <p>
                  Sorry, it seems that there are no available payment methods. Please contact us if you require assistance or
                  wish to make alternative arrangements.
                </p>
              </div>

              {/* Privacy Notice */}
              <p className="text-xs text-gray-600 mb-6">
                Your personal data will be used to process your order, support your experience throughout this website, and for other
                purposes described in our privacy policy.
              </p>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded transition"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
