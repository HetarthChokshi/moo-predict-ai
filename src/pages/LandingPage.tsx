import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button, Card, Carousel } from 'antd';
import { 
  ArrowRight, 
  Brain, 
  Heart, 
  Wheat, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Star,
  BarChart3,
  Shield,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    'https://github.com/user-attachments/assets/15ac602c-d2f9-47d3-b772-94a1e56183a1',
    'https://images.unsplash.com/photo-1582560469781-1965b9af903d?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&h=600&fit=crop'
  ];

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Milk Yield Prediction',
      description: 'AI-powered forecasting to optimize milk production and plan ahead with confidence.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Disease Detection',
      description: 'Early warning system to detect health issues before they impact your herd.'
    },
    {
      icon: <Wheat className="w-8 h-8" />,
      title: 'Feed & Nutrition',
      description: 'Smart feed optimization to maximize nutrition and reduce costs.'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Farm Reports',
      description: 'Comprehensive reports in CSV, PDF, and Excel formats for easy analysis.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      farm: 'Green Valley Dairy',
      text: 'This platform helped me detect mastitis early and saved my cattle. My milk yield increased by 15% in just 3 months.',
      rating: 5
    },
    {
      name: 'Mike Rodriguez',
      farm: 'Sunset Farm',
      text: 'The feed optimization feature reduced my costs by 20% while improving cattle health. Absolutely game-changing.',
      rating: 5
    },
    {
      name: 'Emily Chen',
      farm: 'Mountain View Ranch',
      text: 'The disease prediction alerts have prevented multiple outbreaks. I can\'t imagine farming without this technology.',
      rating: 5
    }
  ];

  const chartData = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical'],
    datasets: [
      {
        label: 'Number of Animals',
        data: [85, 28, 12, 3],
        backgroundColor: [
          'hsl(152, 45%, 35%)',
          'hsl(33, 89%, 63%)',
          'hsl(20, 85%, 55%)',
          'hsl(0, 84%, 60%)'
        ],
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Disease Risk Distribution',
        font: {
          size: 16,
        },
        color: 'hsl(210, 15%, 20%)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'hsl(214, 32%, 91%)',
        },
        ticks: {
          color: 'hsl(210, 15%, 40%)',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'hsl(210, 15%, 40%)',
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart' as const,
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const SectionWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Carousel
            autoplay
            dots={false}
            infinite
            speed={1000}
            autoplaySpeed={5000}
            beforeChange={(_, next) => setCurrentSlide(next)}
            prevArrow={<ChevronLeft className="w-6 h-6" />}
            nextArrow={<ChevronRight className="w-6 h-6" />}
          >
            {heroImages.map((image, index) => (
              <div key={index} className="relative h-screen">
                <img
                  src={image}
                  alt={`Farm scene ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>
        
        {/* Hero Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              >
                Transform Dairy Farming with{' '}
                <span className="text-[hsl(var(--farm-orange))]">AI</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed"
              >
                Monitor cattle health, predict milk yield, and prevent diseases — all from one smart platform.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  type="primary"
                  size="large"
                  className="h-14 px-8 text-lg font-medium bg-[hsl(var(--farm-green))] hover:bg-[hsl(var(--farm-green-light))] border-none"
                  onClick={() => navigate('/signup')}
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="end"
                >
                  Get Started
                </Button>
                
                <Button
                  size="large"
                  className="h-14 px-8 text-lg font-medium bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50"
                  onClick={() => navigate('/dashboard')}
                  icon={<BarChart3 className="w-5 h-5" />}
                >
                  Go to Dashboard
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <SectionWrapper className="py-20 bg-gradient-to-b from-background to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="p-4 bg-[hsl(var(--farm-green))] rounded-full"
              >
                <Zap className="w-12 h-12 text-white" />
              </motion.div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--farm-slate))] mb-8">
              Data-driven dairy farming for a{' '}
              <span className="text-[hsl(var(--farm-green))]">healthier herd</span>{' '}
              and better productivity
            </h2>
            
            <p className="text-xl text-[hsl(var(--farm-slate-light))] leading-relaxed">
              Our AI-powered platform combines cutting-edge machine learning with decades of 
              agricultural expertise to revolutionize how you manage your dairy farm.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Features Grid */}
      <SectionWrapper className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--farm-slate))] mb-6">
              Powerful Features for Modern Farms
            </h2>
            <p className="text-xl text-[hsl(var(--farm-slate-light))] max-w-3xl mx-auto">
              Everything you need to optimize your dairy operations, from health monitoring to yield prediction.
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  className="h-full hover:shadow-[var(--shadow-medium)] transition-all duration-300 border-0 farm-card group cursor-pointer"
                  hoverable
                >
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="inline-flex p-4 bg-[hsl(var(--farm-green))] text-white rounded-xl mb-6 group-hover:bg-[hsl(var(--farm-green-light))] transition-colors"
                    >
                      {feature.icon}
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-[hsl(var(--farm-slate))] mb-4">
                      {feature.title}
                    </h3>
                    
                    <p className="text-[hsl(var(--farm-slate-light))] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Stats Preview Section */}
      <SectionWrapper className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold text-[hsl(var(--farm-slate))] mb-6">
                Real-time Health Insights
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-[hsl(var(--farm-green))]" />
                  <span className="text-lg text-[hsl(var(--farm-slate-light))]">
                    85% of your herd is in optimal health
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-6 h-6 text-[hsl(var(--farm-orange))]" />
                  <span className="text-lg text-[hsl(var(--farm-slate-light))]">
                    28 animals require attention
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="w-6 h-6 text-red-500" />
                  <span className="text-lg text-[hsl(var(--farm-slate-light))]">
                    3 critical cases detected early
                  </span>
                </div>
              </div>
              
              <Button
                type="primary"
                size="large"
                className="bg-[hsl(var(--farm-green))] hover:bg-[hsl(var(--farm-green-light))] border-none"
                onClick={() => navigate('/dashboard')}
              >
                View Full Dashboard
              </Button>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-[var(--shadow-medium)]">
              <Bar data={chartData} options={chartOptions} />
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* Testimonials Section */}
      <SectionWrapper className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(var(--farm-slate))] mb-6">
              Trusted by Farmers Worldwide
            </h2>
            <p className="text-xl text-[hsl(var(--farm-slate-light))]">
              See how our platform is transforming dairy farms around the globe.
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full farm-card">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-[hsl(var(--farm-orange))] fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-[hsl(var(--farm-slate-light))] mb-6 italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    
                    <div>
                      <h4 className="font-bold text-[hsl(var(--farm-slate))]">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-[hsl(var(--farm-slate-light))]">
                        {testimonial.farm}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[hsl(var(--farm-green))] to-[hsl(var(--farm-slate))] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Smart Dairy Platform</h3>
              <p className="text-gray-200 leading-relaxed mb-6">
                Revolutionizing dairy farming with AI-powered insights, health monitoring, 
                and yield prediction technology.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Home</a></li>
                <li><a href="/dashboard" className="text-gray-200 hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Reports</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <p className="text-gray-200">
              © 2024 Smart Dairy Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;