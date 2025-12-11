import React, { useState, useCallback } from 'react';
import { Upload, X, Users, FileSpreadsheet, AlertCircle, CheckCircle2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactUpload = ({ messageData, updateMessageData, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [manualContacts, setManualContacts] = useState('');

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file) => {
    setUploadError(null);
    
    // Validate file type
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.csv')) {
      setUploadError('Please upload a CSV or Excel file');
      return;
    }

    // Simulate file processing
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n').filter(line => line.trim());
      
      // Parse contacts (assuming format: name,phone or just phone)
      const contacts = lines.slice(1).map((line, index) => {
        const parts = line.split(',').map(p => p.trim());
        return {
          id: index + 1,
          name: parts[1] || `Contact ${index + 1}`,
          phone: parts[0].replace(/[^0-9+]/g, ''),
          status: 'valid'
        };
      }).filter(contact => contact.phone);

      updateMessageData('contacts', contacts);
    };
    
    reader.readAsText(file);
  };

  const handleManualAdd = () => {
    const lines = manualContacts.split('\n').filter(line => line.trim());
    const newContacts = lines.map((line, index) => {
      const phone = line.trim().replace(/[^0-9+]/g, '');
      return {
        id: (messageData.contacts?.length || 0) + index + 1,
        name: `Contact ${(messageData.contacts?.length || 0) + index + 1}`,
        phone: phone,
        status: 'valid'
      };
    }).filter(contact => contact.phone);

    updateMessageData('contacts', [...(messageData.contacts || []), ...newContacts]);
    setManualContacts('');
  };

  const removeContact = (id) => {
    updateMessageData('contacts', messageData.contacts.filter(c => c.id !== id));
  };

  const downloadSample = () => {
    const csv = 'phone,name\n+1234567890,John Doe\n+9876543210,Jane Smith';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts_sample.csv';
    a.click();
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
      {/* Upload Area */}
      <div className="bg-[#141414] rounded-xl border border-white/5 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Upload Contacts</h2>
          <button
            onClick={downloadSample}
            className="text-sm text-green-400 hover:text-green-300 flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Sample CSV
          </button>
        </div>

        {/* Drag & Drop Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
            isDragging
              ? 'border-green-500 bg-green-500/5'
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          <Upload className={`w-12 h-12 mx-auto mb-4 ${
            isDragging ? 'text-green-400' : 'text-white/40'
          }`} />
          <p className="text-white/70 text-sm mb-2">
            Drag and drop your CSV or Excel file here
          </p>
          <p className="text-white/40 text-xs mb-4">or</p>
          
          <label className="inline-block">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileInput}
              className="hidden"
            />
            <span className="px-6 py-3 bg-white/5 text-white text-sm font-medium rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer inline-block">
              Browse Files
            </span>
          </label>

          <p className="text-white/30 text-xs mt-4">
            Supports CSV and Excel files
          </p>
        </div>

        {uploadError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-400 text-sm">{uploadError}</p>
          </motion.div>
        )}
      </div>

      {/* Manual Input */}
      <div className="bg-[#141414] rounded-xl border border-white/5 p-8">
        <h3 className="text-lg font-semibold text-white mb-4">Or Add Manually</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Phone Numbers (one per line)
            </label>
            <textarea
              value={manualContacts}
              onChange={(e) => setManualContacts(e.target.value)}
              placeholder="+1234567890&#10;+9876543210&#10;+1122334455"
              rows={5}
              className="w-full bg-[#0f0f0f] text-white text-sm px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-green-500 transition-colors placeholder:text-white/30 font-mono"
            />
            <p className="text-xs text-white/40 mt-2">
              Enter phone numbers with country code (e.g., +1234567890)
            </p>
          </div>

          <button
            onClick={handleManualAdd}
            disabled={!manualContacts.trim()}
            className={`w-full px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
              manualContacts.trim()
                ? 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20'
                : 'bg-white/5 text-white/30 border border-white/5 cursor-not-allowed'
            }`}
          >
            Add Contacts
          </button>
        </div>
      </div>

      {/* Contacts List */}
      {messageData.contacts && messageData.contacts.length > 0 && (
        <div className="bg-[#141414] rounded-xl border border-white/5 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">
                Uploaded Contacts
              </h3>
              <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full">
                {messageData.contacts.length}
              </span>
            </div>
            <button
              onClick={() => updateMessageData('contacts', [])}
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {messageData.contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-white/5 hover:border-white/10 transition-colors group"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{contact.name}</p>
                      <p className="text-white/50 text-xs font-mono">{contact.phone}</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  </div>
                  <button
                    onClick={() => removeContact(contact.id)}
                    className="ml-4 p-2 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUpload;
