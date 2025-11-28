import React, { useState } from 'react';
import { X, Truck, ShoppingCart, Trash2, Tag } from 'lucide-react';

export const CartSidebar = ({ isOpen, onClose, cart, setCart, darkMode, onCheckout }) => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  if (!isOpen) return null;

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const freeShippingThreshold = 500;
  const progress = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
  const finalTotal = cartTotal - (cartTotal * discount);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "LUMINA10") {
      setDiscount(0.10);
      setPromoError("");
    } else {
      setDiscount(0);
      setPromoError("Invalid code");
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-full max-w-md shadow-2xl transform transition-transform duration-300 animate-slide-in flex flex-col ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        
        
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Your Cart <span className="text-sm font-normal text-gray-500">({cart.length} items)</span>
            </h2>
            <button onClick={onClose} className={`p-2 rounded-full hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'text-gray-500'}`}>
              <X size={24} />
            </button>
          </div>

          
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-indigo-50'}`}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-600 text-indigo-400' : 'bg-white text-indigo-600'}`}>
                <Truck size={18} />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-indigo-900'}`}>
                  {progress === 100 ? "You've unlocked free shipping!" : `Add $${(freeShippingThreshold - cartTotal).toFixed(2)} for Free Shipping`}
                </p>
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <ShoppingCart size={64} />
              <p className="text-lg font-medium">Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</h3>
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.selectedColor && `Color: ${item.selectedColor} `}
                    {item.selectedSize && `Size: ${item.selectedSize}`}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center rounded-lg border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <button 
                        onClick={() => {
                          const newCart = cart.map(i => i.id === item.id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i);
                          setCart(newCart);
                        }}
                        className={`px-3 py-1 ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-600'}`}
                      >-</button>
                      <span className={`px-2 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.quantity}</span>
                      <button 
                         onClick={() => {
                          const newCart = cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
                          setCart(newCart);
                        }}
                        className={`px-3 py-1 ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-600'}`}
                      >+</button>
                    </div>
                    <button onClick={() => setCart(cart.filter(i => i.id !== item.id))} className="text-red-500 hover:text-red-600 p-2"><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        
        <div className={`p-6 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-white'}`}>
          
          
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                placeholder="Promo Code (LUMINA10)" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none text-sm transition-all ${
                  promoError ? 'border-red-500 focus:ring-red-200' : 
                  darkMode ? 'bg-gray-700 border-gray-600 focus:border-indigo-500' : 'bg-gray-50 border-gray-200 focus:border-indigo-500'
                }`}
              />
            </div>
            <button 
              onClick={handleApplyPromo}
              className="px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
            >
              Apply
            </button>
          </div>
          {promoError && <p className="text-red-500 text-xs mb-4 -mt-4">{promoError}</p>}
          {discount > 0 && <p className="text-green-500 text-xs mb-4 -mt-4">Discount Applied: 10% OFF</p>}

          <div className="flex justify-between items-center mb-4">
            <span className={`text-base font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Subtotal</span>
            <div className="text-right">
              {discount > 0 && <span className="text-sm text-gray-400 line-through mr-2">${cartTotal.toFixed(2)}</span>}
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={() => onCheckout(finalTotal)}
            disabled={cart.length === 0}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-transform active:scale-95 shadow-xl shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
};