import React from 'react';

const BudgetList = ({ budgets, onEdit, onDelete }) => {
  if (!budgets || budgets.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-gray-500">No budgets found for this period</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {budgets.map((budget) => (
        <div key={budget.id} className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{budget.name}</h3>
              <p className="text-sm text-gray-500">
                {budget.category_name || 'All Categories'}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(budget)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(budget.id)}
                className="text-sm text-danger-600 hover:text-danger-700"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Budget: ${budget.amount.toLocaleString()}</span>
              <span>Spent: ${budget.spent_amount.toLocaleString()}</span>
              <span className={
                budget.remaining_amount >= 0 ? 'text-success-600' : 'text-danger-600'
              }>
                Remaining: ${budget.remaining_amount.toLocaleString()}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  budget.percentage_used > 100 
                    ? 'bg-danger-500' 
                    : budget.percentage_used > 80 
                    ? 'bg-warning-500' 
                    : 'bg-success-500'
                }`}
                style={{ 
                  width: `${Math.min(budget.percentage_used, 100)}%` 
                }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className={`font-medium ${
                budget.percentage_used > 100 
                  ? 'text-danger-600' 
                  : budget.percentage_used > 80 
                  ? 'text-warning-600' 
                  : 'text-success-600'
              }`}>
                {budget.percentage_used.toFixed(1)}% used
              </span>
              {budget.percentage_used > 100 && (
                <span className="text-danger-600 font-medium">
                  Over budget!
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BudgetList;