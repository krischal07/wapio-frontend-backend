import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, MessageSquare, BarChart3, FileText, Users, Settings, LogOut, Send } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Send, label: 'Send Message', path: '/dashboard/send' },
    { icon: MessageSquare, label: 'Campaigns', path: '/dashboard/campaigns' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: FileText, label: 'Templates', path: '/dashboard/templates' },
    { icon: Users, label: 'Contacts', path: '/dashboard/contacts' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#0f0f0f] border-r border-white/5 hidden lg:block z-50">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl text-white">
            <span className="text-green-500">wa</span>pio
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-green-500/10 text-green-500'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
        {/* User Info */}
        {user && (
          <div className="px-4 py-3 mb-2 rounded-lg bg-white/5">
            <p className="text-sm font-medium text-white truncate">{user.name}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
        )}
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
