import { Order, Product, Robot, Analytics, User } from '../types';

export const sampleOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    items: [
      { id: '1', productId: 'PROD-001', productName: 'Electronics Component A', quantity: 5, unitPrice: 25.99 },
      { id: '2', productId: 'PROD-002', productName: 'Wire Harness B', quantity: 2, unitPrice: 45.50 }
    ],
    status: 'sorting',
    priority: 'high',
    totalAmount: 220.95,
    createdAt: '2024-01-15T10:30:00Z',
    estimatedCompletion: '2024-01-15T14:30:00Z',
    robotAssigned: 'ROB-001',
    location: 'Warehouse A'
  },
  {
    id: 'ORD-002',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@company.com',
    items: [
      { id: '3', productId: 'PROD-003', productName: 'Automotive Part C', quantity: 10, unitPrice: 15.75 }
    ],
    status: 'completed',
    priority: 'medium',
    totalAmount: 157.50,
    createdAt: '2024-01-15T09:15:00Z',
    estimatedCompletion: '2024-01-15T12:00:00Z',
    robotAssigned: 'ROB-002',
    location: 'Warehouse B'
  },
  {
    id: 'ORD-003',
    customerName: 'Mike Davis',
    customerEmail: 'mike.davis@tech.com',
    items: [
      { id: '4', productId: 'PROD-004', productName: 'Circuit Board D', quantity: 3, unitPrice: 89.99 },
      { id: '5', productId: 'PROD-001', productName: 'Electronics Component A', quantity: 7, unitPrice: 25.99 }
    ],
    status: 'pending',
    priority: 'urgent',
    totalAmount: 451.90,
    createdAt: '2024-01-15T11:45:00Z',
    estimatedCompletion: '2024-01-15T16:30:00Z',
    location: 'Warehouse A'
  },
  {
    id: 'ORD-004',
    customerName: 'Lisa Wilson',
    customerEmail: 'lisa.w@manufacturing.com',
    items: [
      { id: '6', productId: 'PROD-005', productName: 'Industrial Sensor E', quantity: 15, unitPrice: 32.00 }
    ],
    status: 'processing',
    priority: 'low',
    totalAmount: 480.00,
    createdAt: '2024-01-15T08:20:00Z',
    estimatedCompletion: '2024-01-15T15:45:00Z',
    robotAssigned: 'ROB-003',
    location: 'Warehouse C'
  }
];

export const sampleProducts: Product[] = [
  {
    id: 'PROD-001',
    name: 'Electronics Component A',
    category: 'Electronics',
    stock: 150,
    price: 25.99,
    weight: 0.2,
    dimensions: { length: 5, width: 3, height: 1 },
    sortingBin: 'BIN-A01',
    lastUpdated: '2024-01-15T10:00:00Z'
  },
  {
    id: 'PROD-002',
    name: 'Wire Harness B',
    category: 'Automotive',
    stock: 75,
    price: 45.50,
    weight: 0.8,
    dimensions: { length: 25, width: 5, height: 3 },
    sortingBin: 'BIN-B02',
    lastUpdated: '2024-01-15T09:30:00Z'
  },
  {
    id: 'PROD-003',
    name: 'Automotive Part C',
    category: 'Automotive',
    stock: 200,
    price: 15.75,
    weight: 0.3,
    dimensions: { length: 8, width: 6, height: 2 },
    sortingBin: 'BIN-B03',
    lastUpdated: '2024-01-15T11:15:00Z'
  },
  {
    id: 'PROD-004',
    name: 'Circuit Board D',
    category: 'Electronics',
    stock: 45,
    price: 89.99,
    weight: 0.1,
    dimensions: { length: 10, width: 8, height: 0.5 },
    sortingBin: 'BIN-A04',
    lastUpdated: '2024-01-15T08:45:00Z'
  },
  {
    id: 'PROD-005',
    name: 'Industrial Sensor E',
    category: 'Industrial',
    stock: 80,
    price: 32.00,
    weight: 0.4,
    dimensions: { length: 6, width: 4, height: 4 },
    sortingBin: 'BIN-C05',
    lastUpdated: '2024-01-15T10:20:00Z'
  }
];

export const sampleRobots: Robot[] = [
  {
    id: 'ROB-001',
    name: 'Alpha Sorter',
    status: 'active',
    currentTask: 'Processing Order ORD-001',
    batteryLevel: 85,
    location: 'Warehouse A - Zone 1',
    efficiency: 94.5,
    lastMaintenance: '2024-01-10T14:00:00Z',
    totalOrdersProcessed: 1247
  },
  {
    id: 'ROB-002',
    name: 'Beta Sorter',
    status: 'idle',
    currentTask: null,
    batteryLevel: 92,
    location: 'Warehouse B - Zone 2',
    efficiency: 91.2,
    lastMaintenance: '2024-01-12T09:00:00Z',
    totalOrdersProcessed: 1089
  },
  {
    id: 'ROB-003',
    name: 'Gamma Sorter',
    status: 'active',
    currentTask: 'Processing Order ORD-004',
    batteryLevel: 67,
    location: 'Warehouse C - Zone 1',
    efficiency: 88.7,
    lastMaintenance: '2024-01-08T16:30:00Z',
    totalOrdersProcessed: 934
  },
  {
    id: 'ROB-004',
    name: 'Delta Sorter',
    status: 'maintenance',
    currentTask: null,
    batteryLevel: 100,
    location: 'Maintenance Bay',
    efficiency: 96.1,
    lastMaintenance: '2024-01-15T11:00:00Z',
    totalOrdersProcessed: 1356
  }
];

export const sampleAnalytics: Analytics = {
  totalOrders: 1247,
  completedOrders: 1089,
  pendingOrders: 158,
  totalRevenue: 247850.50,
  averageProcessingTime: 3.2,
  robotEfficiency: 92.6,
  dailyOrders: [
    { date: '2024-01-09', count: 45 },
    { date: '2024-01-10', count: 52 },
    { date: '2024-01-11', count: 38 },
    { date: '2024-01-12', count: 67 },
    { date: '2024-01-13', count: 43 },
    { date: '2024-01-14', count: 59 },
    { date: '2024-01-15', count: 71 }
  ],
  ordersByStatus: [
    { status: 'completed', count: 1089 },
    { status: 'processing', count: 89 },
    { status: 'sorting', count: 45 },
    { status: 'pending', count: 24 }
  ],
  revenueByMonth: [
    { month: 'Aug', revenue: 198450 },
    { month: 'Sep', revenue: 215600 },
    { month: 'Oct', revenue: 234800 },
    { month: 'Nov', revenue: 189300 },
    { month: 'Dec', revenue: 267900 },
    { month: 'Jan', revenue: 247850 }
  ]
};

export const sampleUsers: User[] = [
  {
    id: 'USR-001',
    name: 'Admin User',
    email: 'admin@whr-sorting.com',
    role: 'admin',
    lastLogin: '2024-01-15T12:30:00Z',
    isActive: true
  },
  {
    id: 'USR-002',
    name: 'Jane Operator',
    email: 'jane.operator@whr-sorting.com',
    role: 'operator',
    lastLogin: '2024-01-15T11:45:00Z',
    isActive: true
  },
  {
    id: 'USR-003',
    name: 'Bob Viewer',
    email: 'bob.viewer@whr-sorting.com',
    role: 'viewer',
    lastLogin: '2024-01-14T16:20:00Z',
    isActive: true
  },
  {
    id: 'USR-004',
    name: 'Carol Manager',
    email: 'carol.manager@whr-sorting.com',
    role: 'admin',
    lastLogin: '2024-01-15T09:15:00Z',
    isActive: false
  }
];