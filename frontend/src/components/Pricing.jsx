const PricingSection = () => {
    const plans = [
      {
        name: "Enterprise",
        desc: "Perfect for larger companies or agencies with extensive hiring needs.",
        price: 32,
        isMostPop: true,
        features: [
          "Advanced AI-powered resume analysis",
          "Unlimited resume optimizations",
          "Job description matching",
          "ATS compatibility checker",
          "Priority support",
          "Team collaboration tools",
          "Custom branding options",
        ],
      },
      {
        name: "Startup",
        desc: "Ideal for individuals or small teams focused on optimizing their job search.",
        price: 12,
        isMostPop: false,
        features: [
          "AI-powered resume analysis",
          "10 resume optimizations/month",
          "Job description matching",
          "ATS compatibility checker",
          "Email support",
          "Basic analytics",
          "PDF export options",
        ],
      },
    ];
  
    return (
      <section id="pricing" className="relative py-20">
        {/* Background gradient */}
        {/* <div
          className="absolute top-0 w-full h-full "
        //   style={{
        //     background:
        //       "linear-gradient(152.92deg, rgba(59, 130, 246, 0.2) 4.54%, rgba(147, 51, 234, 0.17) 34.2%, rgba(59, 130, 246, 0.1) 77.55%)",
        //     opacity: "0",
        //   }}
        ></div> */}
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 bg-white/1 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl relative">
          <div className="max-w-xl mx-auto space-y-4 text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm">
              Pricing Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Choose the Perfect Plan
            </h2>
            <p className="text-white/70">
              Select the plan that best suits your needs. Upgrade or downgrade at any time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {plans.map((item, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col rounded-2xl transition-all ${
                  item.isMostPop 
                    ? "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl" 
                    : "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10"
                }`}
              >
                {item.isMostPop && (
                  <div className="absolute -top-4 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8 space-y-4 border-b border-white/10">
                  <h3 className="text-2xl font-semibold text-white">{item.name}</h3>
                  <div className="text-white text-3xl font-bold">
                    ${item.price}
                    <span className="text-lg text-white/70 font-normal ml-1">/mo</span>
                  </div>
                  <p className="text-white/70">{item.desc}</p>
                  <button className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
                    item.isMostPop 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg" 
                      : "bg-white/10 hover:bg-white/20"
                  }`}>
                    Get Started
                  </button>
                </div>
                
                <div className="p-8 space-y-4">
                  <h4 className="text-white font-semibold">Features</h4>
                  <ul className="space-y-3">
                    {item.features.map((featureItem, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <span className="text-white/80">{featureItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default PricingSection;