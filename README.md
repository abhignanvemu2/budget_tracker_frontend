# Personal Budget Tracker - Frontend

React frontend for the Personal Budget Tracker application with modern UI and interactive data visualizations.

## 🎨 Architecture
```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── auth/           # Authentication components
│   │   ├── dashboard/      # Dashboard components
│   │   ├── transactions/   # Transaction management
│   │   ├── categories/     # Category management
│   │   ├── budgets/        # Budget management
│   │   └── layout/         # Layout components
│   ├── contexts/           # React contexts
│   ├── services/           # API services
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── package.json           # Dependencies
└── vite.config.js        # Vite configuration
```

## 🧩 Component Structure

### Authentication Components
- **Login.jsx** - User login form with validation
- **AuthContext.jsx** - Authentication state management

### Dashboard Components
- **Dashboard.jsx** - Main dashboard with overview
- **FinancialSummaryChart.jsx** - D3.js income/expense chart
- **RecentTransactions.jsx** - Latest transaction list
- **BudgetOverview.jsx** - Budget progress visualization

### Transaction Components
- **Transactions.jsx** - Main transaction management page
- **TransactionForm.jsx** - Add/edit transaction modal
- **TransactionList.jsx** - Paginated transaction table
- **TransactionFilters.jsx** - Advanced filtering controls

### Category Components
- **Categories.jsx** - Category management page
- **CategoryForm.jsx** - Add/edit category modal
- **CategoryList.jsx** - Category grid display

### Budget Components
- **Budgets.jsx** - Budget management page
- **BudgetForm.jsx** - Add/edit budget modal
- **BudgetList.jsx** - Budget list with progress bars
- **BudgetAnalysis.jsx** - D3.js budget vs actual chart

### Layout Components
- **Layout.jsx** - Main application layout
- **Navigation** - Sidebar navigation menu

## 🎯 Key Features

### Interactive Data Visualization
- **D3.js Charts**: Custom bar charts for financial data
- **Real-time Updates**: Charts update with data changes
- **Responsive Design**: Charts adapt to screen sizes
- **Animation**: Smooth transitions and loading states

### Advanced Filtering
- **Multi-field Filtering**: Date range, category, amount, type
- **Search Functionality**: Full-text search across transactions
- **Real-time Results**: Instant filtering without page reload
- **Filter Persistence**: Maintains filters across navigation

### Responsive Design
- **Mobile-first Approach**: Optimized for all screen sizes
- **Tailwind CSS**: Utility-first styling framework
- **Consistent UI**: Design system with reusable components
- **Accessibility**: ARIA labels and keyboard navigation

### User Experience
- **Toast Notifications**: Real-time feedback for actions
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: Graceful error messages and recovery
- **Form Validation**: Client-side validation with helpful messages

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Configure your environment variables:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🌐 Environment Variables

### Required Variables
```env
VITE_API_BASE_URL=http://localhost:8000/api

## 🔐 Authentication Flow

### Login Process
1. User enters credentials in login form
2. Frontend sends POST request to `/api/auth/login/`
3. Backend returns JWT tokens (access & refresh)
4. Tokens stored in localStorage
5. Axios interceptor adds Authorization header
6. Protected routes check authentication status

### Test Setup
```bash
npm run test
```

### Testing Libraries
- **Vitest**: Fast unit test runner
- **React Testing Library**: Component testing utilities
- **MSW**: Mock Service Worker for API mocking

### Test Coverage
```bash
npm run test:coverage
```

### Testing Strategy
- **Unit Tests**: Individual component testing
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Full user workflow testing
- **API Tests**: Service layer testing

## 🔍 Debugging & Development

### Development Tools
- **React DevTools**: Component inspection
- **Redux DevTools**: State management debugging
- **Vite HMR**: Hot module replacement
- **ESLint**: Code quality checking

### Error Handling
- **Error Boundaries**: Catch and display React errors
- **API Error Handling**: Graceful API error management
- **Form Validation**: Client-side validation with feedback
- **Toast Notifications**: User-friendly error messages

## 📦 Build & Deployment

### Build Process
```bash
npm run build
```


### Production Configuration
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
```


### Component Customization
- **Styling**: Override default styles with custom CSS
- **Behavior**: Extend component functionality
- **Configuration**: Environment-based feature toggles
- **Localization**: Multi-language support ready
