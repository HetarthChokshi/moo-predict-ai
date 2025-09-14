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
  Alert,
  Spin
} from 'antd';
import { 
  Heart, 
  Wheat, 
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

  // Helper: Get selected animal data for autofill
  // Defensive: Provide default object if animal not found
  const selectedAnimalData = animals?.find(animal => animal.id === selectedAnimal) || null;

  // --- API-aligned submit handler ---
  const handleSubmit = async (values: any) => {
    // Compose input for FastAPI /predict/milk-yield
    // FastAPI expects: age, weight, feed_quality, season, lactation_period, temperature, humidity, breed
    // Compose PredictionInput according to types/index.ts
    const predictionInput: PredictionInput = {
      animalId: values.animalId,
      animalData: {
        weight: values.weight,
        breed: values.breed,
      },
      feed: {
        type: 'unknown', // You may want to add a field for feed type in the form
        quantity: 0, // You may want to add a field for feed quantity in the form
        nutritionScore: values.feedQuality,
      },
      activity: {
        steps: 0, // You may want to add a field for steps in the form
        restingTime: 0, // You may want to add a field for restingTime in the form
        feedingTime: 0, // You may want to add a field for feedingTime in the form
      },
      environment: {
        temperature: values.temperature,
        humidity: values.humidity,
        season: values.season,
      },
    };
    dispatch(predictMilkYield(predictionInput));
  };

  // --- UI ---
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
          Predict daily milk yield for cattle using AI-powered analysis.
        </p>
      </motion.div>

      <Row gutter={[24, 24]}>
        {/* Prediction Form */}
        <Col xs={24} lg={14}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
            }}
          >
            <Card title="Prediction Parameters" className="farm-card">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="space-y-4"
              >
                {/* Animal Selection */}
                <Card size="small" className="bg-blue-50 border-blue-200 mb-4">
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
                          options={animals?.map(animal => ({
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
                              {typeof selectedAnimalData.currentMilkYield === 'number' ? `${selectedAnimalData.currentMilkYield}L` : 'N/A'}
                            </p>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className="text-center">
                            <p className="text-xs text-farm-slate-light">Health Score</p>
                            <p className="text-lg font-bold text-farm-slate">
                              {typeof selectedAnimalData.healthScore === 'number' ? `${selectedAnimalData.healthScore}/10` : 'N/A'}
                            </p>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className="text-center">
                            <p className="text-xs text-farm-slate-light">Status</p>
                            <p className="text-sm font-medium text-farm-slate">
                              {selectedAnimalData.pregnancyStatus ? String(selectedAnimalData.pregnancyStatus).replace('_', ' ') : 'N/A'}
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}
                </Card>

                {/* Required Inputs */}
                <Card size="small" className="bg-green-50 border-green-200 mb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Wheat className="w-5 h-5 text-farm-green" />
                    <h3 className="font-semibold text-farm-slate">Core Parameters</h3>
                  </div>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        label="Age (years)"
                        name="age"
                        rules={[{ required: true, message: 'Please enter age' }]}
                        // If birthYear is not available, fallback to selectedAnimalData.age if present
                        // Age is not a property of Animal, so remove this initialValue
                        // If you want to calculate age, use birthDate
                        initialValue={selectedAnimalData?.birthDate ? (new Date().getFullYear() - new Date(selectedAnimalData.birthDate).getFullYear()) : undefined}
                      >
                        <InputNumber min={0} max={20} step={0.1} size="large" className="w-full" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Weight (kg)"
                        name="weight"
                        rules={[{ required: true, message: 'Please enter weight' }]}
                        initialValue={typeof selectedAnimalData?.weight === 'number' ? selectedAnimalData.weight : undefined}
                      >
                        <InputNumber min={0} max={1200} step={1} size="large" className="w-full" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Feed Quality (1-10)"
                        name="feedQuality"
                        rules={[{ required: true, message: 'Please rate feed quality' }]}
                      >
                        <InputNumber min={1} max={10} step={0.1} size="large" className="w-full" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                {/* Optional Inputs */}
                <Card size="small" className="bg-orange-50 border-orange-200 mb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Thermometer className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-farm-slate">Optional Factors</h3>
                  </div>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Season" name="season">
                        <Select placeholder="Select season" size="large" allowClear>
                          <Option value="spring">Spring</Option>
                          <Option value="summer">Summer</Option>
                          <Option value="autumn">Autumn</Option>
                          <Option value="winter">Winter</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Lactation Period (days)" name="lactationPeriod">
                        <InputNumber min={0} max={400} step={1} size="large" className="w-full" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Temperature (°C)" name="temperature">
                        <InputNumber min={-20} max={50} step={0.1} size="large" className="w-full" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Humidity (%)" name="humidity">
                        <InputNumber min={0} max={100} step={0.1} size="large" className="w-full" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Breed" name="breed">
                        <Input placeholder="Breed (optional)" size="large" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

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

              {/* --- Results: Adapted to FastAPI MilkYieldResponse --- */}
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
                    <p className="text-4xl font-bold">
                      {currentPrediction.predictedLiters?.toFixed(1)}L
                    </p>
                    <div className="mt-2 flex items-center justify-center space-x-2">
                      <span className="text-sm opacity-90">
                        Confidence: {(currentPrediction.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Feature Vector */}
                  <div>
                    <h4 className="font-semibold text-farm-slate mb-3">Input Features</h4>
                    <div className="text-xs text-farm-slate-light">
                      {/* No feature_names/feature_vector in PredictionResult type, so remove this block or show breakdown */}
                      <div>
                        <b>Feed Impact:</b> {(currentPrediction.breakdown.feedImpact * 100).toFixed(1)}%{' '}
                        <b>Activity Impact:</b> {(currentPrediction.breakdown.activityImpact * 100).toFixed(1)}%{' '}
                        <b>Environment Impact:</b> {(currentPrediction.breakdown.environmentImpact * 100).toFixed(1)}%{' '}
                        <b>Animal Factors:</b> {(currentPrediction.breakdown.animalFactors * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* Model Info */}
                  <div>
                    <h4 className="font-semibold text-farm-slate mb-3">Model Info</h4>
                    <div className="text-xs text-farm-slate-light">
                      {/* No model_info in PredictionResult type, so remove this line */}
                    </div>
                  </div>

                  {/* Error */}
                  {/* No error property in PredictionResult type, so remove error display */}

                  <div className="text-xs text-farm-slate-light text-center pt-4 border-t">
                    Prediction generated at {new Date().toLocaleString()}
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