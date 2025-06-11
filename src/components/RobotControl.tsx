import React, { useState } from 'react';
import { 
  Bot, 
  Battery, 
  MapPin, 
  Activity, 
  Wrench, 
  Play, 
  Pause, 
  StopCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';
import { sampleRobots } from '../data/sampleData';

const statusIcons = {
  active: { icon: Activity, color: 'text-green-500', bg: 'bg-green-100' },
  idle: { icon: Clock, color: 'text-gray-500', bg: 'bg-gray-100' },
  maintenance: { icon: Wrench, color: 'text-yellow-500', bg: 'bg-yellow-100' },
  error: { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-100' }
};

const RobotCard = ({ robot }: { robot: any }) => {
  const statusConfig = statusIcons[robot.status];
  const StatusIcon = statusConfig.icon;
  
  const getBatteryColor = (level: number) => {
    if (level > 60) return 'bg-green-500';
    if (level > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${statusConfig.bg}`}>
            <Bot className={`h-6 w-6 ${statusConfig.color}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{robot.name}</h3>
            <p className="text-sm text-gray-600">ID: {robot.id}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${statusConfig.bg} ${statusConfig.color}`}>
          <StatusIcon className="h-4 w-4" />
          <span className="capitalize">{robot.status}</span>
        </div>
      </div>

      {/* Current Task */}
      {robot.currentTask && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-800">Current Task</span>
          </div>
          <p className="text-sm text-blue-700 mt-1">{robot.currentTask}</p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Battery Level</span>
            <Battery className={`h-4 w-4 ${robot.batteryLevel > 30 ? 'text-green-500' : 'text-red-500'}`} />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getBatteryColor(robot.batteryLevel)}`}
                style={{ width: `${robot.batteryLevel}%` }}
              ></div>
            </div>
            <span className="text-sm font-semibold">{robot.batteryLevel}%</span>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Efficiency</span>
            <Zap className="h-4 w-4 text-purple-500" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 bg-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${robot.efficiency}%` }}
              ></div>
            </div>
            <span className="text-sm font-semibold">{robot.efficiency}%</span>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-600">Location</span>
          </div>
          <p className="text-sm font-medium text-gray-900">{robot.location}</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">Orders Processed</span>
          </div>
          <p className="text-sm font-medium text-gray-900">{robot.totalOrdersProcessed.toLocaleString()}</p>
        </div>
      </div>

      {/* Maintenance Info */}
      <div className="mb-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-center space-x-2 mb-1">
          <Wrench className="h-4 w-4 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">Last Maintenance</span>
        </div>
        <p className="text-sm text-yellow-700">{new Date(robot.lastMaintenance).toLocaleDateString()}</p>
      </div>

      {/* Control Buttons */}
      <div className="flex space-x-2">
        {robot.status === 'active' ? (
          <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
            <Pause className="h-4 w-4" />
            <span>Pause</span>
          </button>
        ) : (
          <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Play className="h-4 w-4" />
            <span>Start</span>
          </button>
        )}
        <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          <StopCircle className="h-4 w-4" />
          <span>Stop</span>
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
          <Wrench className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default function RobotControl() {
  const [selectedRobot, setSelectedRobot] = useState<string | null>(null);
  
  const activeRobots = sampleRobots.filter(robot => robot.status === 'active').length;
  const idleRobots = sampleRobots.filter(robot => robot.status === 'idle').length;
  const maintenanceRobots = sampleRobots.filter(robot => robot.status === 'maintenance').length;
  const avgEfficiency = sampleRobots.reduce((sum, robot) => sum + robot.efficiency, 0) / sampleRobots.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Robot Control Center</h1>
            <p className="text-blue-100">Monitor and control your robotic fleet operations</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Fleet Status</p>
            <p className="text-2xl font-bold">{activeRobots}/{sampleRobots.length} Active</p>
          </div>
        </div>
      </div>

      {/* Fleet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Robots</p>
              <p className="text-3xl font-bold text-green-600">{activeRobots}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-l-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Idle Robots</p>
              <p className="text-3xl font-bold text-gray-600">{idleRobots}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <Clock className="h-8 w-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-l-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Maintenance</p>
              <p className="text-3xl font-bold text-yellow-600">{maintenanceRobots}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Wrench className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Efficiency</p>
              <p className="text-3xl font-bold text-purple-600">{avgEfficiency.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Zap className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fleet Controls</h3>
        <div className="flex space-x-4">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Play className="h-4 w-4" />
            <span>Start All</span>
          </button>
          <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2">
            <Pause className="h-4 w-4" />
            <span>Pause All</span>
          </button>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
            <StopCircle className="h-4 w-4" />
            <span>Emergency Stop</span>
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Optimize Routes
          </button>
        </div>
      </div>

      {/* Robot Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sampleRobots.map((robot) => (
          <RobotCard key={robot.id} robot={robot} />
        ))}
      </div>
    </div>
  );
}