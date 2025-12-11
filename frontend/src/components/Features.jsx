import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, Users, BarChart3, Zap, Phone, Bot, Shield, CheckCircle, Send } from 'lucide-react';

const Features = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);

    const features = [
        {
            id: 1,
            title: "Official Meta WhatsApp API",
            description: "Your business communicates through WhatsApp the same way big brands do. No automation tools, no browser extensions, no risky scripts. Your number stays safe because everything follows WhatsApp's rules.",
            icon: Shield,
            image: "/api/placeholder/600/400",
            highlights: ["Official Meta API", "No risky scripts", "Number safety", "WhatsApp compliance"]
        },
        {
            id: 2,
            title: "Verified Business Branding",
            description: "Your messages come from a professional, verified business profile. Customers see your business name, logo, and certification badge. Builds trust and increases open/read rates.",
            icon: CheckCircle,
            image: "/api/placeholder/600/400",
            highlights: ["Verified profile", "Business name & logo", "Certification badge", "Higher open rates"]
        },
        {
            id: 3,
            title: "Send Thousands of Messages Easily",
            description: "Designed for bulk campaigns of any size. No lag, no freezing, no limits from browser automation. Perfect for offers, events, reminders, daily updates, or festival campaigns.",
            icon: Send,
            image: "/api/placeholder/600/400",
            highlights: ["Unlimited scale", "No lag or freezing", "Festival campaigns", "Event notifications"]
        },
        {
            id: 4,
            title: "Personalized Messaging at Scale",
            description: "Add customer names, dates, invoices, or other details automatically. Bulk send rich content: images, videos, PDFs, catalogs, buttons. Messaging feels personal, even when sent to thousands.",
            icon: MessageSquare,
            image: "/api/placeholder/600/400",
            highlights: ["Auto personalization", "Rich media support", "Bulk catalogs", "Personal feel"]
        },
        {
            id: 5,
            title: "Simple Dashboard for Any Team",
            description: "Clean interface built for marketing, sales, and support teams. Import contacts, write your message, and click send. No tech knowledge required.",
            icon: Users,
            image: "/api/placeholder/600/400",
            highlights: ["No tech knowledge", "Team-friendly", "Easy import", "One-click send"]
        }
    ];

    // Auto-rotate features every 4 seconds
    useEffect(() => {
        if (!isAutoplay) return;

        const interval = setInterval(() => {
            setActiveFeature(prev => (prev + 1) % features.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoplay, features.length]);

    const handleFeatureClick = (index) => {
        setActiveFeature(index);
        setIsAutoplay(false);
        // Re-enable autoplay after 10 seconds of inactivity
        setTimeout(() => setIsAutoplay(true), 10000);
    };

    const nextFeature = () => {
        setActiveFeature(prev => (prev + 1) % features.length);
        setIsAutoplay(false);
        setTimeout(() => setIsAutoplay(true), 10000);
    };

    const prevFeature = () => {
        setActiveFeature(prev => (prev - 1 + features.length) % features.length);
        setIsAutoplay(false);
        setTimeout(() => setIsAutoplay(true), 10000);
    };

    return (
        <section className="py-12 sm:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Powerful Features for WhatsApp Marketing
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                        Everything you need to build, engage, and convert your audience through WhatsApp messaging
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Side - Features List */}
                    <div className="space-y-3 sm:space-y-4">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            const isActive = index === activeFeature;

                            return (
                                <div
                                    key={feature.id}
                                    onClick={() => handleFeatureClick(index)}
                                    className={`group cursor-pointer p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 ${isActive
                                        ? 'bg-green-50 border-green-500 shadow-lg scale-105'
                                        : 'bg-white border-gray-200 hover:border-green-300 hover:shadow-md'
                                        }`}
                                >
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className={`p-2 sm:p-3 rounded-lg transition-colors ${isActive ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-green-100 group-hover:text-green-600'
                                            }`}>
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`font-semibold text-base sm:text-lg mb-1 sm:mb-2 transition-colors ${isActive ? 'text-green-900' : 'text-gray-900'
                                                }`}>
                                                {feature.title}
                                            </h3>

                                            {isActive && (
                                                <div className="mt-2 sm:mt-3 flex flex-wrap gap-2">



                                                    <p className={`text-xs sm:text-sm leading-relaxed transition-colors ${isActive ? 'text-green-700' : 'text-gray-600'
                                                        }`}>
                                                        {feature.description}
                                                    </p>

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Side - Dynamic Content */}
                    <div className="relative">
                        {/* Navigation Arrows */}
                        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-6 z-10">
                            <button
                                onClick={prevFeature}
                                className="p-3 bg-white rounded-full shadow-xl hover:bg-gray-50 transition-all border border-gray-200"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-700" />
                            </button>
                        </div>
                        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-6 z-10">
                            <button
                                onClick={nextFeature}
                                className="p-3 bg-white rounded-full shadow-xl hover:bg-gray-50 transition-all border border-gray-200"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-700" />
                            </button>
                        </div>

                        {/* WhatsApp-Style Mockup Container */}
                        <div className="relative rounded-3xl p-4 sm:p-6 lg:p-8 min-h-[400px] sm:min-h-[500px] lg:min-h-[700px] overflow-hidden">

                            {/* Feature 1: Official Meta API - Security & Verification */}
                            {activeFeature === 0 && (
                                <>
                                    <div className="absolute left-8 top-8 w-[280px] bg-white rounded-2xl shadow-xl border-4 border-gray-800 overflow-hidden">
                                        <div className="bg-[#075e54] px-4 py-3 text-white">
                                            <div className="flex items-center gap-2">
                                                <Shield className="w-6 h-6" />
                                                <span className="font-semibold">Meta API Dashboard</span>
                                            </div>
                                        </div>
                                        <div className="p-4 space-y-3 bg-gray-50">
                                            <div className="bg-white p-3 rounded-lg border-l-4 border-green-500">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                    <span className="text-xs font-semibold text-gray-900">API Status</span>
                                                </div>
                                                <p className="text-xs text-gray-600">Connected & Verified</p>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg">
                                                <p className="text-xs font-semibold text-gray-700 mb-2">Security Features</p>
                                                <div className="space-y-1.5">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        <span className="text-xs text-gray-600">End-to-end encryption</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        <span className="text-xs text-gray-600">Number protection</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        <span className="text-xs text-gray-600">Official Meta compliance</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                <p className="text-xs font-semibold text-green-900 mb-1">Your Business Number</p>
                                                <p className="text-xs text-green-700">+1 (555) 123-4567</p>
                                                <p className="text-xs text-green-600 mt-1">✓ Verified & Protected</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute right-8 top-16 w-[320px] bg-white rounded-3xl shadow-2xl border-4 border-gray-900 overflow-hidden">
                                        <div className="bg-[#075e54] px-4 py-3 text-white flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                                    <span className="text-lg">🛡️</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold">Your Business</p>
                                                    <p className="text-xs text-green-200">Official API • Verified</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-[#e5ddd5] p-4 min-h-[420px]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.02) 10px, rgba(0,0,0,0.02) 20px)' }}>
                                            <div className="bg-white rounded-lg shadow-md p-4 max-w-[260px]">
                                                <div className="flex items-center gap-2 mb-3 pb-3 border-b">
                                                    <Shield className="w-6 h-6 text-green-600" />
                                                    <div>
                                                        <p className="text-xs font-bold text-gray-900">Official Meta WhatsApp API</p>
                                                        <p className="text-xs text-green-600">✓ Verified Business</p>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-700 leading-relaxed mb-3">
                                                    Your business is now connected using the official Meta WhatsApp Business API. Your number is protected and all messages comply with WhatsApp's policies.
                                                </p>
                                                <div className="bg-green-50 p-2 rounded text-center">
                                                    <p className="text-xs text-green-800 font-medium">🔒 100% Secure & Compliant</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Feature 2: Verified Business Branding */}
                            {activeFeature === 1 && (
                                <>
                                    <div className="absolute left-8 top-8 w-[280px] bg-white rounded-2xl shadow-xl border-4 border-gray-800 overflow-hidden">
                                        <div className="bg-white px-4 py-3 border-b">
                                            <h3 className="font-bold text-gray-900">Business Profile</h3>
                                        </div>
                                        <div className="p-4 space-y-3 bg-gray-50">
                                            <div className="bg-white p-3 rounded-lg text-center">
                                                <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-2xl font-bold">
                                                    BS
                                                </div>
                                                <p className="font-semibold text-gray-900">Business Store</p>
                                                <div className="flex items-center justify-center gap-1 mt-1">
                                                    <CheckCircle className="w-4 h-4 text-blue-600" />
                                                    <span className="text-xs text-blue-600 font-medium">Verified</span>
                                                </div>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg space-y-2">
                                                <div>
                                                    <p className="text-xs text-gray-500">Category</p>
                                                    <p className="text-xs font-medium text-gray-900">Retail • E-commerce</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Description</p>
                                                    <p className="text-xs text-gray-700">Premium products with fast delivery</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Website</p>
                                                    <p className="text-xs text-blue-600">www.businessstore.com</p>
                                                </div>
                                            </div>
                                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                <p className="text-xs font-semibold text-blue-900">Profile Trust Score</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    {[1, 2, 3, 4, 5].map(i => (
                                                        <div key={i} className="w-8 h-2 bg-blue-600 rounded-full"></div>
                                                    ))}
                                                </div>
                                                <p className="text-xs text-blue-700 mt-1">Excellent</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute right-8 top-16 w-[320px] bg-white rounded-3xl shadow-2xl border-4 border-gray-900 overflow-hidden">
                                        <div className="bg-[#075e54] px-4 py-3 text-white flex items-center justify-between">
                                            <ChevronLeft className="w-5 h-5" />
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                    BS
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold">Business Store</p>
                                                </div>
                                            </div>
                                            <div className="w-5 h-5"></div>
                                        </div>
                                        <div className="bg-gray-100 p-4 text-center border-b">
                                            <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-3xl font-bold">
                                                BS
                                            </div>
                                            <div className="flex items-center justify-center gap-1 mb-1">
                                                <p className="font-semibold text-gray-900">Business Store</p>
                                                <CheckCircle className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <p className="text-xs text-gray-600">Retail • E-commerce</p>
                                            <p className="text-xs text-gray-700 mt-2">Premium products with fast delivery</p>
                                            <button className="mt-3 px-6 py-1.5 bg-[#25d366] text-white text-xs rounded-full font-medium">
                                                Message
                                            </button>
                                        </div>
                                        <div className="bg-white p-4 space-y-3">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Phone className="w-4 h-4" />
                                                <span className="text-xs">+1 (555) 123-4567</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <MessageSquare className="w-4 h-4" />
                                                <span className="text-xs">www.businessstore.com</span>
                                            </div>
                                            <div className="bg-green-50 p-3 rounded-lg">
                                                <p className="text-xs text-green-900 font-medium mb-1">✓ Verified Business Account</p>
                                                <p className="text-xs text-green-700">Customers see your verified badge and trust your brand</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Feature 3: Bulk Messaging */}
                            {activeFeature === 2 && (
                                <>
                                    <div className="absolute left-8 top-8 w-[280px] bg-white rounded-2xl shadow-xl border-4 border-gray-800 overflow-hidden">
                                        <div className="bg-white px-4 py-3 border-b">
                                            <h3 className="font-bold text-gray-900">Black Friday Campaign</h3>
                                        </div>
                                        <div className="p-4 space-y-3 bg-gray-50">
                                            <div className="bg-sky-50 p-3 rounded-lg border-l-4 border-sky-500">
                                                <p className="text-xs font-bold text-sky-900">SALE</p>
                                                <p className="text-lg font-bold text-sky-600">50% OFF</p>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-600">Total Recipients</span>
                                                    <span className="text-sm font-bold text-gray-900">12,547</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-600">Messages Sent</span>
                                                    <span className="text-sm font-bold text-green-600">8,932</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-600">In Queue</span>
                                                    <span className="text-sm font-bold text-blue-600">3,615</span>
                                                </div>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-xs font-semibold text-gray-700">Progress</span>
                                                    <span className="text-xs font-bold text-gray-900">71%</span>
                                                </div>
                                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-green-500" style={{ width: '71%' }}></div>
                                                </div>
                                            </div>
                                            <div className="bg-green-50 p-3 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <Zap className="w-4 h-4 text-green-600" />
                                                    <span className="text-xs font-semibold text-green-900">High-Speed Delivery</span>
                                                </div>
                                                <p className="text-xs text-green-700 mt-1">~150 msgs/min</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute right-8 top-16 w-[300px] bg-white rounded-3xl shadow-2xl border-4 border-gray-900 overflow-hidden max-h-[620px]">
                                        <div className="bg-[#075e54] px-4 py-2 text-center">
                                            <p className="text-xs text-white">WhatsApp</p>
                                        </div>
                                        <div className="bg-[#e5ddd5] p-3 h-[400px] overflow-y-auto space-y-2 scrollbar-hide" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.02) 10px, rgba(0,0,0,0.02) 20px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                            <div className="flex justify-center">
                                                <div className="bg-white px-3 py-1 rounded-lg shadow-sm">
                                                    <p className="text-xs text-gray-600">Today</p>
                                                </div>
                                            </div>
                                            {['Sarah M.', 'John K.'].map((name, idx) => (
                                                <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                                                    <div className="bg-sky-400 p-4 text-center text-white">
                                                        <p className="text-xl font-black">SALE</p>
                                                        <p className="text-2xl font-black">50% OFF</p>
                                                    </div>
                                                    <div className="p-3">
                                                        <p className="text-xs text-gray-800 font-medium mb-1">Hey {name}! 🎉</p>
                                                        <p className="text-xs text-gray-700">Black Friday deals are here! Get 50% off on all products.</p>
                                                        <div className="mt-2 pt-2 border-t">
                                                            <button className="text-xs text-blue-600 font-medium">Shop Now →</button>
                                                        </div>
                                                    </div>
                                                    <div className="text-right px-3 pb-1">
                                                        <p className="text-xs text-gray-400">11:{25 + idx} AM ✓✓</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Feature 4: Personalized Messaging */}
                            {activeFeature === 3 && (
                                <>
                                    <div className="absolute left-8 top-8 w-[280px] bg-white rounded-2xl shadow-xl border-4 border-gray-800 overflow-hidden">
                                        <div className="bg-white px-4 py-3 border-b">
                                            <h3 className="font-bold text-gray-900">Message Template</h3>
                                        </div>
                                        <div className="p-4 space-y-3 bg-gray-50">
                                            <div className="bg-white p-3 rounded-lg border-l-4 border-purple-500">
                                                <p className="text-xs font-semibold text-gray-900 mb-2">Dynamic Variables</p>
                                                <div className="space-y-1.5">
                                                    <div className="flex items-center gap-2">
                                                        <code className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{'{{name}}'}</code>
                                                        <span className="text-xs text-gray-600">Customer name</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <code className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{'{{order}}'}</code>
                                                        <span className="text-xs text-gray-600">Order number</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <code className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{'{{date}}'}</code>
                                                        <span className="text-xs text-gray-600">Delivery date</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg space-y-2">
                                                <p className="text-xs font-semibold text-gray-700">Rich Media Options</p>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="bg-blue-50 p-2 rounded text-center">
                                                        <p className="text-xs text-blue-900">📷 Images</p>
                                                    </div>
                                                    <div className="bg-green-50 p-2 rounded text-center">
                                                        <p className="text-xs text-green-900">🎥 Videos</p>
                                                    </div>
                                                    <div className="bg-red-50 p-2 rounded text-center">
                                                        <p className="text-xs text-red-900">📄 PDFs</p>
                                                    </div>
                                                    <div className="bg-purple-50 p-2 rounded text-center">
                                                        <p className="text-xs text-purple-900">🔘 Buttons</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                <p className="text-xs font-semibold text-purple-900">✨ Auto-Personalization</p>
                                                <p className="text-xs text-purple-700 mt-1">Each message feels one-on-one</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute right-8 top-16 w-[300px] bg-white rounded-3xl shadow-2xl border-4 border-gray-900 overflow-hidden max-h-[620px]">
                                        <div className="bg-[#075e54] px-4 py-3 text-white">
                                            <p className="text-sm font-semibold">Preview: Personalized Messages</p>
                                        </div>
                                        <div className="bg-[#e5ddd5] p-3 h-[400px] overflow-y-auto space-y-2 scrollbar-hide" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.02) 10px, rgba(0,0,0,0.02) 20px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                            {[
                                                { name: 'Michael Chen', order: '#A2047', date: 'Nov 25' },
                                                { name: 'Sarah Williams', order: '#A2048', date: 'Nov 26' }
                                            ].map((customer, idx) => (
                                                <div key={idx} className="bg-white rounded-lg shadow-md p-3">
                                                    <p className="text-xs text-gray-800 font-medium mb-2">Hi {customer.name}! 👋</p>
                                                    <p className="text-xs text-gray-700 leading-relaxed mb-2">
                                                        Great news! Your order <span className="font-semibold text-gray-900">{customer.order}</span> has been confirmed and will arrive on <span className="font-semibold text-gray-900">{customer.date}</span>.
                                                    </p>
                                                    <div className="bg-gray-100 p-2 rounded mb-2">
                                                        <p className="text-xs text-gray-600">Order: {customer.order}</p>
                                                        <p className="text-xs text-gray-600">Delivery: {customer.date}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button className="flex-1 py-1.5 text-xs text-blue-600 font-medium border border-blue-600 rounded">
                                                            Track Order
                                                        </button>
                                                    </div>
                                                    <div className="text-right mt-1">
                                                        <p className="text-xs text-gray-400">2:{15 + idx} PM ✓✓</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Feature 5: Simple Dashboard */}
                            {activeFeature === 4 && (
                                <>
                                    <div className="absolute left-8 top-8 w-[280px] bg-white rounded-2xl shadow-xl border-4 border-gray-800 overflow-hidden">
                                        <div className="bg-[#075e54] px-4 py-3 text-white">
                                            <h3 className="font-semibold">Team Dashboard</h3>
                                        </div>
                                        <div className="p-4 space-y-3 bg-gray-50">
                                            <div className="bg-white p-3 rounded-lg">
                                                <p className="text-xs font-semibold text-gray-900 mb-2">Quick Actions</p>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button className="bg-green-50 p-3 rounded-lg text-center hover:bg-green-100">
                                                        <Send className="w-5 h-5 text-green-600 mx-auto mb-1" />
                                                        <p className="text-xs font-medium text-green-900">Send</p>
                                                    </button>
                                                    <button className="bg-blue-50 p-3 rounded-lg text-center hover:bg-blue-100">
                                                        <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                                                        <p className="text-xs font-medium text-blue-900">Contacts</p>
                                                    </button>
                                                    <button className="bg-purple-50 p-3 rounded-lg text-center hover:bg-purple-100">
                                                        <MessageSquare className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                                                        <p className="text-xs font-medium text-purple-900">Templates</p>
                                                    </button>
                                                    <button className="bg-orange-50 p-3 rounded-lg text-center hover:bg-orange-100">
                                                        <BarChart3 className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                                                        <p className="text-xs font-medium text-orange-900">Analytics</p>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg space-y-2">
                                                <p className="text-xs font-semibold text-gray-700">Recent Campaigns</p>
                                                {['Holiday Sale', 'New Arrivals', 'Weekly Newsletter'].map((campaign, idx) => (
                                                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                        <div>
                                                            <p className="text-xs font-medium text-gray-900">{campaign}</p>
                                                            <p className="text-xs text-gray-500">{1200 + idx * 300} sent</p>
                                                        </div>
                                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                <p className="text-xs font-semibold text-green-900">✓ No Coding Required</p>
                                                <p className="text-xs text-green-700 mt-1">Click, type, send. That's it!</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute right-8 top-16 w-[320px] bg-white rounded-2xl shadow-xl border-4 border-gray-800 overflow-hidden">
                                        <div className="bg-white px-4 py-3 border-b">
                                            <h3 className="font-bold text-gray-900">Create Campaign</h3>
                                            <p className="text-xs text-gray-500">3 easy steps</p>
                                        </div>
                                        <div className="p-4 space-y-4 bg-gray-50 min-h-[420px]">
                                            <div className="bg-white p-4 rounded-lg border-2 border-green-500">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                        1
                                                    </div>
                                                    <p className="text-sm font-semibold text-gray-900">Import Contacts</p>
                                                </div>
                                                <div className="bg-gray-50 p-3 rounded border-2 border-dashed border-gray-300 text-center">
                                                    <Users className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                                                    <p className="text-xs text-gray-600">Upload CSV or Excel</p>
                                                </div>
                                            </div>
                                            <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                        2
                                                    </div>
                                                    <p className="text-sm font-semibold text-gray-900">Write Message</p>
                                                </div>
                                                <div className="bg-gray-50 p-3 rounded">
                                                    <p className="text-xs text-gray-600">Select template or type your message...</p>
                                                </div>
                                            </div>
                                            <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                        3
                                                    </div>
                                                    <p className="text-sm font-semibold text-gray-900">Send Campaign</p>
                                                </div>
                                                <button className="w-full py-2.5 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 flex items-center justify-center gap-2">
                                                    <Send className="w-4 h-4" />
                                                    Send to All
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Progress Dots */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                                {features.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleFeatureClick(index)}
                                        className={`h-2 rounded-full transition-all ${index === activeFeature ? 'bg-green-600 w-8' : 'bg-gray-300 w-2'
                                            }`}
                                    />
                                ))}
                            </div>

                        </div>
                            {/* Mobile/Tablet Navigation Arrows - Bottom Right */}
                            <div className="lg:hidden flex justify-end gap-3 mt-4">
                                <button
                                    onClick={prevFeature}
                                    className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all border border-gray-200"
                                >
                                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                                </button>
                                <button
                                    onClick={nextFeature}
                                    className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all border border-gray-200"
                                >
                                    <ChevronRight className="w-5 h-5 text-gray-700" />
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;