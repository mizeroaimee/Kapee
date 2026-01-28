import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

interface SubscriptionPopupProps {
  isOpen?: boolean;
  onClose: () => void;
}

const SubscriptionPopup: React.FC<SubscriptionPopupProps> = ({
  isOpen = true,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // Check if user has disabled this popup
    const hidePopup = localStorage.getItem("hideSubscriptionPopup");
    if (hidePopup === "true") {
      setIsAnimating(false);
    } else {
      // Small delay to ensure smooth animation
      const timer = setTimeout(() => {
        setIsAnimating(isOpen);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("hideSubscriptionPopup", "true");
    }
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simulate subscription
    setSubscribed(true);
    setTimeout(() => {
      if (dontShowAgain) {
        localStorage.setItem("hideSubscriptionPopup", "true");
      }
      setIsAnimating(false);
      setTimeout(() => {
        onClose();
      }, 300);
    }, 2000);
  };

  if (!isAnimating && !subscribed) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isAnimating ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      {/* Popup Container */}
      <div
        className={`fixed right-0 top-0 h-full max-w-md w-full transform transition-transform duration-500 ease-out z-50 ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Popup Content */}
        <div
          className="relative h-full bg-cover bg-center overflow-y-auto"
          style={{
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"><rect fill="%23999999" width="400" height="600"/><text x="50" y="300" font-size="20" fill="%23ffffff" text-anchor="middle">Woman Image</text></svg>')`,
            backgroundColor: "#999999",
          }}
        >
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10"
          >
            <FiX size={28} />
          </button>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center items-center p-6 sm:p-8 text-center">
            {!subscribed ? (
              <>
                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                  SIGN UP & GET 40% OFF
                </h2>

                {/* Description */}
                <p className="text-white text-sm sm:text-base mb-8 leading-relaxed max-w-sm">
                  Signup today for free and be the first to hear of special
                  promotions, new arrivals, designer and offers news.
                </p>

                {/* Email Form */}
                <form
                  onSubmit={handleSubscribe}
                  className="w-full max-w-sm mb-6"
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="flex-1 px-4 py-3 rounded text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-bold transition duration-200 whitespace-nowrap text-sm sm:text-base"
                    >
                      SIGN UP
                    </button>
                  </div>
                </form>

                {/* Checkbox */}
                <label className="flex items-center gap-3 text-white text-xs sm:text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dontShowAgain}
                    onChange={(e) => setDontShowAgain(e.target.checked)}
                    className="w-4 h-4 rounded border-white cursor-pointer"
                  />
                  <span>Don't show this popup again</span>
                </label>
              </>
            ) : (
              <>
                {/* Success Message */}
                <div className="text-center">
                  <div className="mb-4 text-5xl">✓</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Thank You!
                  </h3>
                  <p className="text-white text-sm sm:text-base">
                    Check your email for your 40% discount code.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPopup;
