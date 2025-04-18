import { useRef } from "react";
import * as React from "react";

import { Link } from "react-router-dom";

import LoadingBar from "react-top-loading-bar";
import { AnimatedBackground } from 'animated-backgrounds';
import transparent from "../assets/aa.png";

import main from "../assets/main.jpg";

// TeamMember component with updated styling
function TeamMember({ imgSrc, name, title }) {
    return (
        <article className="flex flex-col bg-white/10 backdrop-blur-md rounded-xl overflow-hidden transition-transform hover:scale-105">
            <img
                loading="lazy"
                src={imgSrc}
                alt={name}
                className="w-full aspect-[4/3] object-cover"
            />
            <div className="p-6">
                <h2 className="text-xl font-bold text-white">
                    {name}
                </h2>
                <p className="mt-2 text-white/70">
                    {title}
                </p>
            </div>
        </article>
    );
}

const AboutUs = () => { 

        const teamMembers = [
          {
            imgSrc:
            main,
            name: "Hammad Malik",
            title: "Founder",
          },
          {
            imgSrc:
              "https://cdn.builder.io/api/v1/image/assets/TEMP/1aa484b096efd982c17829a912d74329ab81001c4ad1da0197618eb5ae4719c7?apiKey=5b7d47d822c447fbbf3f0faf7f51790e&",
            name: "Jeffrey Walters",
            title: "Chief Executive Officer",
          },
          {
            imgSrc:
              "https://cdn.builder.io/api/v1/image/assets/TEMP/a526d51b880f5455948aec3ff5cb0fca1f4b09c016232f7e8057df97104641dd?apiKey=5b7d47d822c447fbbf3f0faf7f51790e&",
            name: "Jason Reed",
            title: "Chief Technology Officer",
          },
          {
            imgSrc:
              "https://cdn.builder.io/api/v1/image/assets/TEMP/0ba683f74943142ccaf0fc039abf04fa47637ba466b6819719847d5b3f76f6c6?apiKey=5b7d47d822c447fbbf3f0faf7f51790e&",
            name: "Nellie Padilla",
            title: "Creative Director",
          },

        ];
      
        // Create team member elements
        const teamMemberElements = teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ));
      
        // Insert the CTA box at position 7 (which is the last element of the second row)
        teamMemberElements.splice(
          7,
          0,
        //   <aside
        //     key="cta"
        //     className="flex flex-col justify-center w-full sm:w-1/2 lg:w-1/4 bg-white rounded-lg text-center items-start py-[4] px-10"
        //   >
        //     {/* <h2 className="text-2xl font-bold text-gray-900 mb-3 text-left">
        //       Interested to join
        //       <br />
        //       our team?
        //     </h2> */}
        //     {/* <a
        //       href="#apply-now"
        //       className="text-indigo-600 font-medium hover:text-indigo-800 mt-4 inline-block text-left"
        //     >
        //       Apply now &rarr;
        //     </a> */}
        //   </aside>,
        );

    const ref = useRef(null);
    return (


        <div className="min-h-screen relative overflow-hidden">
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
            <main className="relative z-10 container mx-auto px-6 py-16">
                {/* About Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-white mb-6">About Us</h1>
                    <p className="text-white/70 max-w-2xl mx-auto text-lg">
                        We're a team of passionate individuals dedicated to revolutionizing 
                        the way people create and optimize their resumes using AI technology.
                    </p>
                </div>

                {/* Team Grid with Centered CTA */}
                <div className="flex flex-col items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 w-full">
                        {teamMemberElements}
                    </div>
                    
                    {/* Join Team CTA - Now centered below the grid */}
                    <aside className="max-w-md w-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-md rounded-xl p-8 text-white text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            Interested in joining our team?
                        </h2>
                        <a
                            href="#apply-now"
                            className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center group"
                        >
                            Apply now 
                            <svg 
                                className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M9 5l7 7-7 7" 
                                />
                            </svg>
                        </a>
                    </aside>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 mt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="border-t border-white/10 pt-8">
                        <div className="text-center text-white/60 text-sm">
                            © {new Date().getFullYear()} ResumeAI. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>



    );

};


export default AboutUs;