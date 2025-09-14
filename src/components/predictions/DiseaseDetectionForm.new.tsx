import React, { useState } from 'react';
import { Form, Button, Card, Switch, Row, Col, Alert, Spin } from 'antd';
import { HeartPulse, Activity, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface DiseaseDetectionResponse {
  predicted_disease: string;
  confidence: number;
  confidence_percentage: number;
  top_predictions: Array<{
    disease: string;
    confidence: number;
  }>;
  symptoms_provided: string[];
  active_symptoms: string[];
  recommendations: {
    immediate_care?: string;
    prevention?: string;
    general_advice?: string;
  };
  model_info: {
    type: string;
    path: string;
    accuracy: number;
    macro_f1: number;
    feature_count: number;
  };
  error?: string;
}

const DiseaseDetectionForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiseaseDetectionResponse | null>(null);

  // List of symptoms as per API
  const SYMPTOMS = {
    fever: "Fever",
    milk_flakes: "Milk Flakes",
    udder_swelling: "Udder Swelling",
    coughing: "Coughing",
    diarrhoea: "Diarrhoea",
    lethargy: "Lethargy",
    bloating: "Bloating",
    nasal_discharge: "Nasal Discharge",
    loss_of_appetite: "Loss of Appetite",
    lameness: "Lameness",
    skin_lesions: "Skin Lesions",
    abnormal_breathing: "Abnormal Breathing",
    weight_loss: "Weight Loss",
    reduced_milk_yield: "Reduced Milk Yield"
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setError(null);

    try {
      // Convert form values to API payload format (0/1)
      const payload = Object.keys(SYMPTOMS).reduce((acc, key) => ({
        ...acc,
        [key]: values[key] ? 1 : 0
      }), {});

      const response = await axios.post<DiseaseDetectionResponse>(
        '/api/predict/disease',
        payload
      );

      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to predict disease');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card 
          title={
            <div className="flex items-center space-x-2">
              <HeartPulse className="w-6 h-6 text-red-500" />
              <span className="text-xl font-semibold">Cattle Disease Detection</span>
            </div>
          }
          className="mb-6 shadow-lg"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={Object.keys(SYMPTOMS).reduce((acc, key) => ({
              ...acc,
              [key]: false
            }), {})}
          >
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-500" />
                Select Observed Symptoms
              </h3>
              <Row gutter={[16, 16]}>
                {Object.entries(SYMPTOMS).map(([key, label]) => (
                  <Col xs={24} sm={12} md={8} key={key}>
                    <Form.Item
                      name={key}
                      valuePropName="checked"
                      className="mb-2"
                    >
                      <Switch
                        checkedChildren={label}
                        unCheckedChildren={label}
                      />
                    </Form.Item>
                  </Col>
                ))}
              </Row>
            </div>
            
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                className="w-full md:w-auto"
                icon={<Activity className="w-4 h-4" />}
              >
                {loading ? 'Analyzing Symptoms...' : 'Detect Disease'}
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            icon={<AlertTriangle className="w-5 h-5" />}
            className="mb-6"
          />
        )}

        {loading && (
          <div className="text-center py-8">
            <Spin size="large" />
            <p className="mt-4 text-gray-600">Analyzing symptoms with AI model...</p>
          </div>
        )}

        {result && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg">
              <div className="grid gap-6">
                {/* Main Prediction */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Primary Diagnosis</h3>
                  <p className="text-2xl font-bold text-blue-700">
                    {result.predicted_disease}
                  </p>
                  <p className="text-blue-600">
                    Confidence: {result.confidence_percentage}%
                  </p>
                </div>

                {/* Top Predictions */}
                <div>
                  <h4 className="font-semibold mb-2">Alternative Possibilities</h4>
                  <div className="grid gap-2">
                    {result.top_predictions.map((pred, idx) => (
                      <div 
                        key={idx}
                        className="flex justify-between items-center bg-gray-50 p-2 rounded"
                      >
                        <span>{pred.disease}</span>
                        <span className="font-medium">{pred.confidence}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Symptoms */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Symptoms Reported</h4>
                    <ul className="list-disc list-inside">
                      {result.symptoms_provided.map((symptom, idx) => (
                        <li key={idx}>{SYMPTOMS[symptom as keyof typeof SYMPTOMS]}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Active Symptoms</h4>
                    <ul className="list-disc list-inside">
                      {result.active_symptoms.map((symptom, idx) => (
                        <li key={idx}>{SYMPTOMS[symptom as keyof typeof SYMPTOMS]}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Recommendations</h4>
                  <div className="grid gap-4">
                    {result.recommendations.immediate_care && (
                      <div>
                        <h5 className="font-medium text-green-700">Immediate Care</h5>
                        <p>{result.recommendations.immediate_care}</p>
                      </div>
                    )}
                    {result.recommendations.prevention && (
                      <div>
                        <h5 className="font-medium text-green-700">Prevention</h5>
                        <p>{result.recommendations.prevention}</p>
                      </div>
                    )}
                    {result.recommendations.general_advice && (
                      <div>
                        <h5 className="font-medium text-green-700">General Advice</h5>
                        <p>{result.recommendations.general_advice}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Model Info */}
                <div className="text-sm text-gray-500 border-t pt-4">
                  <p>
                    <strong>Model Information:</strong> {result.model_info.type} |
                    Accuracy: {result.model_info.accuracy} |
                    Macro F1: {result.model_info.macro_f1} |
                    Features: {result.model_info.feature_count}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DiseaseDetectionForm;