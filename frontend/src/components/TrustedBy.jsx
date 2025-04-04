import react from 'react';
import { FaGoogle, FaApple, FaAmazon, FaFacebook, FaMicrosoft } from "react-icons/fa";
import { SiMeta } from "react-icons/si";

const TrustedBy = () => {
  return (
             <div className="mt-20 text-center bg-white/1 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl relative">
             <p className="text-white/60 mb-8 text-lg">Trusted by professionals from companies like</p>
             <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                 <div className="flex flex-col items-center text-white/70">
                   <FaGoogle className="text-3xl mb-2" />
                   <span className="font-medium">Google</span>
                 </div>
                 <div className="flex flex-col items-center text-white/70">
                   <FaMicrosoft className="text-3xl mb-2" />
                   <span className="font-medium">Microsoft</span>
                 </div>
                 <div className="flex flex-col items-center text-white/70">
                   <FaAmazon className="text-3xl mb-2" />
                   <span className="font-medium">Amazon</span>
                 </div>
                 <div className="flex flex-col items-center text-white/70">
                   <FaApple className="text-3xl mb-2" />
                   <span className="font-medium">Apple</span>
                 </div>
                 <div className="flex flex-col items-center text-white/70">
                   <SiMeta className="text-3xl mb-2" />
                   <span className="font-medium">Meta</span>
                 </div>
             </div>
   
           </div>
  );
}  

export default TrustedBy;