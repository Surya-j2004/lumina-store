import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';


import { MOCK_PRODUCTS } from './data/products';
import { useLocalStorage } from './hooks/useLocalStorage';


import Hero from './components/Hero'; 
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Toast } from './components/Toast';

export default function App() {
  
  const [activeCategories, setActiveCategories] = useState(["All"]); 
  const [priceRange, setPriceRange] = useState(600); 
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [isLoading, setIsLoading] = useState(true); 
  
  
  const [cart, setCart] = useLocalStorage("lumina-cart", []);
  const [wishlist, setWishlist] = useLocalStorage("lumina-wishlist", []);
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage("lumina-recent", []);
  const [darkMode, setDarkMode] = useLocalStorage("lumina-theme", false);
  
  
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [toast, setToast] = useState({ show: false, message: "" });

  
  
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, []);

  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

 

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    
    
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 5);
    });
  };

  const toggleCategory = (cat) => {
    if (cat === "All") {
      setActiveCategories(["All"]);
    } else {
      setActiveCategories(prev => {
        const withoutAll = prev.filter(c => c !== "All");
        if (prev.includes(cat)) {
          
          const newCats = withoutAll.filter(c => c !== cat);
          return newCats.length === 0 ? ["All"] : newCats;
        } else {
          
          return [...withoutAll, cat];
        }
      });
    }
  };

  const addToCart = (product) => {
    setCart(prev => {
      
      const cartItemId = `${product.id}-${product.selectedColor || ''}-${product.selectedSize || ''}`;
      const existing = prev.find(item => item.cartItemId === cartItemId);
      
      if (existing) {
        return prev.map(item => item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, cartItemId }];
    });
    setCartOpen(true);
    showToast(`Added ${product.name} to cart`);
  };

  const handleCheckoutComplete = () => {
    setCart([]); 
  };

  
  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS;
    
   
    if (!activeCategories.includes("All")) {
      result = result.filter(p => activeCategories.includes(p.category));
    }
    
    
    result = result.filter(p => p.price <= priceRange);

    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    
   
    if (sortBy === "lowToHigh") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "highToLow") result = [...result].sort((a, b) => b.price - a.price);
    
    return result;
  }, [activeCategories, priceRange, searchQuery, sortBy]);

  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
     
      <Toast isVisible={toast.show} message={toast.message} />

      <QuickViewModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        recentlyViewed={recentlyViewed.filter(p => !selectedProduct || p.id !== selectedProduct.id)}
        darkMode={darkMode}
        onSelectProduct={handleProductSelect}
      />

      <CheckoutModal 
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        total={cart.reduce((a, c) => a + (c.price * c.quantity), 0)}
        onCheckoutComplete={handleCheckoutComplete}
        darkMode={darkMode}
      />

      
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        cartCount={cart.reduce((a,c) => a + c.quantity, 0)}
        setCartOpen={setCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      
      <Hero darkMode={darkMode} />

      
      
      <main id="shop-section" className="max-w-7xl mx-auto px-4 pb-20 sm:px-6 lg:px-8">
        
       
        <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6 p-6 rounded-3xl ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white shadow-lg shadow-gray-100'}`}>
          
          
          <div className="space-y-3 w-full lg:w-auto">
            <span className="text-xs font-bold uppercase tracking-wider opacity-60">Categories</span>
            <div className="flex gap-2 flex-wrap">
              {["All", "Electronics", "Home", "Furniture"].map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all border ${
                    activeCategories.includes(cat)
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-transparent border-gray-200 dark:border-gray-700 hover:border-indigo-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          
          <div className="space-y-3 w-full lg:w-64">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider opacity-60">
              <span>Max Price</span>
              <span>${priceRange}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="600" 
              value={priceRange} 
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          
          <div className="space-y-3 w-full lg:w-48">
            <span className="text-xs font-bold uppercase tracking-wider opacity-60">Sort By</span>
            <div className="relative">
               <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`w-full appearance-none pl-4 pr-10 py-2.5 rounded-xl text-sm font-medium outline-none border cursor-pointer ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-gray-50 border-gray-200 text-gray-700'
                  }`}
                >
                  <option value="featured">Featured</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading 
            ? [...Array(8)].map((_, i) => <ProductCard key={i} isLoading={true} darkMode={darkMode} />) 
            : filteredProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  toggleWishlist={(e) => {
                    e.stopPropagation();
                    const exists = wishlist.find(id => id === product.id);
                    setWishlist(prev => exists ? prev.filter(id => id !== product.id) : [...prev, product.id]);
                  }}
                  wishlist={wishlist}
                  addToCart={addToCart}
                  setSelectedProduct={handleProductSelect}
                  darkMode={darkMode}
                />
              ))
          }
          
          
          {!isLoading && filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-20 opacity-50 flex flex-col items-center">
              <SlidersHorizontal size={48} className="mb-4" />
              <p className="text-xl font-medium">No products match your filters</p>
              <button 
                onClick={() => { setActiveCategories(["All"]); setPriceRange(600); setSearchQuery(""); }}
                className="mt-4 text-indigo-500 font-bold hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      
      <CartSidebar 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cart={cart} 
        setCart={setCart} 
        darkMode={darkMode}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />
    </div>
  );
}