import Image from "next/image";
import { Button } from "../ui/button";

export const FreeTrial = () => {
  return (
    <section className="w-full p-20 pt-0 dark:bg-[#0F0F0F]">
      <div className="relative px-4 mx-20 rounded-lg border border-gray-500 overflow-hidden">
      {/* Background with image and gradient overlay */}
      <div className="absolute inset-0">
        {/* Background image */}
        <Image 
          src="/images/free-trial-bg.png" 
          alt="Free Trial Background" 
          fill 
          className="object-cover" 
        />
        {/* Gradient overlay đè lên image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/80 via-[#E50000]/60 to-[#E50000]/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between h-full min-h-[200px]">
        {/* Left side - Button */}
       

        {/* Right side - Text content */}
        <div className="flex-1 ml-8 md:ml-16 text-left">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Start your free trial today!
          </h2>
          
          <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-xl lg:max-w-2xl">
            This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.
          </p>
        </div>

         <div className="flex-shrink-0">
          <Button 
            size="lg"
            className="bg-[#E50000] hover:bg-[#CC0000] text-white font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start a Free Trial
          </Button>
        </div>
      </div>
    </div>
    </section>
  );
};