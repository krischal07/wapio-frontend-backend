import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import TemplateGrid from '../components/templates/TemplateGrid';
import TemplateFilters from '../components/templates/TemplateFilters';
import TemplateStats from '../components/templates/TemplateStats';

const Templates = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-['Poppins',sans-serif]">
      <DashboardSidebar />
      
      <div className="lg:ml-64">
        <DashboardHeader 
          selectedPeriod="7days"
          setSelectedPeriod={() => {}}
        />
        
        <main className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className=""
          >
            <h1 className="text-3xl font-extrabold text-white mb-2">
              Message Templates
            </h1>
            <p className="text-white/50 text-sm font-thin">
              Create, manage, and deploy WhatsApp message templates for your campaigns
            </p>
          </motion.div>

          {/* Template Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            <TemplateStats isLoading={isLoading} />
          </motion.div>

          {/* Filters & Search */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="mt-12"
          >
            <TemplateFilters 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </motion.div>

          {/* Templates Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.3 }}
            className="mt-8"
          >
            <TemplateGrid 
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              isLoading={isLoading}
            />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Templates;
