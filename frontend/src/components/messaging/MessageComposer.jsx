import React, { useState } from 'react';
import { FileText, Image, Paperclip, Eye, Sparkles, X } from 'lucide-react';
import { motion } from 'framer-motion';

const MessageComposer = ({ messageData, updateMessageData, isLoading }) => {
  const [messageType, setMessageType] = useState('custom'); // 'custom' or 'template'
  const [selectedFile, setSelectedFile] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);

  // Sample templates
  const templates = [
    {
      id: 1,
      name: 'Welcome Message',
      category: 'Marketing',
      content: 'Hi {{name}}, welcome to {{company}}! We\'re excited to have you on board. 🎉',
      variables: ['name', 'company']
    },
    {
      id: 2,
      name: 'Order Confirmation',
      category: 'Transactional',
      content: 'Hello {{name}}, your order #{{order_id}} has been confirmed! Expected delivery: {{date}}',
      variables: ['name', 'order_id', 'date']
    },
    {
      id: 3,
      name: 'Appointment Reminder',
      category: 'Support',
      content: 'Hi {{name}}, reminder: You have an appointment scheduled for {{date}} at {{time}}.',
      variables: ['name', 'date', 'time']
    },
    {
      id: 4,
      name: 'Promotional Offer',
      category: 'Marketing',
      content: '🎁 Special offer for {{name}}! Get {{discount}}% off on your next purchase. Use code: {{code}}',
      variables: ['name', 'discount', 'code']
    }
  ];

  const handleTemplateSelect = (template) => {
    updateMessageData('selectedTemplate', template);
    updateMessageData('customMessage', template.content);
    setMessageType('template');
    setShowTemplates(false);
    
    // Initialize variables
    const vars = {};
    template.variables.forEach(v => vars[v] = '');
    updateMessageData('variables', vars);
  };

  const handleVariableChange = (key, value) => {
    updateMessageData('variables', {
      ...messageData.variables,
      [key]: value
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const getPreviewMessage = () => {
    let message = messageData.customMessage;
    if (messageData.variables) {
      Object.entries(messageData.variables).forEach(([key, value]) => {
        message = message.replace(new RegExp(`{{${key}}}`, 'g'), value || `[${key}]`);
      });
    }
    return message;
  };

  if (isLoading) {
    return (
      <div className="bg-[#141414] rounded-xl border border-white/5 p-8 animate-pulse">
        <div className="h-8 bg-white/10 rounded w-1/3 mb-6"></div>
        <div className="h-64 bg-white/10 rounded"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Message Type Selector */}
      <div className="bg-[#141414] rounded-xl border border-white/5 p-8">
        <h2 className="text-xl font-bold text-white mb-6">Compose Your Message</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setMessageType('custom')}
            className={`p-4 rounded-lg border-2 transition-all ${
              messageType === 'custom'
                ? 'border-green-500 bg-green-500/10'
                : 'border-white/10 bg-[#0f0f0f] hover:border-white/20'
            }`}
          >
            <FileText className={`w-6 h-6 mx-auto mb-2 ${
              messageType === 'custom' ? 'text-green-400' : 'text-white/50'
            }`} />
            <p className={`text-sm font-semibold ${
              messageType === 'custom' ? 'text-white' : 'text-white/60'
            }`}>
              Custom Message
            </p>
          </button>

          <button
            onClick={() => setShowTemplates(true)}
            className={`p-4 rounded-lg border-2 transition-all ${
              messageType === 'template'
                ? 'border-green-500 bg-green-500/10'
                : 'border-white/10 bg-[#0f0f0f] hover:border-white/20'
            }`}
          >
            <Sparkles className={`w-6 h-6 mx-auto mb-2 ${
              messageType === 'template' ? 'text-green-400' : 'text-white/50'
            }`} />
            <p className={`text-sm font-semibold ${
              messageType === 'template' ? 'text-white' : 'text-white/60'
            }`}>
              Use Template
            </p>
          </button>
        </div>

        {/* Selected Template Info */}
        {messageData.selectedTemplate && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-semibold">
                  {messageData.selectedTemplate.name}
                </p>
                <p className="text-white/50 text-xs mt-1">
                  {messageData.selectedTemplate.category}
                </p>
              </div>
              <button
                onClick={() => {
                  updateMessageData('selectedTemplate', null);
                  updateMessageData('variables', {});
                  setMessageType('custom');
                }}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Message Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/70 mb-2">
            Message Content
          </label>
          <textarea
            value={messageData.customMessage}
            onChange={(e) => updateMessageData('customMessage', e.target.value)}
            placeholder="Type your message here... Use {{variable}} for personalization"
            rows={8}
            className="w-full bg-[#0f0f0f] text-white text-sm px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-green-500 transition-colors placeholder:text-white/30 resize-none"
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-white/40">
              {messageData.customMessage?.length || 0} characters
            </p>
            <p className="text-xs text-white/40">
              Use {'{{'} and {'}'} for variables (e.g., {'{{name}})'} 
            </p>
          </div>
        </div>

        {/* Variable Inputs */}
        {messageData.selectedTemplate && messageData.selectedTemplate.variables.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6"
          >
            <label className="block text-sm font-medium text-white/70 mb-3">
              Template Variables
            </label>
            <div className="grid grid-cols-2 gap-4">
              {messageData.selectedTemplate.variables.map((variable) => (
                <div key={variable}>
                  <label className="block text-xs text-white/50 mb-1.5">
                    {variable}
                  </label>
                  <input
                    type="text"
                    value={messageData.variables?.[variable] || ''}
                    onChange={(e) => handleVariableChange(variable, e.target.value)}
                    placeholder={`Enter ${variable}`}
                    className="w-full bg-[#0f0f0f] text-white text-sm px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-green-500 transition-colors placeholder:text-white/30"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Media Attachment */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-3">
            Attach Media (Optional)
          </label>
          
          {selectedFile ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-[#0f0f0f] rounded-lg border border-white/10 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  {selectedFile.type.startsWith('image/') ? (
                    <Image className="w-5 h-5 text-green-400" />
                  ) : (
                    <Paperclip className="w-5 h-5 text-green-400" />
                  )}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-white/50 text-xs">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-red-400" />
              </button>
            </motion.div>
          ) : (
            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/*,video/*,.pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="p-6 bg-[#0f0f0f] rounded-lg border-2 border-dashed border-white/10 hover:border-white/20 transition-colors text-center">
                <Paperclip className="w-6 h-6 text-white/40 mx-auto mb-2" />
                <p className="text-white/60 text-sm">
                  Click to attach image, video, or PDF
                </p>
                <p className="text-white/30 text-xs mt-1">
                  Max size: 16MB
                </p>
              </div>
            </label>
          )}
        </div>
      </div>

      {/* Message Preview */}
      <div className="bg-[#141414] rounded-xl border border-white/5 p-8">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Message Preview</h3>
        </div>

        <div className="bg-[#0f0f0f] rounded-xl p-6 border border-white/10">
          {/* WhatsApp Style Preview */}
          <div className="max-w-md">
            <div className="bg-green-500/10 rounded-xl rounded-tl-none p-4 border border-green-500/20">
              <p className="text-white text-sm whitespace-pre-wrap">
                {getPreviewMessage() || 'Your message preview will appear here...'}
              </p>
              
              {selectedFile && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2 text-green-400 text-xs">
                    <Paperclip className="w-3 h-3" />
                    {selectedFile.name}
                  </div>
                </div>
              )}
            </div>
            <p className="text-white/30 text-xs mt-2">
              This is how your message will appear to recipients
            </p>
          </div>
        </div>
      </div>

      {/* Template Selection Modal */}
      {showTemplates && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowTemplates(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#141414] rounded-xl border border-white/10 p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Select a Template</h3>
              <button
                onClick={() => setShowTemplates(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/50" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="p-6 bg-[#0f0f0f] rounded-xl border border-white/10 hover:border-green-500/50 transition-all text-left group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white font-semibold mb-1">{template.name}</h4>
                      <span className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded">
                        {template.category}
                      </span>
                    </div>
                    <Sparkles className="w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-white/60 text-sm">
                    {template.content}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {template.variables.map((variable) => (
                      <span
                        key={variable}
                        className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded"
                      >
                        {'{{'}{variable}{'}}'}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MessageComposer;
