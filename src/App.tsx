import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import OrderManagement from './components/OrderManagement';
import ProductManagement from './components/ProductManagement';
import RobotControl from './components/RobotControl';
import Analytics from './components/Analytics';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'orders':
        return <OrderManagement />;
      case 'products':
        return <ProductManagement />;
      case 'robots':
        return <RobotControl />;
      case 'analytics':
        return <Analytics />;
      case 'users':
        return (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Management</h2>
            <p className="text-gray-600">User management functionality coming soon...</p>
          </div>
        );
      case 'logs':
        return (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">System Logs</h2>
            <p className="text-gray-600">System logs and audit trail coming soon...</p>
          </div>
        );
      case 'monitoring':
        return (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Live Monitoring</h2>
            <p className="text-gray-600">Real-time system monitoring dashboard coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">System configuration and settings coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="ml-64 p-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;