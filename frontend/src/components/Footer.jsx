import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const apiUrl = import.meta.env.BACKEND_API_URL || 'http://localhost:5001/api';
      console.log('Submitting to:', `${apiUrl}/contact`);
      
      const response = await axios.post(`${apiUrl}/contact`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setStatus('success');
      toast.success(response.data.message || 'Message sent successfully!');
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setStatus('error');
      
      if (error.response?.data?.message) {
        // Server responded with error message
        toast.error(error.response.data.message);
      } else if (error.response?.data?.errors) {
        // Validation errors
        error.response.data.errors.forEach(err => {
          toast.error(err.message);
        });
      } else if (error.request) {
        // Network error
        toast.error('Network error. Please check your connection and try again.');
      } else {
        // Other error
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <footer className="bg-white pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16">

          {/* Left Side - Logo & Links */}
          <div className="lg:w-1/3 space-y-12">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-3xl text-gray-900"><span className="text-green-500 font-bold text-3xl">wa</span>pio</span>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-lg mb-4 text-gray-900">Product</h4>
                <ul className="space-y-3 text-gray-600">
                  <li><a href="#" className="hover:text-green-600 transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">API</a></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">Integration</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-4 text-gray-900">Support</h4>
                <ul className="space-y-3 text-gray-600">
                  <li><a href="#" className="hover:text-green-600 transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">Status</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side - Bubble Form */}
          <div className="lg:w-2/3 relative">
            {/* SVG Background */}
            <div className="absolute inset-0 w-full h-full z-0 drop-shadow-xl">
              {/* Desktop SVG */}
              <svg
                viewBox="0 0 1174 535"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden md:block w-full h-full"
                preserveAspectRatio="none"
              >
                <path d="M1135 0C1156.54 0 1174 17.4609 1174 39V379C1174 400.539 1156.54 418 1135 418H263.549L163.713 527.37C159.276 532.231 152.998 535 146.417 535C133.484 535 123 524.516 123 511.583V418H39C17.4609 418 5.39638e-07 400.539 0 379V39C0 17.4609 17.4609 4.10716e-07 39 0H1135Z" fill="#49D85F" />
              </svg>
              
              {/* Mobile SVG */}
              <svg
                viewBox="0 0 889 973"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="md:hidden w-full h-full"
                preserveAspectRatio="none"
              >
                <path d="M850 0C871.539 0 889 17.4609 889 39V817C889 838.539 871.539 856 850 856H263.549L163.713 965.37C159.276 970.231 152.998 973 146.417 973C133.484 973 123 962.516 123 949.583V856H39C17.4609 856 0 838.539 0 817V39C0 17.4609 17.4609 6.88552e-07 39 0H850Z" fill="#49D85F"/>
              </svg>
            </div>

            {/* Form Content */}
            <div className="relative z-10 p-8 sm:p-12 pb-24 sm:pb-32">
              <h3 className="text-3xl font-bold text-white mb-8">Get in Touch</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-white text-sm font-medium ml-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-green-200 text-white placeholder-green-100 px-2 py-2 focus:outline-none focus:border-white transition-colors"
                      placeholder="Your Name"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-white text-sm font-medium ml-1">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-green-200 text-white placeholder-green-100 px-2 py-2 focus:outline-none focus:border-white transition-colors"
                      placeholder="Your Phone Number"
                    />
                  </div>
                </div>

                {/* Email & Message */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-white text-sm font-medium ml-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-green-200 text-white placeholder-green-100 px-2 py-2 focus:outline-none focus:border-white transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-white text-sm font-medium ml-1">Message</label>
                    <input
                      type="text"
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-green-200 text-white placeholder-green-100 px-2 py-2 focus:outline-none focus:border-white transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                {/* Send Button & Icons */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
                  <button
                    type="submit"
                    className="bg-white/90 hover:bg-white text-green-600 font-semibold py-2 px-8 rounded-lg transition-all shadow-sm hover:shadow-md "
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send'}
                  </button>
                  <div className="flex gap-4 ">
                    <Mail className="w-6 h-6 text-white" strokeWidth={1.5} />
                    <Phone className="w-6 h-6 text-white" strokeWidth={1.5} />
                    <MapPin className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>
            © 2025 Samparka WhatsApp. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-green-600 transition-colors">Privacy Policy</Link>
            <a href="#" className="hover:text-green-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-green-600 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;