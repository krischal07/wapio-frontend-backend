import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Puzzle, FileSpreadsheet, Send, Download, Play, Square, FileText, MoreVertical, MessageSquare, Phone, Paperclip, Search, Users, CircleDashed, Settings, Plus, ArrowDown } from 'lucide-react';

const Hero = () => {
    const navigate = useNavigate();
    const [chatList, setChatList] = useState([
        { name: "Rahul KL", msg: "Project update?", time: "12:18 PM", active: true },
        { name: "Design Team", msg: "New mockups are ready", time: "Yesterday" },
        { name: "Sarah Wilson", msg: "Missed voice call", time: "Yesterday", color: "text-red-500" },
        { name: "Marketing Group", msg: "~Alex: Meeting at 3 PM", time: "Yesterday" },
        { name: "John Davis", msg: "Thanks for the help!", time: "Yesterday" },
        { name: "Support Ticket #123", msg: "Issue resolved", time: "Friday" },
    ]);
    const [customerCounter, setCustomerCounter] = useState(1);
    const [showClickHere, setShowClickHere] = useState(true);

    const handleSendClick = async () => {
        // Hide the click here GIF
        setShowClickHere(false);

        const addCustomerWithDelay = async (customer, delay) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    setChatList(prevList => [customer, ...prevList]);
                    resolve();
                }, delay);
            });
        };

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Add customers 1-7 with staggered delays
        for (let i = 1; i <= 7; i++) {
            const customer = {
                name: `Customer ${customerCounter + i - 1}`,
                msg: `Happy New Year Customer ${customerCounter + i - 1} !!`,
                time: currentTime,
                active: false
            };
            await addCustomerWithDelay(customer, i * 100); // 200ms delay between each
        }

        // Add 8th customer as "Customer n" with final delay
        const finalCustomer = {
            name: `Customer n`,
            msg: "Happy New Year Customer n !!",
            time: currentTime,
            active: false
        };
        await addCustomerWithDelay(finalCustomer, 8 * 100);

        setCustomerCounter(prev => prev + 7);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <div className="flex flex-col gap-20 items-center">
                {/* Top Section - Text Content */}
                <div className="space-y-8 text-center max-w-4xl">
                    <div className="space-y-4">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
                           Your Customers Are on WhatsApp. <br className="hidden sm:block" /> Reach Them Faster with <span className='font-bold text-green-500 '>wa</span>pio.
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-500">
                            Send promotions, reminders, and updates to thousands instantly using the real WhatsApp Cloud API.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-gray-500 text-xs sm:text-sm lg:text-base">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Official WhatsApp API</span>
                        </div>
                        <span className="hidden sm:inline text-gray-300">|</span>
                        <div className="flex items-center gap-2">
                            <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Upload contacts easilyy</span>
                        </div>
                        <span className="hidden sm:inline text-gray-300">|</span>
                        <div className="flex items-center gap-2">
                            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Send bulk messages instantly</span>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button 
                            onClick={() => navigate('/dashboard')}
                            className="relative px-6 sm:px-10 py-2.5 sm:py-3 text-sm sm:text-base bg-green-500 text-white font-bold rounded-lg border-2 border-black transition-all hover:translate-x-[4px] hover:translate-y-[4px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none cursor-pointer"
                        >
                            Try Now
                        </button>
                    </div>
                </div>

                {/* Bottom Section - Dashboard Mockup */}
                <div className="relative w-full max-w-6xl">
                    {/* Interactive Demo Indicator */}
                    <div className="hidden lg:flex absolute -top-10 right-4 items-center gap-2 z-20">
                        <div className="relative -rotate-25">
                            <svg
                                width="40"
                                height="35"
                                viewBox="0 0 220 45"
                                fill="none"
                                className="text-gray-800 animate-pulse"
                            >
                                <path
                                    d="M21.489 29.4305C36.9333 31.3498 51.3198 33.0559 65.7063 34.9753C66.7641 35.1885 67.6104 36.4681 69.9376 38.3875C63.1675 39.2406 57.8783 40.3069 52.5892 40.5201C38.6259 40.9467 24.8741 40.9467 10.9107 40.9467C9.21821 40.9467 7.5257 41.1599 5.83317 40.7334C0.332466 39.6671 -1.57164 36.0416 1.39028 31.1365C2.87124 28.7906 4.56377 26.658 6.46786 24.7386C13.6611 17.4876 21.0659 10.4499 28.4707 3.41224C29.7401 2.13265 31.6442 1.49285 34.183 0C34.6061 10.8765 23.8162 13.8622 21.489 22.3927C23.3931 21.9662 25.0856 21.7529 26.5666 21.3264C83.6894 5.54486 140.601 7.25099 197.3 22.606C203.224 24.0988 208.936 26.4447 214.649 28.5773C217.61 29.6437 220.149 31.9896 218.457 35.6151C216.976 39.2406 214.014 39.2406 210.629 37.7477C172.759 20.6866 132.561 18.7672 91.9404 19.407C70.7838 19.6203 50.0504 21.9662 29.5285 26.8713C26.9897 27.5111 24.4509 28.3641 21.489 29.4305Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <span className="text-sm text-gray-800 font-medium font-handwriting -mt-3 animate-pulse">Interactive demo</span>
                    </div>

                    {/* Main Dashboard Card */}
                    {/* <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,214,114,0.4)] border border-gray-100 overflow-hidden relative z-10 flex h-[500px] w-full"> */}
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-300 overflow-hidden relative z-10 flex h-[400px] sm:h-[450px] lg:h-[500px] w-full">

                        {/* 1. Icon Strip (Far Left) */}
                        <div className="hidden sm:flex w-14 bg-gray-50 border-r border-gray-100 flex-col items-center py-4 gap-6 text-gray-500">
                            <div className="p-2 bg-gray-200 rounded-full text-gray-700">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <Phone className="w-5 h-5 hover:text-gray-800 cursor-pointer" />
                            <CircleDashed className="w-5 h-5 hover:text-gray-800 cursor-pointer" />
                            <Users className="w-5 h-5 hover:text-gray-800 cursor-pointer" />
                            <div className="mt-auto">
                                <Settings className="w-5 h-5 hover:text-gray-800 cursor-pointer" />
                            </div>
                        </div>

                        {/* 2. Chat List Sidebar */}
                        <div className="w-32 sm:w-56 lg:w-72 bg-white border-r border-gray-100 flex flex-col">
                            {/* Sidebar Header */}
                            <div className="p-2 sm:p-4 flex items-center justify-between">
                                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">Chats</h2>
                                <div className="flex gap-2 sm:gap-3 text-gray-500">
                                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" />
                                    <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" />
                                </div>
                            </div>

                            {/* Search */}
                            <div className="px-2 sm:px-4 pb-2">
                                <div className="bg-gray-100 rounded-lg flex items-center px-2 sm:px-3 py-1.5 gap-1 sm:gap-2">
                                    <Search className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="bg-transparent border-none outline-none text-xs sm:text-sm w-full placeholder-gray-500"
                                    />
                                </div>
                            </div>

                            {/* Filter Chips */}
                            <div className="hidden sm:flex px-4 py-2 gap-2 overflow-x-auto no-scrollbar">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium cursor-pointer whitespace-nowrap">All</span>
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium cursor-pointer whitespace-nowrap hover:bg-gray-200">Unread</span>
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium cursor-pointer whitespace-nowrap hover:bg-gray-200">Favorites</span>
                            </div>

                            {/* Chat List Items */}
                            <div className="flex-1 overflow-y-auto">
                                {chatList.map((chat, idx) => (
                                    <div key={idx} className={`px-2 sm:px-4 py-2 sm:py-3 flex gap-2 sm:gap-3 cursor-pointer hover:bg-gray-50 ${chat.active ? 'bg-gray-100' : ''}`}>
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-500 font-medium text-xs sm:text-sm">
                                            {chat.name[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline">
                                                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{chat.name}</h3>
                                                <span className="text-[9px] sm:text-[10px] text-gray-400 hidden sm:inline">{chat.time}</span>
                                            </div>
                                            <p className={`text-[10px] sm:text-xs truncate ${chat.color || 'text-gray-500'}`}>
                                                {chat.active && <span className="text-green-500 mr-1">✓✓</span>}
                                                {chat.msg}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Main Content (Existing) */}
                        <div className="flex-1 flex flex-col bg-gray-50/30 min-w-0">
                            {/* Header */}
                            <div className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 border-b border-gray-100 bg-white">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold text-[10px] sm:text-xs">S</div>
                                <div className="flex gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
                                    <span className="text-green-600 font-medium border-b-2 border-green-600 pb-2 sm:pb-3 -mb-2.5 sm:-mb-3.5">Send</span>
                                    <span className="hidden sm:inline">Reports</span>
                                    <span className="hidden sm:inline">Replies</span>
                                </div>
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-100 rounded flex items-center justify-center text-yellow-700 text-[10px] sm:text-xs font-bold">AS</div>
                            </div>

                            {/* Content */}
                            <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6 overflow-y-auto">
                                {/* Phone Input */}
                                <div className="flex gap-1 sm:gap-2">
                                    <div className="flex items-center gap-0.5 sm:gap-1 border rounded px-1 sm:px-2 py-1 sm:py-1.5 bg-gray-50 text-xs sm:text-sm w-16 sm:w-20">
                                        <span className="text-xs sm:text-base">🇳🇵</span>
                                        <span className="text-[10px] sm:text-sm">+977</span>
                                    </div>
                                    <div className="flex-1 border rounded px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-400 flex items-center gap-1 sm:gap-2 overflow-hidden">
                                        <span className="bg-gray-100 px-1 rounded text-[10px] sm:text-xs">9889581955 ×</span>
                                        <span className="hidden sm:inline bg-gray-100 px-1 rounded text-xs">9889581955 ×</span>
                                        <span className="hidden lg:inline bg-gray-100 px-1 rounded text-xs">9889581955 ×</span>
                                    </div>
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-50 rounded flex items-center justify-center text-green-600">
                                        <FileSpreadsheet className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </div>
                                </div>

                                {/* Message Box */}
                                <div className="space-y-1 sm:space-y-2">
                                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-gray-700">
                                        <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span>Message box</span>
                                    </div>
                                    <div className="border rounded-lg p-2 sm:p-3 lg:p-4 text-[10px] sm:text-xs text-gray-600 space-y-1 sm:space-y-2 bg-gray-50/50">
                                        <p className="font-medium text-gray-900">Happy New Year $UserName !!</p>
                                        <p className="hidden sm:block">
                                            Thank you for trusting our business this past year. <br />
                                            We truly appreciate your support and partnership. <br />
                                            Wishing you success, growth, and new opportunities in 2025. <br />
                                            Looking forward to serving you even better this year.</p>
                                        <p className="sm:hidden">
                                            Thank you for trusting our business...</p>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="relative mb-4 sm:mb-10">
                                    {/* Animated Click Here Indicator */}
                                    {showClickHere && (
                                        <div className="pointer-events-none z-40 absolute -bottom-11 -right-4 hidden lg:flex justify-center">
                                            <img src="/gifs/source.gif" alt="Click here" className="w-16 h-auto" />
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-1 sm:pt-2">
                                        <button className="hidden sm:flex items-center gap-2 text-gray-500 text-xs sm:text-sm hover:bg-gray-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded transition-colors">
                                            <Paperclip className="w-3 h-3 sm:w-4 sm:h-4" />
                                            <span className="hidden lg:inline">Attach a file</span>
                                        </button>
                                        <button className="sm:hidden flex items-center justify-center text-gray-500 hover:bg-gray-50 p-2 rounded transition-colors">
                                            <Paperclip className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={handleSendClick}
                                            className="bg-green-500 text-white px-4 sm:px-6 py-1.5 rounded text-xs sm:text-sm font-medium hover:bg-green-600 transition-colors relative"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
