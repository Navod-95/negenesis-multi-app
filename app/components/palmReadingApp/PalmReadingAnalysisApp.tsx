"use client"

import React, { useState } from 'react';
import { Upload, Hand, RotateCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card-component';
import { Alert, AlertDescription } from '../ui/alert-component';
import { analysisDataList } from './data';
import Image from 'next/image';
import { getRandomIndex } from '../ui/lib/utils';

const PalmReader = () => {
  const [imagePreview, setImagePreview] = useState('');
  const [analysis, setAnalysis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [randIndex, setRandIndex] = useState(0);

  const palmLines: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
    heartLine: {
      name: 'Heart Line',
      description: 'Represents emotional life and relationships'
    },
    headLine: {
      name: 'Head Line',
      description: 'Indicates intellectual capabilities and communication style'
    },
    lifeLine: {
      name: 'Life Line',
      description: 'Shows vitality and major life changes'
    },
    fateLine: {
      name: 'Fate Line',
      description: 'Related to career path and life direction'
    }
  };

  const handleImageUpload = async (event: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a clear image of your palm');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Simulate palm reading analysis
      await analyzePalmImage();

    } catch (err) {
      setError('Failed to analyze palm image. Please try with a clearer image.');
      console.error('Error analyzing palm:', err);
    } finally {
      setLoading(false);
    }
  };

  const analyzePalmImage = async () => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Example analysis - in a real app, this would come from an AI model
    const analysisDataSet: any = analysisDataList; // eslint-disable-line @typescript-eslint/no-explicit-any
    setAnalysis(analysisDataSet);
    const randomIndex = getRandomIndex(analysisDataSet.length);
    setRandIndex(randomIndex);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Hand className="w-6 h-6" />
            Palm Reading Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Upload palm image</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">Clear image of your palm (MAX. 10MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={loading}
                  />
                </label>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {imagePreview && (
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={imagePreview}
                    alt="Palm preview"
                    className="object-contain w-full h-full"
                    width={300}
                    height={300}
                  />
                </div>
              )}
            </div>
            {/* Analysis Results Section */}
            <div className="space-y-4">
              {loading && (
                <div className="flex items-center justify-center p-4">
                  <RotateCw className="w-6 h-6 animate-spin" />
                  <span className="ml-2">Analyzing palm lines...</span>
                </div>
              )}

              {analysis[randIndex] && !loading && (
                <div className="space-y-4">
                  {Object.entries(analysis[randIndex]).map(([line, details]: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                    <Card key={line} className="p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {palmLines[line].name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {palmLines[line].description}
                      </p>
                      <div className="space-y-2">
                        <p><strong>Strength:</strong> {details.strength}</p>
                        <p className="text-sm">{details.interpretation}</p>
                        <div className="mt-2">
                          <strong className="text-sm">Key Characteristics:</strong>
                          <ul className="list-disc list-inside text-sm pl-2">
                            {details.characteristics.map((char: any, index: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                              <li key={index}>{char}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PalmReader;