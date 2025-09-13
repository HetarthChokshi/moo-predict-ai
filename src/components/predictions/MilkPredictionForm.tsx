import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Form, 
  Input, 
  Select, 
  InputNumber, 
  Button, 
  Card, 
  Row, 
  Col, 
  Divider, 
  Progress,
  Alert,
  Spin
} from 'antd';
import { 
  Heart, 
  Wheat, 
  Activity, 
  Thermometer, 
  BarChart3,
  TrendingUp,
  Brain
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchAnimals } from '../../store/slices/animalsSlice';
import { predictMilkYield } from '../../store/slices/predictionsSlice';
import { PredictionInput } from '../../types';

const { Option } = Select;

export const MilkPredictionForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { animals } = useSelector((state: RootState) => state.animals);
  const { currentPrediction, loading } = useSelector((state: RootState) => state.predictions);
  
  const [selectedAnimal, setSelectedAnimal] = useState<string>('');

  useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch]);

  const handleSubmit = async (values: any) => {
    const predictionInput: PredictionInput = {
      animalId: values.animalId,
      feed: {
        type: values.feedType,
        quantity: values.feedQuantity,
        nutritionScore: values.nutritionScore,
      },
      activity: {
        steps: values.steps,
        restingTime: values.restingTime,
        feedingTime: values.feedingTime,
      },
      environment: {
        temperature: values.temperature,
        humidity: values.humidity,
        season: values.season,
      },
    };

    dispatch(predictMilkYield(predictionInput));
  };

  const selectedAnimalData = animals.find(animal => animal.id === selectedAnimal);

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-farm-slate flex items-center">
          <Brain className="w-8 h-8 mr-3 text-farm-green" />
          Milk Yield Prediction
        </h1>
        <p className="text-farm-slate-light mt-1">
          Use AI to predict milk yield based on feed, activity, and environmental factors
        </p>
      </motion.div>

      <Row gutter={[24, 24]}>
        {/* Prediction Form */}
        <Col xs={24} lg={14}>
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <Card title="Prediction Parameters" className="farm-card">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="space-y-4"
              >
                {/* Animal Selection */}
                <motion.div variants={cardVariants}>
                  <Card size="small" className="bg-blue-50 border-blue-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <Heart className="w-5 h-5 text-farm-green" />
                      <h3 className="font-semibold text-farm-slate">Animal Information</h3>
                    </div>
                    
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item 
                          label="Select Animal" 
                          name="animalId"
                          rules={[{ required: true, message: 'Please select an animal' }]}
                        >
                          <Select
                            placeholder="Choose an animal"
                            size="large"
                            showSearch
                            filterOption={(input, option) =>
                              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            onChange={setSelectedAnimal}
                            options={animals.map(animal => ({
                              value: animal.id,
                              label: `${animal.name} (${animal.tagNumber}) - ${animal.breed}`,
                            }))}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    {selectedAnimalData && (
                      <div className="mt-4 p-3 bg-white rounded-lg border">
                        <Row gutter={16}>
                          <Col span={8}>
                            <div className="text-center">
                              <p className="text-xs text-farm-slate-light">Current Yield</p>
                              <p className="text-lg font-bold text-farm-green">
                                {selectedAnimalData.currentMilkYield}L
                              </p>
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="text-center">
                              <p className="text-xs text-farm-slate-light">Health Score</p>
                              <p className="text-lg font-bold text-farm-slate">
                                {selectedAnimalData.healthScore}/10
                              </p>
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="text-center">
                              <p className="text-xs text-farm-slate-light">Status</p>
                              <p className="text-sm font-medium text-farm-slate">
                                {selectedAnimalData.pregnancyStatus.replace('_', ' ')}
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </Card>
                </motion.div>

                {/* Feed Information */}
                <motion.div variants={cardVariants}>
                  <Card size="small" className="bg-green-50 border-green-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <Wheat className="w-5 h-5 text-farm-green" />
                      <h3 className="font-semibold text-farm-slate">Feed & Nutrition</h3>
                    </div>
                    
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item 
                          label="Feed Type" 
                          name="feedType"
                          rules={[{ required: true, message: 'Please select feed type' }]}
                        >
                          <Select placeholder="Select feed type" size="large">
                            <Option value="hay">Hay</Option>
                            <Option value="silage">Silage</Option>
                            <Option value="grain">Grain</Option>
                            <Option value="concentrate">Concentrate</Option>
                            <Option value="pasture">Pasture</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item 
                          label="Quantity (kg)" 
                          name="feedQuantity"
                          rules={[{ required: true, message: 'Please enter feed quantity' }]}
                        >
                          <InputNumber
                            min={0}
                            max={100}
                            step={0.5}
                            placeholder="Enter quantity"
                            size="large"
                            className="w-full"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item 
                          label="Nutrition Score (1-10)" 
                          name="nutritionScore"
                          rules={[{ required: true, message: 'Please enter nutrition score' }]}
                        >
                          <InputNumber
                            min={1}
                            max={10}
                            step={0.1}
                            placeholder="Rate nutrition quality"
                            size="large"
                            className="w-full"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </motion.div>

                {/* Activity Data */}
                <motion.div variants={cardVariants}>
                  <Card size="small" className="bg-orange-50 border-orange-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <Activity className="w-5 h-5 text-farm-orange" />
                      <h3 className="font-semibold text-farm-slate">Activity Metrics</h3>
                    </div>
                    
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item 
                          label="Steps" 
                          name="steps"
                          rules={[{ required: true, message: 'Please enter steps' }]}
                        >
                          <InputNumber
                            min={0}
                            max={20000}
                            placeholder="Daily steps"
                            size="large"
                            className="w-full"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item 
                          label="Resting Time (hrs)" 
                          name="restingTime"
                          rules={[{ required: true, message: 'Please enter resting time' }]}
                        >
                          <InputNumber
                            min={0}
                            max={24}
                            step={0.5}
                            placeholder="Hours resting"
                            size="large"
                            className="w-full"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item 
                          label="Feeding Time (hrs)" 
                          name="feedingTime"
                          rules={[{ required: true, message: 'Please enter feeding time' }]}
                        >
                          <InputNumber
                            min={0}
                            max={12}
                            step={0.25}
                            placeholder="Hours feeding"
                            size="large"
                            className="w-full"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </motion.div>

                {/* Environmental Factors */}
                <motion.div variants={cardVariants}>
                  <Card size="small" className="bg-purple-50 border-purple-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <Thermometer className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-farm-slate">Environmental Conditions</h3>
                    </div>
                    
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item 
                          label="Temperature (°C)" 
                          name="temperature"
                          rules={[{ required: true, message: 'Please enter temperature' }]}
                        >
                          <InputNumber
                            min={-20}
                            max={50}
                            placeholder="Current temp"
                            size="large"
                            className="w-full"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item 
                          label="Humidity (%)" 
                          name="humidity"
                          rules={[{ required: true, message: 'Please enter humidity' }]}
                        >
                          <InputNumber
                            min={0}
                            max={100}
                            placeholder="Humidity level"
                            size="large"
                            className="w-full"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item 
                          label="Season" 
                          name="season"
                          rules={[{ required: true, message: 'Please select season' }]}
                        >
                          <Select placeholder="Select season" size="large">
                            <Option value="spring">Spring</Option>
                            <Option value="summer">Summer</Option>
                            <Option value="autumn">Autumn</Option>
                            <Option value="winter">Winter</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </motion.div>

                <Divider />

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    className="farm-button-primary border-0 w-full h-12"
                    icon={<BarChart3 className="w-5 h-5" />}
                  >
                    {loading ? 'Predicting...' : 'Generate Prediction'}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </motion.div>
        </Col>

        {/* Prediction Results */}
        <Col xs={24} lg={10}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card title="Prediction Results" className="farm-card">
              {loading && (
                <div className="text-center py-8">
                  <Spin size="large" />
                  <p className="mt-4 text-farm-slate-light">Analyzing data with AI...</p>
                </div>
              )}

              {!loading && !currentPrediction && (
                <div className="text-center py-8 text-farm-slate-light">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Complete the form and click "Generate Prediction" to see AI-powered milk yield forecasts</p>
                </div>
              )}

              {currentPrediction && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  {/* Main Prediction */}
                  <div className="text-center p-6 bg-gradient-to-r from-farm-green to-farm-green-light rounded-xl text-white">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                    <h3 className="text-sm font-medium opacity-90">Predicted Milk Yield</h3>
                    <p className="text-4xl font-bold">{currentPrediction.predictedLiters.toFixed(1)}L</p>
                    <div className="mt-2 flex items-center justify-center space-x-2">
                      <Progress
                        percent={currentPrediction.confidence * 100}
                        size="small"
                        strokeColor="rgba(255,255,255,0.8)"
                        trailColor="rgba(255,255,255,0.2)"
                        showInfo={false}
                        className="flex-1 max-w-32"
                      />
                      <span className="text-sm opacity-90">
                        {(currentPrediction.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                  </div>

                  {/* Impact Breakdown */}
                  <div>
                    <h4 className="font-semibold text-farm-slate mb-3">Impact Factors</h4>
                    <div className="space-y-3">
                      {Object.entries(currentPrediction.breakdown).map(([factor, impact]) => (
                        <div key={factor} className="flex items-center justify-between">
                          <span className="text-sm text-farm-slate capitalize">
                            {factor.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Progress
                              percent={Math.abs(impact) * 100}
                              size="small"
                              strokeColor={impact >= 0 ? '#16a34a' : '#ef4444'}
                              showInfo={false}
                              className="w-20"
                            />
                            <span className={`text-sm font-medium ${
                              impact >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {impact >= 0 ? '+' : ''}{(impact * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-semibold text-farm-slate mb-3">AI Recommendations</h4>
                    <div className="space-y-2">
                      {currentPrediction.recommendations.map((rec, index) => (
                        <Alert
                          key={index}
                          message={rec}
                          type="info"
                          showIcon
                          className="text-sm"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-farm-slate-light text-center pt-4 border-t">
                    Prediction generated at {new Date(currentPrediction.timestamp).toLocaleString()}
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};