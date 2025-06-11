export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'sorting' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  totalAmount: number;
  createdAt: string;
  estimatedCompletion: string;
  robotAssigned?: string;
  location: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  sortingBin: string;
  lastUpdated: string;
}

export interface Robot {
  id: string;
  name: string;
  status: 'idle' | 'active' | 'maintenance' | 'error';
  currentTask: string | null;
  batteryLevel: number;
  location: string;
  efficiency: number;
  lastMaintenance: string;
  totalOrdersProcessed: number;
}

export interface Analytics {
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  averageProcessingTime: number;
  robotEfficiency: number;
  dailyOrders: { date: string; count: number }[];
  ordersByStatus: { status: string; count: number }[];
  revenueByMonth: { month: string; revenue: number }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  lastLogin: string;
  isActive: boolean;
}