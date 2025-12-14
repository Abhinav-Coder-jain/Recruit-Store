import React from 'react';
import { MapPin } from 'lucide-react';

const ShippingForm = ({ formData, handleChange }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
        <MapPin size={20} className="text-blue-600 dark:text-blue-400" /> Shipping Address
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
          <input 
            required 
            name="fullName" 
            type="text" 
            value={formData.fullName} 
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg outline-none transition-all bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500/50"
          />
        </div>
        
        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Address</label>
          <input 
            required 
            name="address" 
            type="text" 
            value={formData.address} 
            onChange={handleChange}
            placeholder="123 Main St, Apt 4B"
            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg outline-none transition-all bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500/50"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">City</label>
          <input 
            required 
            name="city" 
            type="text" 
            value={formData.city} 
            onChange={handleChange}
            placeholder="New York"
            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg outline-none transition-all bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500/50"
          />
        </div>

        {/* Zip Code */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Zip Code</label>
          <input 
            required 
            name="zipCode" 
            type="text" 
            value={formData.zipCode} 
            onChange={handleChange}
            placeholder="10001"
            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg outline-none transition-all bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500/50"
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;