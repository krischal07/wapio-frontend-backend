import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY || currentScrollY < 10) {
                // Scrolling up or near top
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down and past threshold
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    
    return (
        <header className={`sticky top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 transition-transform duration-300 ease-in-out ${isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer ">
                        <span className="font-bold text-2xl md:text-3xl text-gray-900"><span className="text-green-500 font-bold text-2xl md:text-3xl">wa</span>pio</span>

                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#" className="text-gray-600 hover:text-black font-medium transition-colors text-sm md:text-base">Features</a>
                        <a href="#" className="text-gray-600 hover:text-black font-medium transition-colors text-sm md:text-base">Pricing</a>
                        <a href="#" className="text-gray-600 hover:text-black font-medium transition-colors text-sm md:text-base">Resources</a>
                        <a href="#" className="text-gray-600 hover:text-black font-medium transition-colors text-sm md:text-base">Support</a>
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/login')}
                            className="px-6 py-2 text-gray-700 text-sm md:text-base font-semibold hover:text-black transition-colors"
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => navigate('/signup')}
                            className="relative px-6 md:px-10 py-2 md:py-3 text-white bg-green-500 text-sm md:text-base font-bold rounded-lg border-2 border-black transition-all hover:translate-x-[4px] hover:translate-y-[4px] shadow-[4px_4px_0px_0px_rgba(1,1,1,1)] hover:shadow-none cursor-pointer"
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-100 focus:outline-none"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50">Features</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50">Pricing</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50">Resources</a>
                        <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50">Support</a>
                        <div className="pt-4 pb-2 space-y-2">
                            <button 
                                onClick={() => navigate('/login')}
                                className="w-full px-4 py-3 text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
                            >
                                Login
                            </button>
                            <button 
                                onClick={() => navigate('/signup')}
                                className="relative w-full px-4 py-3 bg-green-500 text-white font-bold rounded-lg border-2 border-black transition-all hover:translate-x-[4px] hover:translate-y-[4px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none cursor-pointer"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;