import React from "react";
import { motion } from "framer-motion";
import {
  Layout,
  BarChart3,
  Heart,
  Activity,
  AlertTriangle,
  Wheat,
  FileText,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { toggleSidebar, setCurrentPage } from "../../store/slices/uiSlice";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

const menuItems: MenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Layout },
  { id: "animals", label: "Animals", icon: Heart },
  { id: "predictions", label: "Milk Prediction", icon: BarChart3 },
  { id: "health", label: "Disease Detection", icon: Activity },
  { id: "alerts", label: "Health Alerts", icon: AlertTriangle, badge: 3 },
  { id: "feed", label: "Feed & Nutrition", icon: Wheat },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { sidebarCollapsed, currentPage } = useSelector(
    (state: RootState) => state.ui
  );

  const handleMenuClick = (pageId: string) => {
    dispatch(setCurrentPage(pageId));
  };

  const sidebarVariants = {
    expanded: {
      width: 280,
      transition: { duration: 0.3 },
    },
    collapsed: {
      width: 80,
      transition: { duration: 0.3 },
    },
  };

  const menuItemVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <motion.div
      variants={sidebarVariants}
      animate={sidebarCollapsed ? "collapsed" : "expanded"}
      className="bg-white border-r border-gray-200 h-screen flex flex-col shadow-lg"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-farm-green rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="logo.jpeg"
                  alt="logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h1 className="text-lg font-bold text-farm-slate">FarmAI</h1>
                <p className="text-xs text-farm-slate-light">
                  Cattle Management
                </p>
              </div>
            </motion.div>
          )}

          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {sidebarCollapsed ? (
              <Menu className="w-5 h-5 text-farm-slate" />
            ) : (
              <X className="w-5 h-5 text-farm-slate" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <motion.button
              key={item.id}
              variants={menuItemVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleMenuClick(item.id)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left
                transition-all duration-200 group relative
                ${
                  isActive
                    ? "bg-farm-green text-white shadow-md"
                    : "text-farm-slate hover:bg-gray-50 hover:text-farm-green"
                }
              `}
              aria-label={item.label}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive
                    ? "text-white"
                    : "text-farm-slate-light group-hover:text-farm-green"
                }`}
              />

              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium"
                >
                  {item.label}
                </motion.span>
              )}

              {item.badge && !sidebarCollapsed && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto bg-farm-orange text-white text-xs font-bold px-2 py-1 rounded-full"
                >
                  {item.badge}
                </motion.span>
              )}

              {/* Tooltip for collapsed state */}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-farm-slate text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                  {item.badge && (
                    <span className="ml-2 bg-farm-orange px-2 py-1 rounded-full text-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      {!sidebarCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-4 border-t border-gray-100"
        >
          <div className="bg-gradient-to-r from-farm-green to-farm-green-light p-4 rounded-xl text-white">
            <h3 className="font-semibold text-sm">Need Help?</h3>
            <p className="text-xs opacity-90 mt-1">
              Check our documentation or contact support
            </p>
            <button className="mt-2 text-xs underline hover:no-underline">
              Get Support
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
