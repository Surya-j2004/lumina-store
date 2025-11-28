import React, { useState, useEffect } from 'react';
import { X, Star, ArrowRight, Clock } from 'lucide-react';

export const QuickViewModal = ({ product, isOpen, onClose, onAddToCart, recentlyViewed, darkMode, onSelectProduct }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  
  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) setSelectedColor(product.colors[0]);
      if (product.sizes && product.sizes.length > 0) setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl animate-scale-in flex flex-col md:flex-row max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-black/10 rounded-full z-10 transition-colors dark:text-white">
          <X size={20} />
        </button>
        
        
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 dark:bg-gray-700 relative">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        
        
        <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
          <span className="text-indigo-600 font-bold text-sm tracking-wide uppercase mb-2">{product.category}</span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h2>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">{product.reviews} verified reviews</span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {product.description}
          </p>

          
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <span className="text-sm font-bold uppercase tracking-wider opacity-70 mb-3 block">Select Color</span>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color ? 'border-indigo-600 scale-110' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

         
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <span className="text-sm font-bold uppercase tracking-wider opacity-70 mb-3 block">Select Size</span>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                      selectedSize === size 
                        ? 'bg-indigo-600 text-white border-indigo-600' 
                        : 'bg-transparent border-gray-300 dark:border-gray-600 hover:border-indigo-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
            <button 
              onClick={() => { 
                onAddToCart({ ...product, selectedColor, selectedSize }); 
                onClose(); 
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Add to Cart <ArrowRight size={18} />
            </button>
          </div>

         
          {recentlyViewed.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm font-bold opacity-60 mb-4 uppercase">
                <Clock size={16} /> Recently Viewed
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {recentlyViewed.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => onSelectProduct(item)}
                    className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-indigo-500 transition-all"
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};