import React, { useState } from "react";
import { FiX, FiArrowLeft } from "react-icons/fi";
import * as authService from "../../services/authService";
import ResetPasswordModal from "./ResetPasswordModal";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  onBackToLogin,
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const [validatedEmail, setValidatedEmail] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      // Check if user exists by attempting to get profile
      const response = await fetch(`http://localhost:5000/api/auth/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // User exists, show reset password modal
        setValidatedEmail(email);
        setShowResetModal(true);
      } else {
        setError("No account found with this email address");
      }
    } catch (err: any) {
      setError("No account found with this email address");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSuccess = () => {
    setShowResetModal(false);
    onClose();
    // You can add a success message or redirect here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black z-10"
        >
          <FiX size={20} />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={onBackToLogin}
              className="text-gray-500 hover:text-black"
            >
              <FiArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-900">Reset Password</h2>
          </div>

          <form onSubmit={handleForgotPassword} className="space-y-4">
            {/* Instructions */}
            <p className="text-sm text-gray-600 mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            {/* Email Input */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 bg-white placeholder-gray-500"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {/* Removed success message since we show reset modal directly */}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>

            {/* Back to Login */}
            <div className="text-center">
              <button
                type="button"
                onClick={onBackToLogin}
                className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Reset Password Modal */}
      <ResetPasswordModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        email={validatedEmail}
        onSuccess={handleResetSuccess}
      />
    </div>
  );
};

export default ForgotPasswordModal;