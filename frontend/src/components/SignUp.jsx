import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import LoadingBar from "react-top-loading-bar";


const Signup = () => {


  const navigate = useNavigate();

  const ref = useRef(null); // Create a reference for the loading bar

  const Loginhere = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    ref.current.continuousStart();
    setTimeout(() => {
      ref.current.complete();
      navigate("/");
    }, 1000);
  };
  

  return (
    <div className="font-[Roboto] max-sm:px-4">

      <LoadingBar color="#00008B" ref={ref} height={5} />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <form>
              <div className="mb-12">
                <h3 className="text-gray-800 text-3xl font-extrabold text-center">Sign up</h3>
                <p className="text-sm mt-4 text-gray-800 text-center">
                  Already have an account?{" "}
                  <button
                    onClick={Loginhere}
                    className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                  >
                    Login Here
                  </button>
                </p>
              </div>

              <div>
                <label className="text-gray-800 text-xs block mb-2">Full Name</label>
                <div className="relative flex items-center">
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="text-gray-800 text-xs block mb-2">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="text-gray-800 text-xs block mb-2">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                    placeholder="Create a password"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    I agree to the terms and conditions
                  </label>
                </div>
              </div>

              <div className="mt-12">
                <button
                  type="button"
                  className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign up
                </button>
              </div>

              <div className="my-4 flex items-center gap-4">
                <hr className="w-full border-gray-300" />
                <hr className="w-full border-gray-300" />
              </div>

              
            </form>
          </div>

          <div className="w-full h-full flex items-center bg-[#000842] rounded-xl p-8">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="w-full aspect-[12/12] object-contain"
              alt="signup-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
