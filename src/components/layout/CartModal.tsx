import React, { useState } from "react";
import { FiX } from "react-icons/fi";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: number;
  quantity: number;
  selectedColor: string;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  productName,
  productPrice,
  quantity,
  selectedColor,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddToCart = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.address ||
      !formData.city
    ) {
      alert("Please fill all required fields!");
      return;
    }

    const cartItem = {
      productName,
      productPrice,
      quantity,
      selectedColor,
      ...formData,
    };

    console.log("Added to cart:", cartItem);
    alert(`${productName} added to cart successfully!`);
    setFormData({
      fullName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      cardNumber: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  const totalPrice = productPrice * quantity;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-6 border-b bg-white">
          <h2 className="text-2xl font-bold">Complete Your Order</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Order Summary */}
        <div className="p-6 border-b bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">{productName}</p>
              <p className="text-sm text-gray-600">
                Color: <span className="font-medium">{selectedColor}</span>
              </p>
              <p className="text-sm text-gray-600">
                Quantity: <span className="font-medium">{quantity}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-orange-500">${totalPrice.toFixed(2)}</p>
              <p className="text-sm text-gray-600">${productPrice} × {quantity}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="address"
                placeholder="Street Address *"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City *"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number (Optional)"
                value={formData.cardNumber}
                onChange={handleInputChange}
                maxLength={16}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
              <p className="text-sm text-gray-600">
                * Required fields. Your payment will be secured.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="sticky bottom-0 flex justify-between items-center p-6 border-t bg-white gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAddToCart}
            className="px-8 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition"
          >
            Add to Cart ${totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
