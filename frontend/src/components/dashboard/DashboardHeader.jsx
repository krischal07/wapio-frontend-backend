import React from 'react';
import { ChevronDown, Rocket } from 'lucide-react';

const DashboardHeader = ({ selectedPeriod, setSelectedPeriod }) => {
  const periods = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: 'year', label: 'This Year' },
  ];

  return (
    <header className="bg-[#0f0f0f] border-b border-white/5">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Period Selector */}
          <div className="relative">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="appearance-none bg-[#1a1a1a] text-white text-sm font-medium px-4 py-2 pr-10 rounded-lg border border-white/10 focus:outline-none focus:border-green-500 transition-colors cursor-pointer"
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <button className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors">
            New Campaign
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
