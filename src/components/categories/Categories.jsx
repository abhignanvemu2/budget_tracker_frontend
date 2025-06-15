import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import toast from 'react-hot-toast';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [filter]);

  const fetchCategories = async () => {
    try {
      const params = filter ? `?type=${filter}` : '';
      const response = await api.get(`/transactions/categories/${params}`);
      setCategories(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (categoryData) => {
    try {
      await api.post('/transactions/categories/', categoryData);
      toast.success('Category created successfully');
      setShowForm(false);
      fetchCategories();
    } catch (error) {
      toast.error('Failed to create category');
      throw error;
    }
  };

  const handleUpdateCategory = async (categoryData) => {
    try {
      await api.put(`/transactions/categories/${editingCategory.id}/`, categoryData);
      toast.success('Category updated successfully');
      setEditingCategory(null);
      setShowForm(false);
      fetchCategories();
    } catch (error) {
      toast.error('Failed to update category');
      throw error;
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category? This will affect related transactions.')) {
      try {
        await api.delete(`/transactions/categories/${id}/`);
        toast.success('Category deleted successfully');
        fetchCategories();
      } catch (error) {
        toast.error('Failed to delete category');
      }
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Add Category
        </button>
      </div>

      <div className="card">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFilter('')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === '' 
                ? 'bg-primary-100 text-primary-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Categories
          </button>
          <button
            onClick={() => setFilter('income')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'income' 
                ? 'bg-success-100 text-success-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setFilter('expense')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'expense' 
                ? 'bg-danger-100 text-danger-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Expense
          </button>
        </div>

        <CategoryList
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDeleteCategory}
        />
      </div>

      {showForm && (
        <CategoryForm
          category={editingCategory}
          onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory}
          onClose={() => {
            setShowForm(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
};

export default Categories;