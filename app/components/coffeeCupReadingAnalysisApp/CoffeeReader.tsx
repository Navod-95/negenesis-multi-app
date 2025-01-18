"use client"

import React, { useState } from 'react';
import { Upload, Coffee, RotateCw, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card-component';
import { Alert, AlertDescription } from '../ui/alert-component';
import { coffeeAnalysisDataList } from './data';
import { getRandomIndex } from '../ui/lib/utils';

const CoffeeReader = () => {
  let q: any = [];
  const [imagePreview, setImagePreview] = useState('');
  const [analysis, setAnalysis] = useState(q);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [randIndex, setRandIndex] = useState(0);

  const cupSections: any = {
    rim: {
      name: 'Rim (Present)',
      description: 'Represents current situations and immediate future'
    },
    middle: {
      name: 'Middle (Near Future)',
      description: 'Shows events coming in the next few weeks or months'
    },
    bottom: {
      name: 'Bottom (Distant Future)',
      description: 'Indicates long-term outcomes and deeper meanings'
    }
  };

  const commonSymbols: any = {
    heart: 'Love and emotions',
    bird: 'Good news or messages',
    tree: 'Personal growth',
    mountain: 'Challenges or obstacles',
    ring: 'Partnerships or commitments',
    star: 'Success and achievement',
    anchor: 'Stability and security',
    fish: 'Prosperity and abundance'
  };

  const handleImageUpload = async (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a clear image of your coffee cup');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Simulate coffee cup reading analysis
      await analyzeCoffeeImage();

    } catch (err) {
      setError('Failed to analyze coffee cup. Please ensure the image is clear and shows the coffee grounds pattern.');
      console.error('Error analyzing coffee cup:', err);
    } finally {
      setLoading(false);
    }
  };

  const analyzeCoffeeImage = async () => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Example analysis - in a real app, this would come from an AI model
    const analysisDataSet: any = coffeeAnalysisDataList;
    setAnalysis(analysisDataSet);
    const randomIndex = getRandomIndex(analysisDataSet.length);
    setRandIndex(randomIndex);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Coffee className="w-6 h-6" />
            Coffee Cup Reading Analysis
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
                      <span className="font-semibold">Upload cup image</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">Clear image of your coffee cup (MAX. 10MB)</p>
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
                  <img
                    src={imagePreview}
                    alt="Coffee cup preview"
                    className="object-contain w-full h-full"
                  />
                </div>
              )}

              {/* Reading Guide */}
              <Card className="p-4 bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4" />
                  <h3 className="font-semibold">Reading Guide</h3>
                </div>
                <ul className="text-sm space-y-2">
                  <li>• Ensure cup is photographed in good lighting</li>
                  <li>• Capture all sides of the cup</li>
                  <li>• Include both cup and saucer in the image</li>
                  <li>• Make sure coffee grounds patterns are visible</li>
                </ul>
              </Card>
            </div>
            {/* Analysis Results Section */}
            <div className="space-y-4">
              {loading && (
                <div className="flex items-center justify-center p-4">
                  <RotateCw className="w-6 h-6 animate-spin" />
                  <span className="ml-2">Reading coffee grounds...</span>
                </div>
              )}
              {analysis.length > 0 && !loading && (
                <div className="space-y-4">
                  {/* Overall Reading */}
                  <Card className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Overall Reading</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(analysis[randIndex].overall).map(([key, value]: any) => (
                        <div key={key}>
                          <strong className="capitalize">{key}:</strong> {value}
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Detailed Analysis by Section */}
                  {Object.entries(analysis[randIndex].sections).map(([section, details]: any) => (
                    <Card key={section} className="p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {cupSections[section].name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {cupSections[section].description}
                      </p>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <strong>Symbols Found:</strong>
                          <ul className="list-disc list-inside pl-2">
                            {details.symbols.map((symbol: string) => (
                              <li key={symbol}>
                                {symbol.charAt(0).toUpperCase() + symbol.slice(1)} - {commonSymbols[symbol]}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <p className="text-sm mt-2"><strong>Interpretation:</strong> {details.interpretation}</p>
                        <p className="text-sm mt-2"><strong>Guidance:</strong> {details.guidance}</p>
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

export default CoffeeReader;