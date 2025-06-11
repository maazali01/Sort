import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Bot, 
  BarChart3, 
  Users, 
  Settings, 
  FileText,
  Activity,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Order Management', icon: ShoppingCart },
  { id: 'products', label: 'Product Management', icon: Package },
  { id: 'robots', label: 'Robot Control', icon: Bot },
  { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'logs', label: 'System Logs', icon: FileText },
  { id: 'monitoring', label: 'Live Monitoring', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white h-screen fixed left-0 top-0 shadow-2xl border-r border-slate-700">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              WHR-Sorting
            </h1>
            <p className="text-xs text-slate-400">Robotic Order Management</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-8 px-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white hover:shadow-md'
                }`}
              >
                <Icon 
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isActive ? 'scale-110' : 'group-hover:scale-105'
                  }`} 
                />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full opacity-80"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* System Status */}
      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-300">System Status</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div className="text-xs text-slate-400">
            All systems operational
          </div>
          <div className="mt-2 text-xs text-slate-500">
            4 robots active • 12 orders processing
          </div>
        </div>
      </div>
    </div>
  );
}