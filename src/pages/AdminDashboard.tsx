import { useState, useEffect } from 'react';
import { FiUsers, FiShoppingBag, FiDollarSign, FiTrendingUp, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { api } from '../services/api';
import { productService } from '../services/productService';
import { deleteCategory } from '../services/categoryService';
import ProductModal from '../components/ProductModal';
import CategoryModal from '../components/CategoryModal';

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalRevenue: number;
  totalOrders: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    totalRevenue: 0,
    totalOrders: 0
  });
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [productModal, setProductModal] = useState({ isOpen: false, product: null });
  const [categoryModal, setCategoryModal] = useState({ isOpen: false, category: null });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productsData, categoriesData, dashboardStats] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
        fetch('http://localhost:5000/api/dashboard/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }).then(res => res.json())
      ]);
      
      setProducts(productsData.products || []);
      setCategories(categoriesData || []);
      
      setStats({
        totalProducts: dashboardStats.totalProducts || 0,
        totalCategories: dashboardStats.totalCategories || 0,
        totalRevenue: dashboardStats.totalRevenue || 0,
        totalOrders: dashboardStats.totalOrders || 0
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Fallback to existing data if API fails
      const [productsData, categoriesData] = await Promise.all([
        api.getProducts(),
        api.getCategories()
      ]);
      
      setProducts(productsData.products || []);
      setCategories(categoriesData || []);
      
      setStats({
        totalProducts: productsData.products?.length || 0,
        totalCategories: categoriesData?.length || 0,
        totalRevenue: 0,
        totalOrders: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId);
        fetchDashboardData();
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(categoryId);
        fetchDashboardData();
      } catch (error) {
        console.error('Failed to delete category:', error);
        alert('Failed to delete category');
      }
    }
  };

  const openProductModal = (product = null) => {
    setProductModal({ isOpen: true, product });
  };

  const closeProductModal = () => {
    setProductModal({ isOpen: false, product: null });
  };

  const openCategoryModal = (category = null) => {
    setCategoryModal({ isOpen: true, category });
  };

  const closeCategoryModal = () => {
    setCategoryModal({ isOpen: false, category: null });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your store and track performance</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiShoppingBag className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCategories}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FiUsers className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FiDollarSign className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FiTrendingUp className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Products Management */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Products</h2>
              <button 
                onClick={() => openProductModal()}
                className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90"
              >
                <FiPlus size={16} />
                Add Product
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.slice(0, 5).map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={product.image || '/placeholder-image.svg'}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover mr-3"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-image.svg';
                          }}
                        />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{product.category?.name || 'N/A'}</td>
                    <td className="px-6 py-4 font-medium">${product.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.quantity > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.quantity} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openProductModal(product)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Categories Management */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Categories</h2>
              <button 
                onClick={() => openCategoryModal()}
                className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90"
              >
                <FiPlus size={16} />
                Add Category
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {categories.map((category) => (
              <div key={category._id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{category.name}</h3>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => openCategoryModal(category)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit size={14} />
                    </button>
                    <button 
                      onClick={() => handleDeleteCategory(category._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProductModal
        isOpen={productModal.isOpen}
        onClose={closeProductModal}
        onSave={fetchDashboardData}
        product={productModal.product}
        categories={categories}
      />
      
      <CategoryModal
        isOpen={categoryModal.isOpen}
        onClose={closeCategoryModal}
        onSave={fetchDashboardData}
        category={categoryModal.category}
      />
    </div>
  );
};

export default AdminDashboard;