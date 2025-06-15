import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import BudgetForm from './BudgetForm';
import BudgetList from './BudgetList';
import BudgetAnalysis from './BudgetAnalysis';
import toast from 'react-hot-toast';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchBudgets();
    fetchCategories();
    fetchAnalysis();
  }, [selectedMonth, selectedYear]);

  const fetchBudgets = async () => {
    try {
      const response = await api.get(`/budgets/?month=${selectedMonth}&year=${selectedYear}`);
      setBudgets(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
      toast.error('Failed to fetch budgets');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/transactions/categories/?type=expense');
      setCategories(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchAnalysis = async () => {
    try {
      const response = await api.get(`/budgets/analysis/?month=${selectedMonth}&year=${selectedYear}`);
      setAnalysis(response.data);
    } catch (error) {
      console.error('Error fetching budget analysis:', error);
    }
  };

  const handleCreateBudget = async (budgetData) => {
    try {
      await api.post('/budgets/', {
        ...budgetData,
        month: selectedMonth,
        year: selectedYear
      });
      toast.success('Budget created successfully');
      setShowForm(false);
      fetchBudgets();
      fetchAnalysis();
    } catch (error) {
      toast.error('Failed to create budget');
      throw error;
    }
  };

  const handleUpdateBudget = async (budgetData) => {
    try {
      await api.put(`/budgets/${editingBudget.id}/`, budgetData);
      toast.success('Budget updated successfully');
      setEditingBudget(null);
      setShowForm(false);
      fetchBudgets();
      fetchAnalysis();
    } catch (error) {
      toast.error('Failed to update budget');
      throw error;
    }
  };

  const handleDeleteBudget = async (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      try {
        await api.delete(`/budgets/${id}/`);
        toast.success('Budget deleted successfully');
        fetchBudgets();
        fetchAnalysis();
      } catch (error) {
        toast.error('Failed to delete budget');
      }
    }
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setShowForm(true);
  };

  const handleMonthYearChange = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Budgets</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Add Budget
        </button>
      </div>

      {/* Month/Year Selector */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Month
            </label>
            <select
              className="input-field"
              value={selectedMonth}
              onChange={(e) => handleMonthYearChange(parseInt(e.target.value), selectedYear)}
            >
              {monthNames.map((month, index) => (
                <option key={month} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <select
              className="input-field"
              value={selectedYear}
              onChange={(e) => handleMonthYearChange(selectedMonth, parseInt(e.target.value))}
            >
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Budget Analysis */}
      {analysis && (
        <BudgetAnalysis 
          analysis={analysis} 
          month={monthNames[selectedMonth - 1]} 
          year={selectedYear} 
        />
      )}

      {/* Budget List */}
      <BudgetList
        budgets={budgets}
        onEdit={handleEdit}
        onDelete={handleDeleteBudget}
      />

      {showForm && (
        <BudgetForm
          budget={editingBudget}
          categories={categories}
          month={selectedMonth}
          year={selectedYear}
          onSubmit={editingBudget ? handleUpdateBudget : handleCreateBudget}
          onClose={() => {
            setShowForm(false);
            setEditingBudget(null);
          }}
        />
      )}
    </div>
  );
};

export default Budgets;