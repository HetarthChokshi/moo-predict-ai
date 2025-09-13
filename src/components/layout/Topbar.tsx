import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, User, Settings, LogOut, Plus } from 'lucide-react';
import { Input, Badge, Dropdown, Avatar, Button } from 'antd';
import type { MenuProps } from 'antd';

const { Search: AntSearch } = Input;

interface Notification {
  id: string;
  type: 'warning' | 'info' | 'success';
  message: string;
  time: string;
}

const mockNotifications: Notification[] = [
  { id: '1', type: 'warning', message: 'Cow #A127 shows signs of mastitis', time: '5m ago' },
  { id: '2', type: 'info', message: 'Milk yield prediction completed', time: '15m ago' },
  { id: '3', type: 'success', message: 'Feed schedule updated successfully', time: '1h ago' },
];

export const Topbar: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <User className="w-4 h-4" />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <Settings className="w-4 h-4" />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogOut className="w-4 h-4" />,
      label: 'Logout',
      danger: true,
    },
  ];

  const notificationMenuItems: MenuProps['items'] = mockNotifications.map((notification) => ({
    key: notification.id,
    label: (
      <div className="py-2">
        <div className="flex items-start space-x-3">
          <div className={`w-2 h-2 rounded-full mt-2 ${
            notification.type === 'warning' ? 'bg-farm-orange' :
            notification.type === 'success' ? 'bg-farm-green' : 'bg-blue-500'
          }`} />
          <div className="flex-1">
            <p className="text-sm text-farm-slate">{notification.message}</p>
            <p className="text-xs text-farm-slate-light mt-1">{notification.time}</p>
          </div>
        </div>
      </div>
    ),
  }));

  const handleSearch = (value: string) => {
    console.log('Search:', value);
    // Implement search functionality
  };

  const handleUserMenuClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'profile':
        console.log('Open profile');
        break;
      case 'settings':
        console.log('Open settings');
        break;
      case 'logout':
        console.log('Logout');
        break;
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Search */}
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <AntSearch
            placeholder="Search animals, records, alerts..."
            allowClear
            enterButton={false}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
            className="farm-search"
            size="large"
            prefix={<Search className="w-4 h-4 text-farm-slate-light" />}
          />
        </div>

        {/* Right side - Actions and User */}
        <div className="flex items-center space-x-4">
          {/* Quick Add Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="primary"
              icon={<Plus className="w-4 h-4" />}
              className="farm-button-primary border-0"
              size="large"
            >
              Quick Add
            </Button>
          </motion.div>

          {/* Notifications */}
          <Dropdown
            menu={{ items: notificationMenuItems }}
            placement="bottomRight"
            trigger={['click']}
            dropdownRender={(menu) => (
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 min-w-[300px]">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="font-semibold text-farm-slate">Notifications</h3>
                </div>
                {menu}
                <div className="px-4 py-3 border-t border-gray-100">
                  <button className="text-sm text-farm-green hover:text-farm-green-light">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-farm-slate" />
              <Badge
                count={mockNotifications.length}
                size="small"
                className="absolute -top-1 -right-1"
              />
            </motion.button>
          </Dropdown>

          {/* User Menu */}
          <Dropdown
            menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
            placement="bottomRight"
            trigger={['click']}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="User menu"
            >
              <Avatar
                size="default"
                icon={<User />}
                className="bg-farm-green"
              />
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-farm-slate">John Smith</p>
                <p className="text-xs text-farm-slate-light">Farm Manager</p>
              </div>
            </motion.button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};