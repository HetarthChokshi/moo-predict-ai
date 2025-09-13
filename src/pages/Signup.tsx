import React from 'react';
import { motion } from 'framer-motion';
import { Button, Form, Input, Card } from 'antd';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Signup form submitted:', values);
    // TODO: Implement actual signup logic
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--farm-green))] to-[hsl(var(--farm-slate))] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="farm-card">
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-[hsl(var(--farm-slate))] mb-2"
            >
              Join Smart Dairy
            </motion.h1>
            <p className="text-[hsl(var(--farm-slate-light))]">
              Start transforming your farm with AI
            </p>
          </div>

          <Form
            form={form}
            name="signup"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please enter your full name' }]}
            >
              <Input
                prefix={<User className="w-4 h-4 text-gray-400" />}
                placeholder="Enter your full name"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input
                prefix={<Mail className="w-4 h-4 text-gray-400" />}
                placeholder="Enter your email"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please enter your password' },
                { min: 8, message: 'Password must be at least 8 characters' }
              ]}
            >
              <Input.Password
                prefix={<Lock className="w-4 h-4 text-gray-400" />}
                placeholder="Create a password"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<Lock className="w-4 h-4 text-gray-400" />}
                placeholder="Confirm your password"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-12 bg-[hsl(var(--farm-green))] hover:bg-[hsl(var(--farm-green-light))] border-none rounded-lg font-medium"
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center space-y-4">
            <p className="text-[hsl(var(--farm-slate-light))]">
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-[hsl(var(--farm-green))] hover:text-[hsl(var(--farm-green-light))] font-medium"
              >
                Sign in
              </button>
            </p>
            
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center space-x-2 text-[hsl(var(--farm-slate-light))] hover:text-[hsl(var(--farm-slate))] transition-colors mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;