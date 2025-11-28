import React from 'react';
import { Star, Heart, Plus } from 'lucide-react';

export const ProductCard = ({ product, toggleWishlist, wishlist, addToCart, setSelectedProduct, darkMode, isLoading }) => {
  
  
  if (isLoading) {
    return (
      <div className={`rounded-3xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white shadow-xl shadow-gray-100'} p-0 h-full flex flex-col`}>
        <div className={`aspect-[4/5] w-full animate-pulse ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        <div className="p-5 space-y-3 flex-1">
          <div className={`h-4 w-1/3 rounded animate-pulse ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className={`h-6 w-3/4 rounded animate-pulse ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className={`h-4 w-1/2 rounded animate-pulse ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className={`h-10 w-full rounded-xl mt-4 animate-pulse ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        </div>
      </div>
    );
  }

  
  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className={`group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full flex flex-col ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-xl shadow-gray-200/50 border border-white'
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        <button 
          onClick={(e) => toggleWishlist(e, product)}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
            wishlist.includes(product.id) ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:bg-white hover:scale-110'
          }`}
        >
          <Heart size={18} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
        </button>
        <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button 
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className="w-full bg-white text-gray-900 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <Plus size={18} /> Add to Cart
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-bold text-indigo-500 mb-1 uppercase tracking-wider">{product.category}</p>
        <div className="flex justify-between items-start mb-2">
          <h3 className={`font-bold text-lg leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</h3>
          <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>${product.price}</span>
        </div>
        <div className="flex items-center gap-1 mt-auto">
          <Star size={14} className="text-yellow-400" fill="currentColor" />
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{product.rating} ({product.reviews})</span>
        </div>
      </div>
    </div>
  );
};