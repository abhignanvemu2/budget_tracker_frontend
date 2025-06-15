import React from 'react';

const TransactionFilters = ({ filters, categories, onFilterChange }) => {
  const handleChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  const clearFilters = () => {
    onFilterChange({
      type: '',
      category: '',
      date_from: '',
      date_to: '',
      search: ''
    });
  };

  return (
    <div className="card">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="Search transactions..."
            className="input-field"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            className="input-field"
            value={filters.type}
            onChange={(e) => handleChange('type', e.target.value)}
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            className="input-field"
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From Date
          </label>
          <input
            type="date"
            className="input-field"
            value={filters.date_from}
            onChange={(e) => handleChange('date_from', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Date
          </label>
          <input
            type="date"
            className="input-field"
            value={filters.date_to}
            onChange={(e) => handleChange('date_to', e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={clearFilters}
          className="btn-secondary"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default TransactionFilters;