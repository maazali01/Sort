import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Package, 
  TrendingDown, 
  TrendingUp, 
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { sampleProducts } from '../data/sampleData';

const ProductCard = ({ product }: { product: any }) => {
  const isLowStock = product.stock < 50;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.category}</p>
          <p className="text-xs text-gray-500">ID: {product.id}</p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className="text-lg font-bold text-green-600">${product.price}</span>
          {isLowStock ? (
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full flex items-center space-x-1">
              <AlertTriangle className="h-3 w-3" />
              <span>Low Stock</span>
            </span>
          ) : (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center space-x-1">
              <CheckCircle className="h-3 w-3" />
              <span>In Stock</span>
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Stock Level</p>
          <div className="flex items-center space-x-2">
            <span className={`text-lg font-bold ${isLowStock ? 'text-red-600' : 'text-gray-900'}`}>
              {product.stock}
            </span>
            <span className="text-sm text-gray-500">units</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600">Weight</p>
          <p className="text-lg font-semibold text-gray-900">{product.weight} kg</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Sorting Bin</p>
          <p className="text-sm font-medium text-blue-600">{product.sortingBin}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Dimensions</p>
          <p className="text-xs text-gray-600">
            {product.dimensions.length}×{product.dimensions.width}×{product.dimensions.height} cm
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Updated: {new Date(product.lastUpdated).toLocaleDateString()}
          </p>
          <div className="flex space-x-2">
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
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
};

export default function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const totalProducts = sampleProducts.length;
  const lowStockProducts = sampleProducts.filter(p => p.stock < 50).length;
  const totalValue = sampleProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const categories = [...new Set(sampleProducts.map(p => p.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Product Management</h1>
            <p className="text-blue-100">Manage inventory, pricing, and product information</p>
          </div>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-l-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
              <p className="text-3xl font-bold text-gray-900">{lowStockProducts}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingDown className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inventory Value</p>
              <p className="text-3xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-3xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Package className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export Inventory
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Package className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
}