import React, { useState } from 'react';
import { MoreVertical, Play, Pause, Copy, Trash2, Eye } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const config = {
    running: { bg: 'bg-green-500/10', text: 'text-green-400', label: 'Active' },
    pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', label: 'Pending' },
    completed: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Complete' },
    failed: { bg: 'bg-red-500/10', text: 'text-red-400', label: 'Failed' }
  };

  const { bg, text, label } = config[status] || config.running;

  return (
    <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${bg} ${text}`}>
      {label}
    </span>
  );
};

const ActionMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const actions = [
    { icon: Eye, label: 'View Details' },
    { icon: Copy, label: 'Duplicate' },
    { icon: Pause, label: 'Pause' },
    { icon: Trash2, label: 'Delete' },
  ];

  return (
    <div className="absolute right-0 top-full mt-1 w-48 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl z-50">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <button
            key={index}
            onClick={() => {
              console.log(action.label);
              onClose();
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors text-left"
          >
            <Icon className="w-4 h-4" />
            {action.label}
          </button>
        );
      })}
    </div>
  );
};

const TableRow = ({ campaign }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
      <td className="px-6 py-3">
        <div className="font-medium text-white text-sm">{campaign.name}</div>
        <div className="text-xs text-white/50 mt-0.5">{campaign.template}</div>
      </td>
      <td className="px-6 py-3">
        <StatusBadge status={campaign.status} />
      </td>
      <td className="px-6 py-3 text-white/70 text-sm">
        {campaign.sent.toLocaleString()}
      </td>
      <td className="px-6 py-3 text-white/70 text-sm">
        {campaign.delivered.toLocaleString()}
      </td>
      <td className="px-6 py-3 text-white/70 text-sm">
        {campaign.read.toLocaleString()}
      </td>
      <td className="px-6 py-3 text-white/70 text-sm">
        {campaign.replies.toLocaleString()}
      </td>
      <td className="px-6 py-3 text-white/50 text-xs">
        {campaign.date}
      </td>
      <td className="px-6 py-3 relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1.5 hover:bg-white/10 rounded transition-colors"
        >
          <MoreVertical className="w-4 h-4 text-white/50" />
        </button>
        <ActionMenu 
          isOpen={menuOpen} 
          onClose={() => setMenuOpen(false)}
        />
      </td>
    </tr>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-semibold text-white mb-2">No campaigns yet</h3>
      <p className="text-white/50 text-sm mb-4">
        Create your first campaign to get started
      </p>
      <button className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors">
        Create Campaign
      </button>
    </div>
  );
};

// Main Component
const CampaignsTable = () => {
  const [campaigns] = useState([
    {
      id: 1,
      name: 'New Year Promo 2025',
      template: 'Holiday Sale Template',
      status: 'running',
      sent: 12453,
      delivered: 12201,
      read: 10832,
      replies: 3421,
      date: '2 hours ago'
    },
    {
      id: 2,
      name: 'Product Launch Campaign',
      template: 'New Product Alert',
      status: 'pending',
      sent: 8234,
      delivered: 8102,
      read: 7234,
      replies: 2103,
      date: '5 hours ago'
    },
    {
      id: 3,
      name: 'Customer Feedback Survey',
      template: 'Survey Request',
      status: 'completed',
      sent: 5621,
      delivered: 5534,
      read: 4832,
      replies: 1245,
      date: 'Yesterday'
    },
    {
      id: 4,
      name: 'Flash Sale Alert',
      template: 'Urgent Sale Notification',
      status: 'running',
      sent: 15234,
      delivered: 14932,
      read: 13421,
      replies: 4532,
      date: '3 hours ago'
    },
    {
      id: 5,
      name: 'Appointment Reminders',
      template: 'Reminder Template',
      status: 'completed',
      sent: 3421,
      delivered: 3398,
      read: 3102,
      replies: 892,
      date: '2 days ago'
    }
  ]);

  return (
    <div className="bg-[#1a1a1a] rounded-lg border border-white/10 overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5">
        <h2 className="text-lg font-bold text-white">Recent Campaigns</h2>
      </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-[#0f0f0f]">
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60">Sent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60">Delivered</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60">Read</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60">Replies</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60"></th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id} campaign={campaign} />
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default CampaignsTable;
