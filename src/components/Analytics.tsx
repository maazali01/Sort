import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react';
import { sampleAnalytics } from '../data/sampleData';

const MetricCard = ({ title, value, change, changeType, icon: Icon }: any) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {change && (
          <div className="flex items-center mt-2">
            {changeType === 'increase' ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </span>
          </div>
        )}
      </div>
      <div className="p-3 bg-blue-100 rounded-lg">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
    </div>
  </div>
);

const DailyOrdersChart = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Daily Orders (Last 7 Days)</h3>
      <button className="text-blue-600 hover:text-blue-800">
        <RefreshCw className="h-4 w-4" />
      </button>
    </div>
    <div className="space-y-3">
      {sampleAnalytics.dailyOrders.map((day, index) => {
        const maxCount = Math.max(...sampleAnalytics.dailyOrders.map(d => d.count));
        const percentage = (day.count / maxCount) * 100;
        
        return (
          <div key={day.date} className="flex items-center">
            <div className="w-16 text-sm font-medium text-gray-700">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-gray-200 rounded-full h-6 relative">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-6 rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2"
                  style={{ width: `${percentage}%` }}
                >
                  <span className="text-xs font-semibold text-white">{day.count}</span>
                </div>
              </div>
            </div>
            <div className="w-12 text-sm font-semibold text-gray-900 text-right">
              {day.count}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const RevenueChart = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Revenue Trend (6 Months)</h3>
      <button className="text-blue-600 hover:text-blue-800">
        <Download className="h-4 w-4" />
      </button>
    </div>
    <div className="space-y-3">
      {sampleAnalytics.revenueByMonth.map((month, index) => {
        const maxRevenue = Math.max(...sampleAnalytics.revenueByMonth.map(m => m.revenue));
        const percentage = (month.revenue / maxRevenue) * 100;
        
        return (
          <div key={month.month} className="flex items-center">
            <div className="w-12 text-sm font-medium text-gray-700">
              {month.month}
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-gray-200 rounded-full h-8 relative">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-8 rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-3"
                  style={{ width: `${percentage}%` }}
                >
                  <span className="text-sm font-semibold text-white">
                    ${(month.revenue / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>
            </div>
            <div className="w-20 text-sm font-semibold text-gray-900 text-right">
              ${month.revenue.toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const OrderStatusDistribution = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Order Status Distribution</h3>
      <PieChart className="h-5 w-5 text-gray-400" />
    </div>
    <div className="space-y-4">
      {sampleAnalytics.ordersByStatus.map((status, index) => {
        const colors = [
          { bg: 'bg-green-500', text: 'text-green-500', light: 'bg-green-100' },
          { bg: 'bg-blue-500', text: 'text-blue-500', light: 'bg-blue-100' },
          { bg: 'bg-yellow-500', text: 'text-yellow-500', light: 'bg-yellow-100' },
          { bg: 'bg-gray-500', text: 'text-gray-500', light: 'bg-gray-100' }
        ];
        const color = colors[index];
        const percentage = ((status.count / sampleAnalytics.totalOrders) * 100).toFixed(1);
        
        return (
          <div key={status.status} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${color.bg}`}></div>
              <span className="font-medium text-gray-900 capitalize">{status.status}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{percentage}%</span>
              <span className="font-semibold text-gray-900">{status.count}</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics & Reports</h1>
            <p className="text-blue-100">Comprehensive insights into your sorting operations</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
            </button>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={`$${sampleAnalytics.totalRevenue.toLocaleString()}`}
          change="+12.5% vs last month"
          changeType="increase"
          icon={TrendingUp}
        />
        <MetricCard
          title="Orders Processed"
          value={sampleAnalytics.completedOrders.toLocaleString()}
          change="+8.2% vs last month"
          changeType="increase"
          icon={BarChart3}
        />
        <MetricCard
          title="Avg Processing Time"
          value={`${sampleAnalytics.averageProcessingTime}h`}
          change="-15% improvement"
          changeType="increase"
          icon={TrendingDown}
        />
        <MetricCard
          title="Robot Efficiency"
          value={`${sampleAnalytics.robotEfficiency}%`}
          change="+3.1% vs last week"
          changeType="increase"
          icon={TrendingUp}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailyOrdersChart />
        <OrderStatusDistribution />
      </div>

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Performance Insights */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">97.8%</div>
            <div className="text-sm text-gray-600">Order Accuracy Rate</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">2.1h</div>
            <div className="text-sm text-gray-600">Avg Fulfillment Time</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-2">99.2%</div>
            <div className="text-sm text-gray-600">System Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
}