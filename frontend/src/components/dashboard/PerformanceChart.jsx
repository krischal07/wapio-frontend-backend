import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const generateData = (period) => {
  const days = period === '7days' ? 7 : period === '30days' ? 30 : period === '90days' ? 90 : 365;
  const data = [];
  
  for (let i = 0; i < Math.min(days, 30); i++) {
    data.push({
      date: `Day ${i + 1}`,
      sent: Math.floor(Math.random() * 1000) + 500,
      read: Math.floor(Math.random() * 800) + 400,
      replied: Math.floor(Math.random() * 400) + 100,
    });
  }
  
  return data;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg p-4 shadow-xl">
        <p className="text-white/60 text-xs font-thin mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1">
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-white/80 text-xs">{entry.name}:</span>
            </div>
            <span className="text-white font-semibold text-sm">
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const PerformanceChart = ({ period }) => {
  const [data, setData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setData(generateData(period));
      setIsAnimating(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [period]);

  return (
    <div className="bg-[#1a1a1a] rounded-lg p-6 border border-white/10">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white">Performance Trends</h2>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255,255,255,0.05)" 
              vertical={false}
            />
            
            <XAxis 
              dataKey="date" 
              stroke="rgba(255,255,255,0.3)"
              style={{ fontSize: '11px', fontFamily: 'Poppins', fontWeight: 200 }}
              tick={{ fill: 'rgba(255,255,255,0.5)' }}
            />
            
            <YAxis 
              stroke="rgba(255,255,255,0.3)"
              style={{ fontSize: '11px', fontFamily: 'Poppins', fontWeight: 200 }}
              tick={{ fill: 'rgba(255,255,255,0.5)' }}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
            
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
                fontFamily: 'Poppins',
                fontSize: '12px',
                fontWeight: 400
              }}
              iconType="circle"
            />
            
            <Line 
              type="monotone" 
              dataKey="sent" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={false}
              name="Sent"
            />
            
            <Line 
              type="monotone" 
              dataKey="read" 
              stroke="#14b8a6" 
              strokeWidth={2}
              dot={false}
              name="Read"
            />
            
            <Line 
              type="monotone" 
              dataKey="replied" 
              stroke="#f97316" 
              strokeWidth={2}
              dot={false}
              name="Replied"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
