import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { AnimatedBackground } from 'animated-backgrounds';
import transparent from "../assets/aa.png";
import { Toaster, toast } from "react-hot-toast";
import CreditCard from './CreditCard';

import Mastercard from "../assets/mastercard.svg";
import Visa from "../assets/visa.svg";

const PricingPage = () => {
    const ref = useRef(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });

    const [errors, setErrors] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });

    const [isCardFlipped, setIsCardFlipped] = useState(false);

    // Format card number with spaces
    const formatCardNumber = (value) => {
        if (!value) return '';
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        
        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    // Format expiry date
    const formatExpiryDate = (value) => {
        if (!value) return '';
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        
        if (v.length > 2) {
            return v.slice(0, 2) + '/' + v.slice(2, 4);
        }
        
        return v;
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        
        // Apply formatting based on field type
        if (name === 'number') {
            formattedValue = formatCardNumber(value);
        } else if (name === 'expiry') {
            formattedValue = formatExpiryDate(value);
        } else if (name === 'cvv') {
            formattedValue = value.replace(/\D/g, '').slice(0, 3);
        }

        setCardDetails({
            ...cardDetails,
            [name]: formattedValue
        });

        // Clear error when typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    // Validate form fields
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Card number validation - should be 16 digits (without spaces)
        if (!cardDetails.number.trim()) {
            newErrors.number = 'Card number is required';
            isValid = false;
        } else if (cardDetails.number.replace(/\s/g, '').length < 16) {
            newErrors.number = 'Card number should be 16 digits';
            isValid = false;
        }

        // Name validation
        if (!cardDetails.name.trim()) {
            newErrors.name = 'Cardholder name is required';
            isValid = false;
        }

        // Expiry date validation
        if (!cardDetails.expiry.trim()) {
            newErrors.expiry = 'Expiry date is required';
            isValid = false;
        } else {
            const [month, year] = cardDetails.expiry.split('/');
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100;
            const currentMonth = currentDate.getMonth() + 1;

            if (!month || !year || month > 12 || month < 1) {
                newErrors.expiry = 'Invalid expiry date';
                isValid = false;
            } else if (
                parseInt(year) < currentYear || 
                (parseInt(year) === currentYear && parseInt(month) < currentMonth)
            ) {
                newErrors.expiry = 'Card has expired';
                isValid = false;
            }
        }

        // CVV validation
        if (!cardDetails.cvv.trim()) {
            newErrors.cvv = 'CVV is required';
            isValid = false;
        } else if (cardDetails.cvv.length < 3) {
            newErrors.cvv = 'CVV should be 3 digits';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            setLoading(true);
            ref.current.continuousStart();
            
            // Simulate payment processing
            setTimeout(() => {
                ref.current.complete();
                setLoading(false);
                toast.success("Payment successful!");
                
                // Redirect after payment (you can change this to your desired route)
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <Toaster />
            {/* Loading Bar */}
            <LoadingBar color="#3F7D58" ref={ref} height={3} />

            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <AnimatedBackground 
                    animationName="auroraBorealis" 
                    blendMode="normal" 
                    style={{ opacity: 1 }} 
                />
            </div>

            {/* Overlay gradient */}
            <div className="fixed inset-0 bg-gradient-to-b from-black/50 to-blue-900/50 z-1"></div>

            {/* Header/Navigation */}
            <header className="relative z-10 py-4 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex justify-between items-center mt-10">
                    <Link to="/" className="flex items-center space-x-2">
                        <div>
                            <img src={transparent} alt="Logo" className="w-10 h-10" />
                        </div>
                        <span className="text-white font-bold text-xl">ResumeAI</span>
                    </Link>
{/*                     
                    <div className="hidden md:block">
                        <ul className="flex space-x-8">
                            <li><a href="/" className="text-white/80 hover:text-white transition-colors">Home</a></li>
                            <li><a href="/features" className="text-white/80 hover:text-white transition-colors">Features</a></li>
                            <li><a href="/pricing" className="text-white font-medium">Pricing</a></li>
                            <li><a href="/contact" className="text-white/80 hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div> */}
                </div>
            </header>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Premium Plan</h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">
                        Unlock the full power of ResumeAI with our Premium Plan. 
                        Complete payment to access all features and start building better resumes today.
                    </p>
                </div>
                
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="col-span-1 md:col-span-2">
                                <h2 className="text-2xl font-bold text-white mb-4">Premium Features</h2>
                                <ul className="space-y-3 text-white/80">
                                    <li className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        AI-Powered Resume Analysis
                                    </li>
                                    <li className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Unlimited Resume Generations
                                    </li>
                                    <li className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Job description matching
                                                                            </li>
                                    <li className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        ATS compatibility checker
                                    </li>
                                    <li className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        24/7 Customer Support
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
                                <div className="text-gray-200 text-sm uppercase tracking-wide">Premium Plan</div>
                                <div className="flex items-center justify-center mt-2">
                                    <span className="text-4xl font-bold text-white">$10</span>
                                    <span className="text-white/70 ml-2">/ month</span>
                                </div>
                                <div className="text-white/60 text-sm mt-2">Billed monthly</div>
                                <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg text-white text-sm font-medium py-1 px-3 mt-4 inline-block">
                                    Most Popular
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-8">
                        <CreditCard 
                            cardNumber={cardDetails.number}
                            cardName={cardDetails.name}
                            expiryDate={cardDetails.expiry}
                            cvv={cardDetails.cvv}
                            flipped={isCardFlipped}
                        />
                        
                        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                            <div className="space-y-1">
                                <input
                                    type="text"
                                    name="number"
                                    placeholder="Card Number"
                                    value={cardDetails.number}
                                    onChange={handleChange}
                                    className={`w-full bg-white/5 border ${errors.number ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    maxLength="19"
                                />
                                {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
                            </div>
                            
                            <div className="space-y-1">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Cardholder Name"
                                    value={cardDetails.name}
                                    onChange={handleChange}
                                    className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        name="expiry"
                                        placeholder="MM/YY"
                                        value={cardDetails.expiry}
                                        onChange={handleChange}
                                        className={`w-full bg-white/5 border ${errors.expiry ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                        maxLength="5"
                                    />
                                    {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                                </div>
                                
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        name="cvv"
                                        placeholder="CVV"
                                        value={cardDetails.cvv}
                                        onFocus={() => setIsCardFlipped(true)}
                                        onBlur={() => setIsCardFlipped(false)}
                                        onChange={handleChange}
                                        className={`w-full bg-white/5 border ${errors.cvv ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                        maxLength="3"
                                    />
                                    {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                                </div>
                            </div>
                            
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    'Pay $10 and Upgrade Now'
                                )}
                            </button>
                            
                            <div className="flex items-center justify-center space-x-4 mt-4">
                                <img src={Visa} alt="Visa" className="h-8" />
                                <img src={Mastercard} alt="Mastercard" className="h-8" />
                            </div>
                            
                            <p className="text-center text-white/50 text-xs mt-4">
                                Your payment information is secure and encrypted
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 mt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="border-t border-white/10 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
                            <div>© {new Date().getFullYear()} ResumeAI. All rights reserved.</div>
                            <div className="flex space-x-6 mt-4 md:mt-0">
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PricingPage;