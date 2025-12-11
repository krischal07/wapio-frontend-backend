import React from 'react';
import { Users, MessageSquare, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SendPreview = ({ messageData }) => {
  const stats = [
    {
      label: 'Total Recipients',
      value: messageData.contacts?.length || 0,
      icon: Users,
      color: 'blue'
    },
    {
      label: 'Message Length',
      value: messageData.customMessage?.length || 0,
      icon: MessageSquare,
      color: 'green'
    },
    {
      label: 'Schedule',
      value: messageData.scheduleType === 'immediate' ? 'Now' : 'Later',
      icon: Calendar,
      color: 'purple'
    }
  ];

  const getEstimatedCost = () => {
    const contactCount = messageData.contacts?.length || 0;
    const costPerMessage = 0.005; // $0.005 per message
    return (contactCount * costPerMessage).toFixed(2);
  };

  const getEstimatedTime = () => {
    const contactCount = messageData.contacts?.length || 0;
    const secondsPerMessage = 3; // 3 seconds delay between messages
    const totalSeconds = contactCount * secondsPerMessage;
    
    if (totalSeconds < 60) return `${totalSeconds}s`;
    if (totalSeconds < 3600) return `${Math.ceil(totalSeconds / 60)}m`;
    return `${Math.floor(totalSeconds / 3600)}h ${Math.ceil((totalSeconds % 3600) / 60)}m`;
  };

  const isReadyToSend = () => {
    return (
      messageData.contacts?.length > 0 &&
      messageData.customMessage?.trim() &&
      messageData.campaignName?.trim() &&
      (messageData.scheduleType === 'immediate' || 
        (messageData.scheduledDate && messageData.scheduledTime))
    );
  };

  return (
    <div className="space-y-6 sticky top-8">
      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#141414] rounded-xl border border-white/5 p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Campaign Summary</h3>
        
        <div className="space-y-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                className="flex items-center justify-between p-3 bg-[#0f0f0f] rounded-lg border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    stat.color === 'blue' ? 'bg-blue-500/10' :
                    stat.color === 'green' ? 'bg-green-500/10' :
                    'bg-purple-500/10'
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      stat.color === 'blue' ? 'text-blue-400' :
                      stat.color === 'green' ? 'text-green-400' :
                      'text-purple-400'
                    }`} />
                  </div>
                  <span className="text-white/70 text-sm">{stat.label}</span>
                </div>
                <span className="text-white font-semibold">{stat.value}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Cost & Time Estimate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#141414] rounded-xl border border-white/5 p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Estimates</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm">Estimated Cost</span>
            <span className="text-white font-bold text-lg">${getEstimatedCost()}</span>
          </div>
          
          <div className="h-px bg-white/5"></div>
          
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm">Estimated Time</span>
            <span className="text-white font-bold text-lg">{getEstimatedTime()}</span>
          </div>
        </div>
      </motion.div>

      {/* Readiness Check */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#141414] rounded-xl border border-white/5 p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Ready to Send?</h3>
        
        <div className="space-y-3">
          <ChecklistItem
            label="Contacts uploaded"
            checked={messageData.contacts?.length > 0}
          />
          <ChecklistItem
            label="Message composed"
            checked={messageData.customMessage?.trim().length > 0}
          />
          <ChecklistItem
            label="Campaign named"
            checked={messageData.campaignName?.trim().length > 0}
          />
          <ChecklistItem
            label="Schedule configured"
            checked={
              messageData.scheduleType === 'immediate' ||
              (messageData.scheduledDate && messageData.scheduledTime)
            }
          />
        </div>

        {isReadyToSend() ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
          >
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <p className="text-sm font-semibold">All set! Ready to send</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
          >
            <div className="flex items-center gap-2 text-yellow-400">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm font-semibold">Complete all steps to continue</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Message Preview Card */}
      {messageData.customMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#141414] rounded-xl border border-white/5 p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Quick Preview</h3>
          
          <div className="bg-[#0f0f0f] rounded-lg p-4 border border-white/10">
            <div className="bg-green-500/10 rounded-lg rounded-tl-none p-3 border border-green-500/20">
              <p className="text-white/80 text-xs line-clamp-4">
                {messageData.customMessage}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const ChecklistItem = ({ label, checked }) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
        checked ? 'bg-green-500/20 border-2 border-green-500' : 'bg-[#0f0f0f] border-2 border-white/10'
      }`}>
        {checked && <CheckCircle className="w-3 h-3 text-green-400" />}
      </div>
      <span className={`text-sm ${checked ? 'text-white' : 'text-white/50'}`}>
        {label}
      </span>
    </div>
  );
};

export default SendPreview;
