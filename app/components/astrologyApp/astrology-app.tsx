"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card-component';

const AstrologyApp = () => {
  const [selectedSign, setSelectedSign] = useState('');
  const [prediction, setPrediction] = useState('');

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 
    'Leo', 'Virgo', 'Libra', 'Scorpio', 
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const getPrediction = (sign: string) => {
    const predictions: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
      Aries: "Your natural leadership skills will shine today. Trust your instincts on an important decision.",
      Taurus: "Financial opportunities are heading your way. Stay grounded and practical in your approach.",
      Gemini: "Your communication skills are heightened. Express your ideas - people are ready to listen.",
      Cancer: "Focus on home and family matters. Your nurturing nature will strengthen relationships.",
      Leo: "Creative energy surrounds you. It's time to showcase your talents to the world.",
      Virgo: "Your attention to detail will solve a long-standing problem. Trust your analytical mind.",
      Libra: "Balance and harmony are key today. A important partnership may need your attention.",
      Scorpio: "Trust your intuition about a mysterious situation. Hidden truths will be revealed.",
      Sagittarius: "Adventure calls! Take that leap of faith you've been considering.",
      Capricorn: "Professional success is within reach. Stay focused on your long-term goals.",
      Aquarius: "Your innovative ideas will inspire others. Embrace your unique perspective.",
      Pisces: "Your artistic and spiritual energies are powerful today. Listen to your dreams."
    };
    return predictions[sign];
  };

  const handleSignSelect = (sign: string) => {
    setSelectedSign(sign);
    setPrediction(getPrediction(sign));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-8">
      <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-purple-900">
            Celestial Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center text-gray-600 mb-6">
              Select your zodiac sign to receive your daily prediction
            </div>
            
            <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
              {zodiacSigns.map((sign) => (
                <button
                  key={sign}
                  onClick={() => handleSignSelect(sign)}
                  className={`p-3 rounded-lg transition-all ${
                    selectedSign === sign
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100 hover:bg-purple-200 text-purple-900'
                  }`}
                >
                  {sign}
                </button>
              ))}
            </div>

            {prediction && (
              <div className="mt-8 p-6 bg-purple-50 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-900 mb-3">
                  {selectedSign} &apos; s Daily Prediction
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {prediction}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AstrologyApp;