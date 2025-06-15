import React from 'react';

const CategoryList = ({ categories, onEdit, onDelete }) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No categories found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              ></div>
              <h3 className="font-medium text-gray-900">{category.name}</h3>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              category.type === 'income'
                ? 'bg-success-100 text-success-700'
                : 'bg-danger-100 text-danger-700'
            }`}>
              {category.type}
            </span>
          </div>

          <div className="text-xs text-gray-500 mb-3">
            Created {new Date(category.created_at).toLocaleDateString()}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => onEdit(category)}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(category.id)}
              className="text-sm text-danger-600 hover:text-danger-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;