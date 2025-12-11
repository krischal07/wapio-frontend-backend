import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Copy, Edit, Trash2, Eye, Send, Clock, CheckCircle2, XCircle } from 'lucide-react';

// Template Card Component
const TemplateCard = ({ template, index }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const getStatusConfig = (status) => {
    const configs = {
      approved: {
        icon: CheckCircle2,
        color: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'border-green-500/20',
        label: 'Approved'
      },
      pending: {
        icon: Clock,
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/20',
        label: 'Pending'
      },
      rejected: {
        icon: XCircle,
        color: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/20',
        label: 'Rejected'
      }
    };
    return configs[status] || configs.approved;
  };

  const statusConfig = getStatusConfig(template.status);
  const StatusIcon = statusConfig.icon;

  const getCategoryColor = (category) => {
    const colors = {
      marketing: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      transactional: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      support: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      notifications: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
    };
    return colors[category] || colors.marketing;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="bg-[#141414] rounded-xl border border-white/5 overflow-hidden hover:border-white/10 transition-all group"
    >
      {/* Card Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
              {template.name}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(template.category)}`}>
                {template.category}
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border}`}>
                <StatusIcon className="w-3 h-3" />
                {statusConfig.label}
              </span>
            </div>
          </div>
          
          {/* Action Menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            >
              <MoreVertical className="w-4 h-4 text-white/50" />
            </button>
            
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden"
              >
                {[
                  { icon: Eye, label: 'Preview', color: 'hover:text-blue-400' },
                  { icon: Edit, label: 'Edit', color: 'hover:text-green-400' },
                  { icon: Copy, label: 'Duplicate', color: 'hover:text-yellow-400' },
                  { icon: Send, label: 'Use in Campaign', color: 'hover:text-purple-400' },
                  { icon: Trash2, label: 'Delete', color: 'hover:text-red-400' }
                ].map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        console.log(`${action.label} template ${template.id}`);
                        setMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-white/70 ${action.color} hover:bg-white/5 transition-colors text-left`}
                    >
                      <Icon className="w-4 h-4" />
                      {action.label}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Card Body - Message Preview */}
      <div className="p-6 bg-[#0f0f0f]">
        <div className="text-sm text-white/70 font-thin line-clamp-4 leading-relaxed">
          {template.message}
        </div>
      </div>

      {/* Card Footer - Stats */}
      <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-xs">
            <span className="text-white/50 font-thin">Used: </span>
            <span className="text-white/80 font-medium">{template.usageCount}x</span>
          </div>
          <div className="text-xs">
            <span className="text-white/50 font-thin">Language: </span>
            <span className="text-white/80 font-medium">{template.language}</span>
          </div>
        </div>
        <div className="text-xs text-white/40 font-thin">
          {template.lastModified}
        </div>
      </div>
    </motion.div>
  );
};

// Empty State Component
const EmptyState = () => {
  return (
    <div className="bg-[#141414] rounded-xl border border-white/5 p-16 text-center">
      <div className="w-24 h-24 mx-auto mb-6 opacity-50">
        <div className="text-6xl">📝</div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">No Templates Found</h3>
      <p className="text-white/50 text-sm font-thin mb-6 max-w-md mx-auto">
        Create your first message template to start sending personalized campaigns to your customers
      </p>
      <button className="px-6 py-3 bg-green-500 text-white text-sm font-bold rounded-lg hover:bg-green-600 transition-colors inline-flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Create Your First Template
      </button>
    </div>
  );
};

// Loading State
const LoadingGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-[#141414] rounded-xl border border-white/5 overflow-hidden animate-pulse">
          <div className="p-6 border-b border-white/5">
            <div className="h-6 bg-white/10 rounded w-3/4 mb-4"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-white/10 rounded w-20"></div>
              <div className="h-6 bg-white/10 rounded w-20"></div>
            </div>
          </div>
          <div className="p-6 bg-[#0f0f0f]">
            <div className="space-y-2">
              <div className="h-4 bg-white/10 rounded w-full"></div>
              <div className="h-4 bg-white/10 rounded w-5/6"></div>
              <div className="h-4 bg-white/10 rounded w-4/6"></div>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-white/5">
            <div className="h-4 bg-white/10 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Component
const TemplateGrid = ({ selectedCategory, searchQuery, isLoading }) => {
  const [templates] = useState([
    {
      id: 1,
      name: 'New Year Promotion',
      category: 'marketing',
      status: 'approved',
      message: '🎉 Happy New Year {{customer_name}}! Start 2025 with amazing deals. Get 50% OFF on all products. Use code: NEWYEAR2025. Shop now: {{shop_link}}',
      usageCount: 1243,
      language: 'EN',
      lastModified: '2 days ago'
    },
    {
      id: 2,
      name: 'Order Confirmation',
      category: 'transactional',
      status: 'approved',
      message: 'Hi {{customer_name}}, your order #{{order_id}} has been confirmed! Expected delivery: {{delivery_date}}. Track your order: {{tracking_link}}',
      usageCount: 8234,
      language: 'EN',
      lastModified: '1 week ago'
    },
    {
      id: 3,
      name: 'Appointment Reminder',
      category: 'notifications',
      status: 'approved',
      message: 'Reminder: You have an appointment scheduled for {{date}} at {{time}}. Location: {{location}}. Reply CONFIRM to confirm or CANCEL to reschedule.',
      usageCount: 3421,
      language: 'EN',
      lastModified: '3 days ago'
    },
    {
      id: 4,
      name: 'Support Ticket Update',
      category: 'support',
      status: 'pending',
      message: 'Hello {{customer_name}}, your support ticket #{{ticket_id}} has been updated. Status: {{status}}. Our team will respond within 24 hours.',
      usageCount: 567,
      language: 'EN',
      lastModified: '1 hour ago'
    },
    {
      id: 5,
      name: 'Flash Sale Alert',
      category: 'marketing',
      status: 'approved',
      message: '⚡ FLASH SALE! Limited time offer for {{customer_name}}. Get {{discount}}% off on {{product_category}}. Sale ends in {{hours}} hours! Shop: {{link}}',
      usageCount: 2103,
      language: 'EN',
      lastModified: '5 days ago'
    },
    {
      id: 6,
      name: 'Payment Reminder',
      category: 'transactional',
      status: 'rejected',
      message: 'Hi {{customer_name}}, your payment of {{amount}} is due on {{due_date}}. Pay now to avoid late fees: {{payment_link}}',
      usageCount: 234,
      language: 'EN',
      lastModified: '1 week ago'
    },
    {
      id: 7,
      name: 'Welcome Message',
      category: 'notifications',
      status: 'approved',
      message: 'Welcome to {{company_name}}, {{customer_name}}! 🎉 We\'re excited to have you. Explore our services and get 10% off your first purchase with code: WELCOME10',
      usageCount: 5621,
      language: 'EN',
      lastModified: '2 weeks ago'
    },
    {
      id: 8,
      name: 'Feedback Request',
      category: 'support',
      status: 'approved',
      message: 'Hi {{customer_name}}, how was your experience with {{product_name}}? We\'d love to hear your feedback! Rate us here: {{feedback_link}}',
      usageCount: 1832,
      language: 'EN',
      lastModified: '4 days ago'
    },
    {
      id: 9,
      name: 'Birthday Wishes',
      category: 'marketing',
      status: 'pending',
      message: '🎂 Happy Birthday {{customer_name}}! Celebrate with a special gift from us. Enjoy {{discount}}% off on your birthday! Use code: BDAY{{year}}',
      usageCount: 892,
      language: 'EN',
      lastModified: '3 hours ago'
    }
  ]);

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return <LoadingGrid />;
  }

  if (filteredTemplates.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTemplates.map((template, index) => (
        <TemplateCard key={template.id} template={template} index={index} />
      ))}
    </div>
  );
};

export default TemplateGrid;
