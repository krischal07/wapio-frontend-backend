import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ContactUpload from '../components/messaging/ContactUpload';
import MessageComposer from '../components/messaging/MessageComposer';
import TemplateSelector from '../components/messaging/TemplateSelector';
import SendPreview from '../components/messaging/SendPreview';
import ScheduleSettings from '../components/messaging/ScheduleSettings';
import { Users, FileText, Send, Calendar } from 'lucide-react';

const SendMessage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [messageData, setMessageData] = useState({
    contacts: [],
    selectedTemplate: null,
    customMessage: '',
    variables: {},
    scheduleType: 'immediate',
    scheduledDate: null,
    scheduledTime: null,
    campaignName: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    { id: 1, title: 'Upload Contacts', icon: Users, component: ContactUpload },
    { id: 2, title: 'Compose Message', icon: FileText, component: MessageComposer },
    { id: 3, title: 'Schedule & Send', icon: Calendar, component: ScheduleSettings }
  ];

  const updateMessageData = (field, value) => {
    setMessageData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentComponent = steps[currentStep - 1].component;

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
              Send Bulk Message
            </h1>
            <p className="text-white/50 text-sm font-thin">
              Send personalized WhatsApp messages to multiple contacts instantly
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/10">
                <div 
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>

              {/* Steps */}
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center relative z-10 flex-1"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-green-500 border-2 border-green-400 shadow-lg shadow-green-500/50'
                          : isCompleted
                          ? 'bg-green-500/20 border-2 border-green-500'
                          : 'bg-[#141414] border-2 border-white/10'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${
                        isActive || isCompleted ? 'text-green-400' : 'text-white/40'
                      }`} />
                    </div>
                    <div className="mt-3 text-center">
                      <p className={`text-sm font-semibold ${
                        isActive ? 'text-white' : 'text-white/50'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-white/30 mt-1">Step {step.id}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Main Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="lg:col-span-2"
            >
              <CurrentComponent 
                messageData={messageData}
                updateMessageData={updateMessageData}
                isLoading={isLoading}
              />

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                    currentStep === 1
                      ? 'bg-[#141414] text-white/30 cursor-not-allowed'
                      : 'bg-[#141414] text-white border border-white/10 hover:bg-white/5'
                  }`}
                >
                  Previous
                </button>

                {currentStep < steps.length ? (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg border-2 border-black transition-all hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg border-2 border-black transition-all hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Messages
                  </button>
                )}
              </div>
            </motion.div>

            {/* Right: Preview & Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="lg:col-span-1"
            >
              <SendPreview messageData={messageData} />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SendMessage;
