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
VITE_APP_NAME=Personal Budget Tracker
VITE_DEFAULT_CURRENCY=USD
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


### Optional Configuration
```env
VITE_APP_NAME=Personal Budget Tracker
VITE_DEFAULT_CURRENCY=USD
VITE_DEFAULT_LOCALE=en-US
VITE_ITEMS_PER_PAGE=20
VITE_CHART_ANIMATION_DURATION=800
VITE_TOAST_DURATION=3000
```

### Feature Flags
```env
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=true
VITE_SHOW_DEV_TOOLS=true
```

### Custom CSS Classes
```css
/* Reusable component classes */
.btn-primary { /* Primary button styles */ }
.btn-secondary { /* Secondary button styles */ }
.card { /* Card container styles */ }
.input-field { /* Form input styles */ }
.stat-card { /* Statistics card styles */ }
```

### Design System
- **Color Palette**: Consistent color scheme across components
- **Typography**: Inter font family with proper hierarchy
- **Spacing**: 8px grid system for consistent spacing
- **Shadows**: Subtle shadows for depth and elevation
- **Borders**: Rounded corners and subtle borders

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

### Debug Configuration
```env
VITE_ENABLE_DEBUG_MODE=true
VITE_SHOW_DEV_TOOLS=true
VITE_ENABLE_REDUX_DEVTOOLS=true
```

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

### Build Optimization
- **Minification**: CSS and JavaScript compression
- **Asset Hashing**: Cache busting for static assets
- **Bundle Analysis**: Analyze bundle size and dependencies
- **Environment Variables**: Production configuration

### Deployment Platforms
- **Vercel**: Zero-configuration deployment
- **Netlify**: Continuous deployment from Git
- **GitHub Pages**: Static site hosting
- **AWS S3**: Scalable static hosting

### Production Configuration
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_NODE_ENV=production
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG_MODE=false
```

## 🔧 Customization

### Theme Customization
```javascript
// Extend Tailwind theme
theme: {
  extend: {
    colors: {
      brand: {
        50: '#f0f9ff',
        500: '#3b82f6',
        900: '#1e3a8a'
      }
    }
  }
}
```

### Component Customization
- **Styling**: Override default styles with custom CSS
- **Behavior**: Extend component functionality
- **Configuration**: Environment-based feature toggles
- **Localization**: Multi-language support ready

## 📚 Dependencies

### Core Dependencies
- **React 18.3.1**: UI library
- **React Router DOM 6.20.1**: Client-side routing
- **Axios 1.6.2**: HTTP client
- **D3.js 7.8.5**: Data visualization

### UI Dependencies
- **Tailwind CSS 3.3.6**: Utility-first CSS framework
- **React Hook Form 7.48.2**: Form management
- **React Hot Toast 2.4.1**: Toast notifications
- **Date-fns 2.30.0**: Date manipulation

### Development Dependencies
- **Vite 5.4.2**: Build tool and dev server
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

## 🤝 Contributing

### Development Guidelines
1. Follow React best practices
2. Use TypeScript for type safety (if migrating)
3. Write comprehensive tests
4. Follow component naming conventions
5. Update documentation

### Code Style
- **ESLint Configuration**: Enforced code style
- **Prettier**: Code formatting
- **Component Structure**: Consistent file organization
- **Naming Conventions**: Clear and descriptive names

## 📄 License

This project is licensed under the MIT License.