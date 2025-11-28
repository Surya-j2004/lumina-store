import React, { useState, useEffect } from 'react';
import { X, CheckCircle, CreditCard, MapPin, Loader, ShieldCheck } from 'lucide-react';

export const CheckoutModal = ({ isOpen, onClose, cart, total, onCheckoutComplete, darkMode }) => {
  const [step, setStep] = useState('details'); 
  const [formData, setFormData] = useState({
    name: '', email: '', address: '', city: '', zip: '', cardNumber: '', expiry: '', cvc: ''
  });

  useEffect(() => {
    if (isOpen) setStep('details');
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      onCheckoutComplete(); 
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={step !== 'processing' ? onClose : undefined} />
      
      
      <div className={`relative w-full max-w-2xl rounded-3xl shadow-2xl animate-scale-in flex flex-col max-h-[90vh] ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        
        {step !== 'processing' && (
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 z-10 transition-colors">
            <X size={20} />
          </button>
        )}

        {step === 'details' && (
          
          <div className="flex flex-col flex-1 min-h-0">
            
           
            <div className={`p-6 border-b flex-none ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <h2 className="text-2xl font-bold">Checkout</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Complete your purchase securely</p>
            </div>
            
           
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                <div className={`p-4 rounded-xl flex justify-between items-center ${darkMode ? 'bg-indigo-900/30 border border-indigo-500/30' : 'bg-indigo-50 border border-indigo-100'}`}>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wide opacity-70">Total Amount</span>
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">${total.toFixed(2)}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-bold uppercase tracking-wide opacity-70">Items</span>
                    <span className="font-medium">{cart.length} Products</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2 text-lg">
                    <MapPin size={20} className="text-indigo-500" /> Shipping Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium opacity-70 ml-1">Full Name</label>
                      <input required name="name" placeholder="John Doe" onChange={handleChange} className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium opacity-70 ml-1">Email</label>
                      <input required name="email" type="email" placeholder="john@example.com" onChange={handleChange} className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium opacity-70 ml-1">Street Address</label>
                    <input required name="address" placeholder="123 Main St" onChange={handleChange} className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input required name="city" placeholder="City" onChange={handleChange} className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`} />
                    <input required name="zip" placeholder="ZIP Code" onChange={handleChange} className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2 text-lg">
                    <CreditCard size={20} className="text-indigo-500" /> Payment Method
                  </h3>
                  <div className="flex gap-3 mb-2">
                    <button type="button" className={`flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-medium transition-all ${darkMode ? 'border-indigo-500 bg-indigo-500/10 text-white' : 'border-indigo-600 bg-indigo-50 text-indigo-700'}`}>
                      <CreditCard size={18} /> Card
                    </button>
                    <button type="button" className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 font-medium opacity-50 cursor-not-allowed ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                      <span>PayPal</span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium opacity-70 ml-1">Card Number</label>
                    <div className="relative">
                      <input required name="cardNumber" placeholder="0000 0000 0000 0000" onChange={handleChange} className={`w-full p-3 pl-10 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`} />
                      <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium opacity-70 ml-1">Expiry</label>
                      <input required name="expiry" placeholder="MM/YY" onChange={handleChange} className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium opacity-70 ml-1">CVC</label>
                      <input required name="cvc" placeholder="123" onChange={handleChange} className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs opacity-60 mt-2 justify-center">
                    <ShieldCheck size={14} />
                    <span>Payments are secure and encrypted</span>
                  </div>
                </div>
              </form>
            </div>

            
            <div className={`p-6 border-t flex-none bg-inherit z-10 ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <button 
                type="submit" 
                form="checkout-form"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Pay ${total.toFixed(2)}
              </button>
            </div>
          </div>
        )}

        
        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center h-[500px] space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldCheck size={24} className="text-indigo-600" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Processing Payment</h3>
              <p className="opacity-60">Please do not close this window...</p>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center h-[500px] p-8 text-center animate-scale-in">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Order Confirmed!</h2>
            <p className={`text-lg mb-8 max-w-sm mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Thank you for your purchase. A receipt has been sent to <span className="font-semibold text-indigo-500">{formData.email || 'your email'}</span>.
            </p>
            <div className={`p-4 rounded-xl w-full max-w-sm mb-8 border border-dashed ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}>
              <p className="text-xs opacity-70 uppercase tracking-wide mb-1">Order Reference</p>
              <p className="font-mono text-2xl font-bold tracking-wider text-indigo-600 dark:text-indigo-400">#LUM-{Math.floor(Math.random() * 100000)}</p>
            </div>
            <button 
              onClick={onClose}
              className="bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-transform active:scale-95"
            >
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
};