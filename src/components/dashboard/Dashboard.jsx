import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import FinancialSummaryChart from './FinancialSummaryChart';
import RecentTransactions from './RecentTransactions';
import BudgetOverview from './BudgetOverview';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [summaryRes, transactionsRes, budgetsRes] = await Promise.all([
        api.get('/transactions/summary/'),
        api.get('/transactions/?limit=5'),
        api.get('/budgets/')
      ]);

      setSummary(summaryRes.data);
      setRecentTransactions(transactionsRes.data.results || transactionsRes.data);
      setBudgets(budgetsRes.data.results || budgetsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-success-600">
                  ${summary.totals.income.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-success-50 rounded-full">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-danger-600">
                  ${summary.totals.expenses.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-danger-50 rounded-full">
                <span className="text-2xl">📉</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Balance</p>
                <p className={`text-2xl font-bold ${
                  summary.totals.balance >= 0 ? 'text-success-600' : 'text-danger-600'
                }`}>
                  ${summary.totals.balance.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-primary-50 rounded-full">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Financial Summary Chart */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Financial Overview
          </h2>
          {summary && <FinancialSummaryChart data={summary} />}
        </div>

        {/* Budget Overview */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Budget Overview
          </h2>
          <BudgetOverview budgets={budgets} />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Transactions
        </h2>
        <RecentTransactions transactions={recentTransactions} />
      </div>
    </div>
  );
};

export default Dashboard;