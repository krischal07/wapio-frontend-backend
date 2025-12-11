import React from 'react';
import { Search, Plus, Filter } from 'lucide-react';

const TemplateFilters = ({ selectedCategory, setSelectedCategory, searchQuery, setSearchQuery }) => {
  const categories = [
    { id: 'all', label: 'All Templates', count: 24 },
    { id: 'marketing', label: 'Marketing', count: 8 },
    { id: 'transactional', label: 'Transactional', count: 6 },
    { id: 'support', label: 'Support', count: 5 },
    { id: 'notifications', label: 'Notifications', count: 5 }
  ];

  return (
    <div className="space-y-6">
      {/* Search & Actions Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#141414] text-white text-sm pl-11 pr-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-green-500 transition-colors placeholder:text-white/30"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 bg-[#141414] text-white/70 text-sm font-medium rounded-lg border border-white/10 hover:bg-white/5 hover:text-white transition-all flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
          <button className="px-6 py-2.5 bg-green-500 text-white text-sm font-bold rounded-lg border-2 border-black transition-all hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none flex items-center gap-2 active:scale-95">
            <Plus className="w-4 h-4" />
            Create Template
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === category.id
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-[#141414] text-white/60 border border-white/5 hover:bg-white/5 hover:text-white'
            }`}
          >
            {category.label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              selectedCategory === category.id
                ? 'bg-green-500/30 text-green-300'
                : 'bg-white/10 text-white/50'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateFilters;
