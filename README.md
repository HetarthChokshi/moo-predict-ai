# FarmAI - Cattle Milk Yield & Health Prediction Platform

A modern, AI-powered cattle management platform built with React, TypeScript, and Redux Toolkit. This application provides farmers with intelligent insights into milk yield predictions and animal health monitoring.

## 🌟 Features

### Core Functionality
- **Dashboard**: Comprehensive farm overview with key metrics and trends
- **Milk Yield Prediction**: AI-powered predictions based on feed, activity, and environmental data
- **Animal Management**: Individual cattle profiles with health tracking
- **Disease Detection**: Early warning system for health issues
- **Feed & Nutrition**: Feed profile management and optimization
- **Reports & Analytics**: Data export capabilities (CSV, Excel, PDF)

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite
- **State Management**: Redux Toolkit with RTK Query
- **UI Components**: Ant Design v5 with custom styling
- **Styling**: Tailwind CSS with custom farm theme
- **Animations**: Framer Motion for smooth interactions
- **Charts**: Recharts for data visualization
- **API Client**: Axios with TypeScript integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:3001/api
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── dashboard/       # Dashboard-specific components
│   ├── layout/          # Layout components (Sidebar, Topbar)
│   └── predictions/     # Prediction-related components
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── services/            # API services and clients
├── store/               # Redux store and slices
│   └── slices/         # Redux slices for different features
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── index.css           # Global styles and design system
```

## 📡 API Integration

The frontend expects a backend API with the following endpoints:

### Animals
- `GET /api/animals` - List all animals
- `GET /api/animals/:id` - Get animal details
- `POST /api/animals` - Create new animal
- `PUT /api/animals/:id` - Update animal
- `DELETE /api/animals/:id` - Delete animal

### Predictions
- `POST /api/predict/milk` - Predict milk yield
- `POST /api/predict/disease` - Predict disease risk

### Health & Monitoring
- `GET /api/diseases/alerts` - Get active health alerts
- `PATCH /api/diseases/:id` - Update disease status

### Data & Reports
- `GET /api/dashboard/stats` - Dashboard statistics
- `POST /api/reports/export` - Export data (CSV/PDF)

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh JWT token

## 🎨 Design System

The application uses a custom farm-themed design system:

### Color Palette
- **Primary Green**: `hsl(152, 82%, 12%)` - Main brand color
- **Orange Accent**: `hsl(33, 89%, 63%)` - Secondary actions
- **Cream Background**: `hsl(48, 100%, 97%)` - Soft backgrounds
- **Slate Text**: `hsl(210, 15%, 20%)` - Primary text

### Components
All components follow the design system with:
- Semantic color tokens
- Consistent spacing (Tailwind utilities)
- Rounded corners and soft shadows
- Smooth animations and transitions

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style
- TypeScript strict mode enabled
- ESLint configuration for React/TypeScript
- Consistent component architecture
- Redux Toolkit best practices

## 📊 State Management

The application uses Redux Toolkit with the following slices:
- `animalsSlice` - Animal data and CRUD operations
- `predictionsSlice` - ML predictions and dashboard stats
- `diseasesSlice` - Health alerts and disease monitoring
- `feedSlice` - Feed profiles and nutrition data
- `uiSlice` - UI state (sidebar, modals, notifications)
- `authSlice` - Authentication state

## 🔄 Data Flow

1. **User Input** → Form components (Ant Design)
2. **Actions** → Redux actions via `createAsyncThunk`
3. **API Calls** → Axios service layer
4. **State Updates** → Redux slices update store
5. **UI Updates** → Components re-render via `useSelector`

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Collapsible sidebar for smaller screens
- Adaptive grid layouts
- Touch-friendly interactions

## 🧪 Mock Data

For development without a backend, the application includes:
- Mock API responses in Redux slices
- Sample data for charts and components
- Simulated prediction results

## 🚀 Deployment

### Production Build
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Environment Setup
- Configure `VITE_API_BASE_URL` for your backend
- Ensure CORS is configured on your API server
- Set up authentication flow with your backend

## 🔐 Security Considerations

- JWT tokens stored in localStorage (consider httpOnly cookies for production)
- API requests include authentication headers
- Form validation on both client and server side
- CORS configuration required for API access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation
- Create an issue on GitHub
- Contact the development team

## 🔮 Future Enhancements

- Real-time IoT sensor integration
- Advanced ML model training interface
- Mobile app companion
- Automated feed scheduling
- Weather API integration
- Multi-farm management
- Advanced reporting dashboard