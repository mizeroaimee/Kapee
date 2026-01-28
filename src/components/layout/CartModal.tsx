import React, { useState } from "react";
import { FiX, FiTrash2 } from "react-icons/fi";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productPrice?: number;
  quantity?: number;
  selectedColor?: string;
  productImage?: string;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  productName = "",
  productPrice = 0,
  quantity: initialQuantity = 1,
  productImage = "",
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (productName) {
      return [
        {
          id: 1,
          name: productName,
          price: productPrice,
          quantity: initialQuantity,
          image: productImage || "https://via.placeholder.com/80",
        },
      ];
    }
    return [];
  });

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 200;
  const shippingProgress = (subtotal / freeShippingThreshold) * 100;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
      {/* Mobile overlay click to close */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />
      
      {/* Cart Sidebar */}
      <div className="relative bg-white h-full w-full sm:w-96 shadow-lg flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200"
          >
            <FiX size={24} />
          </button>
          <h2 className="text-lg font-bold flex-1 text-center">MY CART</h2>
          <div className="w-6" />
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 pb-4 border-b"
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-sm font-medium leading-tight break-words flex-1">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-orange-500 hover:text-orange-600 flex-shrink-0"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 text-sm"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <p className="text-sm font-semibold text-gray-900 mt-2">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t bg-white sticky bottom-0 p-4 space-y-3">
            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">SUBTOTAL:</span>
              <span className="text-lg font-bold text-gray-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {/* Free Shipping Progress */}
            {remainingForFreeShipping > 0 && (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full transition-all"
                    style={{ width: `${Math.min(shippingProgress, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-center text-gray-600">
                  Spend ${remainingForFreeShipping.toFixed(2)} to get free shipping
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="space-y-2 pt-2">
              <button className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition text-sm">
                VIEW CART
              </button>
              <button className="w-full bg-orange-500 text-white py-3 rounded font-semibold hover:bg-orange-600 transition text-sm">
                CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
