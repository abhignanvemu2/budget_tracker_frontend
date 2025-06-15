import React from 'react';
import { Link } from 'react-router-dom';

const RecentTransactions = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No recent transactions</p>
        <Link to="/transactions" className="text-primary-600 hover:text-primary-700 text-sm">
          Add your first transaction
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: transaction.category_color }}
            ></div>
            <div>
              <p className="font-medium text-gray-900">{transaction.title}</p>
              <p className="text-sm text-gray-500">{transaction.category_name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-semibold ${
              transaction.type === 'income' ? 'text-success-600' : 'text-danger-600'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(transaction.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
      
      <div className="pt-4 text-center">
        <Link 
          to="/transactions" 
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          View all transactions →
        </Link>
      </div>
    </div>
  );
};

export default RecentTransactions;