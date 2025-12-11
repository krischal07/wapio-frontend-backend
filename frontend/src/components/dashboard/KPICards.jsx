import React from 'react';
import { Send, Eye, MessageCircle, UserX, TrendingUp, TrendingDown } from 'lucide-react';

const KPICard = ({ icon: Icon, title, value, trend, trendValue }) => {
  const isPositive = trend === 'up';

  return (
    <div className="bg-[#1a1a1a] rounded-lg p-5 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-green-500/10 rounded-lg">
          <Icon className="w-5 h-5 text-green-400" />
        </div>
        <div className={`flex items-center gap-1 text-xs ${
          isPositive ? 'text-green-400' : 'text-red-400'
        }`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{trendValue}</span>
        </div>
      </div>
      <p className="text-sm text-white/60 mb-2">{title}</p>
      <p className="text-3xl font-bold text-white">{parseInt(value).toLocaleString()}</p>
    </div>
  );
};

const KPICards = () => {
  const kpis = [
    {
      icon: Send,
      title: 'Messages Sent',
      value: '24847',
      trend: 'up',
      trendValue: '+12.5%'
    },
    {
      icon: Eye,
      title: 'Messages Read',
      value: '21203',
      trend: 'up',
      trendValue: '+8.2%'
    },
    {
      icon: MessageCircle,
      title: 'Replies',
      value: '8432',
      trend: 'up',
      trendValue: '+15.7%'
    },
    {
      icon: UserX,
      title: 'Opt-Outs',
      value: '127',
      trend: 'down',
      trendValue: '-2.3%'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default KPICards;
