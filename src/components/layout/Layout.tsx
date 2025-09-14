import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { motion } from 'framer-motion';
import { store } from '../../store';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Dashboard } from '../dashboard/Dashboard';
import { MilkPredictionForm } from '../predictions/MilkPredictionForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import DiseaseDetectionForm from '../predictions/DiseaseDetectionForm';

// Ant Design theme configuration
const antdTheme = {
  token: {
    colorPrimary: 'hsl(152, 82%, 12%)', // farm-green
    colorSuccess: 'hsl(152, 82%, 12%)',
    colorWarning: 'hsl(33, 89%, 63%)', // farm-orange
    borderRadius: 12,
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  components: {
    Button: {
      borderRadiusLG: 12,
      controlHeight: 40,
      controlHeightLG: 48,
    },
    Input: {
      borderRadius: 8,
      controlHeight: 40,
    },
    Card: {
      borderRadiusLG: 16,
      paddingLG: 24,
    },
  },
};

const MainContent: React.FC = () => {
  const { currentPage } = useSelector((state: RootState) => state.ui);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'predictions':
        return <MilkPredictionForm />;
      case 'animals':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-farm-slate">Animals Management</h1>
            <p className="text-farm-slate-light mt-2">Manage your cattle records and profiles</p>
            <div className="mt-8 p-8 bg-white rounded-xl text-center">
              <p className="text-farm-slate-light">Animals management page coming soon...</p>
            </div>
          </div>
        );
      case 'health':
        return <DiseaseDetectionForm />;
      case 'alerts':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-farm-slate">Health Alerts</h1>
            <p className="text-farm-slate-light mt-2">Monitor and manage health alerts for your animals</p>
            <div className="mt-8 p-8 bg-white rounded-xl text-center">
              <p className="text-farm-slate-light">Health alerts page coming soon...</p>
            </div>
          </div>
        );
      case 'feed':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-farm-slate">Feed & Nutrition</h1>
            <p className="text-farm-slate-light mt-2">Manage feed profiles and nutrition plans</p>
            <div className="mt-8 p-8 bg-white rounded-xl text-center">
              <p className="text-farm-slate-light">Feed management page coming soon...</p>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-farm-slate">Reports</h1>
            <p className="text-farm-slate-light mt-2">Generate and export farm reports</p>
            <div className="mt-8 p-8 bg-white rounded-xl text-center">
              <p className="text-farm-slate-light">Reports page coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-farm-slate">Settings</h1>
            <p className="text-farm-slate-light mt-2">Configure your farm settings and integrations</p>
            <div className="mt-8 p-8 bg-white rounded-xl text-center">
              <p className="text-farm-slate-light">Settings page coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <motion.main
      key={currentPage}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 bg-gray-50 overflow-auto"
    >
      {renderPage()}
    </motion.main>
  );
};

export const Layout: React.FC = () => {
  return (
    <Provider store={store}>
      <ConfigProvider theme={antdTheme}>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Topbar />
            <MainContent />
          </div>
        </div>
      </ConfigProvider>
    </Provider>
  );
};