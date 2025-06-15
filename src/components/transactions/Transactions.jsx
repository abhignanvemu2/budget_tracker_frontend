import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import TransactionFilters from './TransactionFilters';
import toast from 'react-hot-toast';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    date_from: '',
    date_to: '',
    search: ''
  });
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, [filters, currentPage]);

  const fetchTransactions = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
      });
      
      const response = await api.get(`/transactions/?${params}`);
      setTransactions(response.data.results || response.data);
      setPagination({
        count: response.data.count || 0,
        next: response.data.next,
        previous: response.data.previous
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/transactions/categories/');
      setCategories(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCreateTransaction = async (transactionData) => {
    try {
      await api.post('/transactions/', transactionData);
      toast.success('Transaction created successfully');
      setShowForm(false);
      fetchTransactions();
    } catch (error) {
      toast.error('Failed to create transaction');
      throw error;
    }
  };

  const handleUpdateTransaction = async (transactionData) => {
    try {
      await api.put(`/transactions/${editingTransaction.id}/`, transactionData);
      toast.success('Transaction updated successfully');
      setEditingTransaction(null);
      setShowForm(false);
      fetchTransactions();
    } catch (error) {
      toast.error('Failed to update transaction');
      throw error;
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await api.delete(`/transactions/${id}/`);
        toast.success('Transaction deleted successfully');
        fetchTransactions();
      } catch (error) {
        toast.error('Failed to delete transaction');
      }
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Add Transaction
        </button>
      </div>

      <TransactionFilters
        filters={filters}
        categories={categories}
        onFilterChange={handleFilterChange}
      />

      <TransactionList
        transactions={transactions}
        pagination={pagination}
        currentPage={currentPage}
        onEdit={handleEdit}
        onDelete={handleDeleteTransaction}
        onPageChange={handlePageChange}
      />

      {showForm && (
        <TransactionForm
          transaction={editingTransaction}
          categories={categories}
          onSubmit={editingTransaction ? handleUpdateTransaction : handleCreateTransaction}
          onClose={() => {
            setShowForm(false);
            setEditingTransaction(null);
          }}
        />
      )}
    </div>
  );
};

export default Transactions;