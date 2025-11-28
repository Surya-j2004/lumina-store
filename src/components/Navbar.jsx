import React from 'react';
import { ShoppingCart, Search, Sun, Moon } from 'lucide-react';

export const Navbar = ({ darkMode, setDarkMode, cartCount, setCartOpen, searchQuery, setSearchQuery }) => {
  return (
    <nav className={`sticky top-0 z-40 backdrop-blur-lg border-b transition-colors duration-300 ${darkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-lg shadow-indigo-500/30">
              <ShoppingCart size={24} />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500">
              Lumina
            </span>
          </div>

          
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
            <input 
              type="text"
              placeholder="Search collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-full outline-none border transition-all ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 focus:border-indigo-500 text-white placeholder-gray-500' 
                  : 'bg-gray-100 border-transparent focus:bg-white focus:border-indigo-500 text-gray-900'
              }`}
            />
          </div>

          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full transition-colors ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              <ShoppingCart size={24} className={darkMode ? 'text-gray-300' : 'text-gray-700'} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 h-5 w-5 bg-indigo-600 text-white text-xs font-bold flex items-center justify-center rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};