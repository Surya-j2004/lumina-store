import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = ({ darkMode }) => {
  
  
  const scrollToShop = () => {
    const section = document.getElementById('shop-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden mb-12 group">
     
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Interior" 
          className="w-full h-full object-cover opacity-90 transition-transform duration-[20s] group-hover:scale-105"
        />
        
        <div className={`absolute inset-0 bg-gradient-to-r ${darkMode ? 'from-gray-900/90 via-gray-900/60 to-transparent' : 'from-white/90 via-white/40 to-transparent'}`} />
      </div>

      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 animate-fade-in-up">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-indigo-600 text-white mb-2 shadow-lg shadow-indigo-500/30">
            New Collection 2025
          </span>
          <h1 className={`text-5xl md:text-7xl font-bold leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Elevate Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 italic pr-2">
              Lifestyle.
            </span>
          </h1>
          <p className={`text-lg md:text-xl max-w-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover our curated selection of premium electronics and minimalist furniture designed for the modern creator.
          </p>
          <div className="flex gap-4 pt-4">
            
            <button 
              onClick={scrollToShop}
              className="px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg shadow-indigo-500/30 flex items-center gap-2"
            >
              Shop Now <ArrowRight size={20} />
            </button>
            
           
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;