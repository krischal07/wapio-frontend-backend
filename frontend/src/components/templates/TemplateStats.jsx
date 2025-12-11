import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const AnimatedCounter = ({ value, duration = 600 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
};

const StatCard = ({ icon: Icon, title, value, iconColor, iconBg, delay, isLoading }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (!isLoading) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, delay }
      });
    }
  }, [isLoading, controls, delay]);

  if (isLoading) {
    return (
      <div className="bg-[#141414] rounded-xl p-6 border border-white/5 animate-pulse">
        <div className="h-4 bg-white/10 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-white/10 rounded w-2/3"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="bg-[#1a1a1a] rounded-xl p-6 border-2 border-white/10 hover:border-white/20 transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${iconBg} rounded-lg`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>

      <p className="text-sm font-semibold text-white/80 mb-2">
        {title}
      </p>

      <div className="text-3xl font-extrabold text-white leading-none tracking-tight">
        <AnimatedCounter value={value} />
      </div>
    </motion.div>
  );
};

const TemplateStats = ({ isLoading }) => {
  const stats = [
    {
      icon: FileText,
      title: 'Total Templates',
      value: '24',
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/10',
      delay: 0
    },
    {
      icon: CheckCircle,
      title: 'Approved',
      value: '18',
      iconColor: 'text-green-400',
      iconBg: 'bg-green-500/10',
      delay: 0.05
    },
    {
      icon: Clock,
      title: 'Pending Review',
      value: '4',
      iconColor: 'text-yellow-400',
      iconBg: 'bg-yellow-500/10',
      delay: 0.1
    },
    {
      icon: AlertCircle,
      title: 'Rejected',
      value: '2',
      iconColor: 'text-red-400',
      iconBg: 'bg-red-500/10',
      delay: 0.15
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} isLoading={isLoading} />
      ))}
    </div>
  );
};

export default TemplateStats;
