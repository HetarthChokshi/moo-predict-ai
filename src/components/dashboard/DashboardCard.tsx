import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from 'antd';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  sparklineData?: number[];
  loading?: boolean;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  sparklineData,
  loading = false,
  className = '',
}) => {
  // Simple sparkline SVG
  const renderSparkline = () => {
    if (!sparklineData || sparklineData.length === 0) return null;

    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min || 1;
    
    const points = sparklineData.map((value, index) => {
      const x = (index / (sparklineData.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="mt-4">
        <svg
          width="100%"
          height="32"
          className="text-farm-green"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`M 0,100 L ${points} L 100,100 Z`}
            fill="url(#sparklineGradient)"
          />
        </svg>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -2,
        transition: { duration: 0.2 }
      }}
      className={`w-full ${className}`}
    >
      <Card
        loading={loading}
        className="farm-card hover-lift h-full border-0 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              {icon && (
                <div className="p-2 bg-farm-green/10 rounded-lg">
                  {icon}
                </div>
              )}
              <h3 className="text-sm font-medium text-farm-slate-light uppercase tracking-wide">
                {title}
              </h3>
            </div>
            
            <div className="mb-2">
              <span className="text-3xl font-bold text-farm-slate">
                {value}
              </span>
              {subtitle && (
                <p className="text-sm text-farm-slate-light mt-1">
                  {subtitle}
                </p>
              )}
            </div>

            {trend && (
              <div className="flex items-center space-x-2">
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  trend.isPositive 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {trend.isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>
                    {Math.abs(trend.value)}%
                  </span>
                </div>
                <span className="text-xs text-farm-slate-light">
                  vs last period
                </span>
              </div>
            )}
          </div>
        </div>

        {renderSparkline()}
      </Card>
    </motion.div>
  );
};