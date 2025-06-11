import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  User,
  MapPin,
  Calendar
} from 'lucide-react';
import { sampleOrders } from '../data/sampleData';
import { Order } from '../types';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  processing: 'bg-blue-100 text-blue-800 border-blue-200',
  sorting: 'bg-purple-100 text-purple-800 border-purple-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
};

const StatusIcon = ({ status }: { status: Order['status'] }) => {
  const icons = {
    pending: Clock,
    processing: AlertCircle,
    sorting: Eye,
    completed: CheckCircle,
    cancelled: XCircle
  };
  
  const Icon = icons[status];
  return <Icon className="h-4 w-4" />;
};

const OrderCard = ({ order }: { order: Order }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{order.id}</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{order.customerName}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{order.location}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <span className={`px-3 py-1 text-xs font-medium rounded-full border flex items-center space-x-1 ${statusColors[order.status]}`}>
          <StatusIcon status={order.status} />
          <span className="capitalize">{order.status}</span>
        </span>
        <span className={`px-2 py-1 text-xs font-medium rounded ${priorityColors[order.priority]}`}>
          {order.priority.toUpperCase()}
        </span>
      </div>
    </div>

    <div className="border-t border-gray-200 pt-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Items</p>
          <p className="font-semibold">{order.items.length} products</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="font-semibold text-green-600">${order.totalAmount.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Created</p>
          <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Est. Completion</p>
          <p className="font-medium">{new Date(order.estimatedCompletion).toLocaleTimeString()}</p>
        </div>
      </div>

      {order.robotAssigned && (
        <div className="flex items-center space-x-2 mb-4 p-2 bg-blue-50 rounded">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-sm font-medium text-blue-800">Assigned to {order.robotAssigned}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {order.items.map(item => item.productName).join(', ')}
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
            <Edit className="h-4 w-4" />
          </button>
          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredOrders = sampleOrders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Order Management</h1>
            <p className="text-blue-100">Manage and track all customer orders in real-time</p>
          </div>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>New Order</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="sorting">Sorting</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>

          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="h-5 w-5" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-900">{sampleOrders.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600">Completed</h3>
          <p className="text-2xl font-bold text-green-600">
            {sampleOrders.filter(o => o.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600">In Progress</h3>
          <p className="text-2xl font-bold text-blue-600">
            {sampleOrders.filter(o => ['processing', 'sorting'].includes(o.status)).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {sampleOrders.filter(o => o.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
}