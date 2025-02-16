import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="font-[Roboto] max-sm:px-4">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Enter your email address to reset your password.
          </p>
          <form>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Submit
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/" className="text-blue-600 text-sm hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
