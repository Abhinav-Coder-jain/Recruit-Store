
import React from 'react'

import { ChevronDown } from 'lucide-react';


export default function MobileMenuForm({categories, category, setCategory, searchTerm, setSearchTerm, handleSearch}) {
  return (
  <div className="lg:hidden py-4 border-t border-slate-200 dark:border-slate-800 animate-slide-down">
            <form onSubmit={handleSearch} className="flex flex-col gap-3">
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)} 
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl outline-none text-slate-700 dark:text-white appearance-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 dark:text-slate-400">
                  <ChevronDown size={16} />
                </div>
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl outline-none text-slate-700 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-colors"
              >
                Search Results
              </button>
            </form>
          </div>
  )
}
