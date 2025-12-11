import React, { useState } from 'react';
import { Calendar, Clock, Zap, Settings, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ScheduleSettings = ({ messageData, updateMessageData, isLoading }) => {
  const [scheduleType, setScheduleType] = useState(messageData.scheduleType || 'immediate');

  const handleScheduleChange = (type) => {
    setScheduleType(type);
    updateMessageData('scheduleType', type);
  };

  if (isLoading) {
    return (
      <div className="bg-[#141414] rounded-xl border border-white/5 p-8 animate-pulse">
        <div className="h-8 bg-white/10 rounded w-1/3 mb-6"></div>
        <div className="h-48 bg-white/10 rounded"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Campaign Name */}
      <div className="bg-[#141414] rounded-xl border border-white/5 p-8">
        <h2 className="text-xl font-bold text-white mb-6">Campaign Details</h2>
        
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Campaign Name
          </label>
          <input
            type="text"
            value={messageData.campaignName}
            onChange={(e) => updateMessageData('campaignName', e.target.value)}
            placeholder="e.g., Summer Sale 2025"
            className="w-full bg-[#0f0f0f] text-white text-sm px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-green-500 transition-colors placeholder:text-white/30"
          />
          <p className="text-xs text-white/40 mt-2">
            Give your campaign a memorable name for tracking
          </p>
        </div>
      </div>

      {/* Schedule Options */}
      <div className="bg-[#141414] rounded-xl border border-white/5 p-8">
        <h2 className="text-xl font-bold text-white mb-6">When to Send?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Immediate */}
          <button
            onClick={() => handleScheduleChange('immediate')}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              scheduleType === 'immediate'
                ? 'border-green-500 bg-green-500/10'
                : 'border-white/10 bg-[#0f0f0f] hover:border-white/20'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                scheduleType === 'immediate' ? 'bg-green-500/20' : 'bg-white/5'
              }`}>
                <Zap className={`w-6 h-6 ${
                  scheduleType === 'immediate' ? 'text-green-400' : 'text-white/50'
                }`} />
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${
                  scheduleType === 'immediate' ? 'text-white' : 'text-white/60'
                }`}>
                  Send Immediately
                </h3>
                <p className="text-white/50 text-sm">
                  Send messages right away to all contacts
                </p>
              </div>
            </div>
          </button>

          {/* Scheduled */}
          <button
            onClick={() => handleScheduleChange('scheduled')}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              scheduleType === 'scheduled'
                ? 'border-green-500 bg-green-500/10'
                : 'border-white/10 bg-[#0f0f0f] hover:border-white/20'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                scheduleType === 'scheduled' ? 'bg-green-500/20' : 'bg-white/5'
              }`}>
                <Calendar className={`w-6 h-6 ${
                  scheduleType === 'scheduled' ? 'text-green-400' : 'text-white/50'
                }`} />
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${
                  scheduleType === 'scheduled' ? 'text-white' : 'text-white/60'
                }`}>
                  Schedule for Later
                </h3>
                <p className="text-white/50 text-sm">
                  Choose a specific date and time
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Scheduled Date/Time Inputs */}
        {scheduleType === 'scheduled' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Date
              </label>
              <input
                type="date"
                value={messageData.scheduledDate || ''}
                onChange={(e) => updateMessageData('scheduledDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-[#0f0f0f] text-white text-sm px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Time
              </label>
              <input
                type="time"
                value={messageData.scheduledTime || ''}
                onChange={(e) => updateMessageData('scheduledTime', e.target.value)}
                className="w-full bg-[#0f0f0f] text-white text-sm px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Advanced Settings */}
      <div className="bg-[#141414] rounded-xl border border-white/5 p-8">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Advanced Settings</h3>
        </div>

        <div className="space-y-4">
          {/* Message Delay */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Delay Between Messages (seconds)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              defaultValue="3"
              className="w-full bg-[#0f0f0f] text-white text-sm px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-green-500 transition-colors"
            />
            <p className="text-xs text-white/40 mt-2">
              Recommended: 2-5 seconds to avoid rate limiting
            </p>
          </div>

          {/* Retry Failed */}
          <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-white/10">
            <div>
              <p className="text-white text-sm font-medium">Retry Failed Messages</p>
              <p className="text-white/50 text-xs mt-1">
                Automatically retry sending failed messages
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          {/* Track Opens */}
          <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-white/10">
            <div>
              <p className="text-white text-sm font-medium">Track Message Reads</p>
              <p className="text-white/50 text-xs mt-1">
                Get notified when recipients read messages
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          {/* Stop on Error */}
          <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-white/10">
            <div>
              <p className="text-white text-sm font-medium">Stop Campaign on Multiple Errors</p>
              <p className="text-white/50 text-xs mt-1">
                Pause campaign if more than 10% messages fail
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6"
      >
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-yellow-400 font-semibold text-sm mb-1">
              Important Guidelines
            </h4>
            <ul className="text-white/70 text-xs space-y-1">
              <li>• Ensure you have consent from all recipients before sending messages</li>
              <li>• Follow WhatsApp Business Policy to avoid account restrictions</li>
              <li>• Avoid sending spam or unsolicited promotional content</li>
              <li>• Provide an opt-out option in your messages</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ScheduleSettings;
