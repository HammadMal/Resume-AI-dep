import React, {useRef} from 'react';
import ReactPlayer from 'react-player'



import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 

import LoadingBar from "react-top-loading-bar";
import { AnimatedBackground } from 'animated-backgrounds';

import transparent from "../assets/aa.png";


const Demo = () => {  
    
    const ref = useRef(null); // Create a reference for the loading bar


return (

                    <div className="min-h-screen relative overflow-hidden">

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

                <div className='relative z-10 flex flex-col items-center justify-center min-h-screen px-4'>
    <div className="w-full max-w-4xl">
        <div className="bg-white/1 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Demo Video</h2>
            <div className="video-wrapper aspect-video relative w-full overflow-hidden rounded-lg">
                <ReactPlayer
                    url='https://www.youtube.com/watch?v=LXb3EKWsInQ'
                    width="100%"
                    height="100%"
                    controls={true}
                    playing={false}
                    volume={0.8}
                    pip={true}
                    stopOnUnmount={true}
                    light={true}
                    playsinline={true}
                    config={{
                        youtube: {
                            playerVars: {
                                showinfo: 1,
                                modestbranding: 1,
                                rel: 0,
                                autoplay: 0,
                                iv_load_policy: 3,
                                playsinline: 1
                            }
                        }
                    }}
                    className="absolute top-0 left-0"
                />
            </div>
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



)

};

export default Demo;