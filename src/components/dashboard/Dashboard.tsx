import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Row, Col, Card, Statistic, List, Avatar, Badge, Button } from 'antd';
import { 
  Heart, 
  Droplets, 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  ArrowRight,
  Users
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchDashboardStats } from '../../store/slices/predictionsSlice';
import { fetchDiseaseAlerts } from '../../store/slices/diseasesSlice';
import { DashboardCard } from './DashboardCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data for charts
const milkYieldData = [
  { date: '2024-01-01', yield: 245 },
  { date: '2024-01-02', yield: 258 },
  { date: '2024-01-03', yield: 267 },
  { date: '2024-01-04', yield: 242 },
  { date: '2024-01-05', yield: 289 },
  { date: '2024-01-06', yield: 276 },
  { date: '2024-01-07', yield: 295 },
];

const animalHealthData = [
  { category: 'Excellent', count: 45, color: '#16a34a' },
  { category: 'Good', count: 32, color: '#84cc16' },
  { category: 'Fair', count: 12, color: '#f59e0b' },
  { category: 'Needs Attention', count: 6, color: '#ef4444' },
];

const recentActivities = [
  {
    id: '1',
    type: 'health_check',
    message: 'Health check completed for Cow #A127',
    time: '2 hours ago',
    avatar: '🐄',
  },
  {
    id: '2',
    type: 'milk_record',
    message: 'Milk yield recorded: 28.5L for Cow #B203',
    time: '4 hours ago',
    avatar: '🥛',
  },
  {
    id: '3',
    type: 'alert',
    message: 'Low milk yield alert for Cow #C156',
    time: '6 hours ago',
    avatar: '⚠️',
  },
  {
    id: '4',
    type: 'feed',
    message: 'Feed schedule updated for Barn A',
    time: '8 hours ago',
    avatar: '🌾',
  },
];

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { dashboardStats, loading } = useSelector((state: RootState) => state.predictions);
  const { alerts } = useSelector((state: RootState) => state.diseases);

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchDiseaseAlerts());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 bg-gray-50 min-h-screen"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-farm-slate">Farm Dashboard</h1>
            <p className="text-farm-slate-light mt-1">
              Welcome back! Here's what's happening on your farm today.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button type="primary" icon={<Calendar />} className="farm-button-primary border-0">
              Schedule Check
            </Button>
            <Button icon={<Activity />} className="farm-button-secondary border-0">
              Run Prediction
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="mb-6">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <DashboardCard
              title="Total Animals"
              value={dashboardStats?.totalAnimals || 95}
              trend={{ value: 2.5, isPositive: true }}
              icon={<Users className="w-6 h-6 text-farm-green" />}
              sparklineData={[88, 89, 92, 94, 93, 95, 95]}
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <DashboardCard
              title="Today's Milk Yield"
              value={`${dashboardStats?.todayMilkYield || 2450}L`}
              subtitle="Target: 2400L"
              trend={{ value: 4.2, isPositive: true }}
              icon={<Droplets className="w-6 h-6 text-blue-500" />}
              sparklineData={[2380, 2420, 2390, 2450, 2440, 2450, 2450]}
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <DashboardCard
              title="Average Health Score"
              value={`${dashboardStats?.averageHealthScore || 8.7}/10`}
              trend={{ value: 1.2, isPositive: true }}
              icon={<Heart className="w-6 h-6 text-red-500" />}
              sparklineData={[8.5, 8.6, 8.4, 8.7, 8.8, 8.6, 8.7]}
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <DashboardCard
              title="Active Alerts"
              value={alerts.length || 3}
              subtitle={`${alerts.filter(a => a.severity === 'high').length} high priority`}
              trend={{ value: 15.3, isPositive: false }}
              icon={<AlertTriangle className="w-6 h-6 text-farm-orange" />}
              loading={loading}
            />
          </Col>
        </Row>
      </motion.div>

      {/* Charts Section */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} lg={16}>
          <motion.div variants={itemVariants}>
            <Card 
              title="Milk Yield Trend (Last 7 Days)" 
              className="farm-card"
              extra={
                <Button type="link" icon={<ArrowRight className="w-4 h-4" />}>
                  View Details
                </Button>
              }
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={milkYieldData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    stroke="#666"
                  />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value: any) => [`${value}L`, 'Milk Yield']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="yield" 
                    stroke="hsl(var(--farm-green))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--farm-green))', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: 'hsl(var(--farm-green))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} lg={8}>
          <motion.div variants={itemVariants}>
            <Card title="Animal Health Distribution" className="farm-card h-full">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={animalHealthData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#666" />
                  <YAxis type="category" dataKey="category" stroke="#666" />
                  <Tooltip formatter={(value: any) => [`${value}`, 'Animals']} />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--farm-green))"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Recent Activity and Quick Actions */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <motion.div variants={itemVariants}>
            <Card 
              title="Recent Activity" 
              className="farm-card"
              extra={
                <Button type="link" icon={<ArrowRight className="w-4 h-4" />}>
                  View All
                </Button>
              }
            >
              <List
                itemLayout="horizontal"
                dataSource={recentActivities}
                renderItem={(item) => (
                  <List.Item className="border-0 px-0">
                    <List.Item.Meta
                      avatar={
                        <Avatar 
                          style={{ backgroundColor: 'transparent' }}
                          className="text-lg"
                        >
                          {item.avatar}
                        </Avatar>
                      }
                      title={
                        <span className="text-farm-slate font-medium">
                          {item.message}
                        </span>
                      }
                      description={
                        <span className="text-farm-slate-light text-sm">
                          {item.time}
                        </span>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} lg={12}>
          <motion.div variants={itemVariants}>
            <Card title="High Priority Alerts" className="farm-card">
              <div className="space-y-4">
                {alerts.filter(alert => alert.severity === 'high' || alert.severity === 'critical').map((alert) => (
                  <div key={alert.id} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge 
                            color={alert.severity === 'critical' ? 'red' : 'orange'} 
                            text={alert.severity.toUpperCase()}
                          />
                        </div>
                        <h4 className="font-medium text-farm-slate mb-1">
                          {alert.diseaseName} - Animal #{alert.animalId}
                        </h4>
                        <p className="text-sm text-farm-slate-light">
                          Probability: {(alert.probability * 100).toFixed(0)}%
                        </p>
                      </div>
                      <Button size="small" type="primary" className="farm-button-primary border-0">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
                
                {alerts.filter(alert => alert.severity === 'high' || alert.severity === 'critical').length === 0 && (
                  <div className="text-center py-8 text-farm-slate-light">
                    <Heart className="w-12 h-12 mx-auto mb-3 text-green-500" />
                    <p>No high priority alerts. Your animals are healthy!</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
};