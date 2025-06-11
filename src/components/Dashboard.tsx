import React from 'react';
import { 
  TrendingUp, 
  Package, 
  Clock, 
  DollarSign, 
  Bot, 
  CheckCircle,
  AlertCircle,
  Activity
} from 'lucide-react';
import { sampleAnalytics, sampleOrders, sampleRobots } from '../data/sampleData';

const StatCard = ({ title, value, subtitle, icon: Icon, trend, color }: any) => (
  <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${color} hover:shadow-xl transition-all duration-300`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      <div className={`p-3 rounded-lg ${color.replace('border-l-', 'bg-').replace('-500', '-100')}`}>
        <Icon className={`h-8 w-8 ${color.replace('border-l-', 'text-')}`} />
      </div>
    </div>
    {trend && (
      <div className="flex items-center mt-4">
        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
        <span className="text-sm text-green-600 font-medium">{trend}</span>
      </div>
    )}
  </div>
);

const OrderStatusChart = () => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status Distribution</h3>
    <div className="space-y-4">
      {sampleAnalytics.ordersByStatus.map((status, index) => {
        const colors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-gray-500'];
        const percentage = (status.count / sampleAnalytics.totalOrders) * 100;
        
        return (
          <div key={status.status} className="flex items-center">
            <div className="w-24 text-sm font-medium text-gray-700 capitalize">
              {status.status}
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className={`${colors[index]} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
            <div className="w-16 text-sm font-semibold text-gray-900 text-right">
              {status.count}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const RecentActivity = () => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
    <div className="space-y-4">
      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
        <CheckCircle className="h-5 w-5 text-green-500" />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">Order ORD-002 completed</p>
          <p className="text-xs text-gray-500">2 minutes ago</p>
        </div>
      </div>
      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
        <Bot className="h-5 w-5 text-blue-500" />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">Robot Alpha Sorter assigned to ORD-001</p>
          <p className="text-xs text-gray-500">5 minutes ago</p>
        </div>
      </div>
      <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
        <AlertCircle className="h-5 w-5 text-yellow-500" />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">Low stock alert: Circuit Board D</p>
          <p className="text-xs text-gray-500">15 minutes ago</p>
        </div>
      </div>
      <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
        <Activity className="h-5 w-5 text-purple-500" />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">System performance optimized</p>
          <p className="text-xs text-gray-500">1 hour ago</p>
        </div>
      </div>
    </div>
  </div>
);

const RobotStatus = () => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Robot Fleet Status</h3>
    <div className="grid grid-cols-2 gap-4">
      {sampleRobots.map((robot) => {
        const statusColors = {
          active: 'bg-green-100 text-green-800 border-green-200',
          idle: 'bg-gray-100 text-gray-800 border-gray-200',
          maintenance: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          error: 'bg-red-100 text-red-800 border-red-200'
        };
        
        return (
          <div key={robot.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{robot.name}</h4>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColors[robot.status]}`}>
                {robot.status}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Battery</span>
                <span className="font-medium">{robot.batteryLevel}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Efficiency</span>
                <span className="font-medium">{robot.efficiency}%</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default function Dashboard() {
  const activeRobots = sampleRobots.filter(robot => robot.status === 'active').length;
  const totalRobots = sampleRobots.length;
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-blue-100">Real-time monitoring of your robotic sorting operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={sampleAnalytics.totalOrders.toLocaleString()}
          subtitle="All time orders processed"
          icon={Package}
          trend="+12% from last month"
          color="border-l-blue-500"
        />
        <StatCard
          title="Total Revenue"
          value={`$${sampleAnalytics.totalRevenue.toLocaleString()}`}
          subtitle="Lifetime revenue generated"
          icon={DollarSign}
          trend="+8.2% from last month"
          color="border-l-green-500"
        />
        <StatCard
          title="Avg Processing Time"
          value={`${sampleAnalytics.averageProcessingTime}h`}
          subtitle="Time to complete orders"
          icon={Clock}
          trend="-15% improvement"
          color="border-l-yellow-500"
        />
        <StatCard
          title="Robot Efficiency"
          value={`${sampleAnalytics.robotEfficiency}%`}
          subtitle={`${activeRobots}/${totalRobots} robots active`}
          icon={Bot}
          trend="+3.1% from last week"
          color="border-l-purple-500"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrderStatusChart />
        <RecentActivity />
      </div>

      {/* Robot Status */}
      <RobotStatus />
    </div>
  );
}