import React from 'react';
import { CheckCircle } from 'lucide-react';

export const Toast = ({ message, isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[60] animate-bounce-in">
      <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
        <CheckCircle size={18} className="text-green-400" />
        <span className="font-medium text-sm">{message}</span>
      </div>
    </div>
  );
};