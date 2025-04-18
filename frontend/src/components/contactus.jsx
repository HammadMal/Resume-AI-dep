import React, { useRef } from "react";
import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { AnimatedBackground } from 'animated-backgrounds';
import transparent from "../assets/aa.png";
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

const ContactUs = () => {
    const ref = useRef(null);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        ref.current?.continuousStart();
        
        emailjs
            .sendForm(
                "service_rg93b57",
                "template_u0pz4uc",
                form.current,
                "-YI9gtyMonMW4acLf"
            )
            .then(
                (result) => {
                    toast.success('Message sent successfully!', {
                        duration: 4000,
                        position: 'top-center',
                        style: {
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#fff',
                        },
                    });
                    e.target.reset();
                },
                (error) => {
                    toast.error('Failed to send message. Please try again.', {
                        duration: 4000,
                        position: 'top-center',
                        style: {
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#fff',
                        },
                    });
                }
            )
            .finally(() => {
                ref.current?.complete();
            });
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
                </div>
            </header>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <div className="w-full max-w-md">
                    <div className="bg-white/1 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl">
                        <h2 className="text-3xl font-bold text-white text-center mb-8">Contact Us</h2>

                        <form ref={form} onSubmit={sendEmail} className="space-y-6">
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    name="from_name"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    name="reply_to"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter subject"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Message</label>
                                <textarea
                                    name="message"
                                    rows="5"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    placeholder="Enter your message"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all duration-300 font-medium shadow-lg"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
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

export default ContactUs;