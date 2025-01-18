"use client"

import React, { useState } from 'react';

const NumerologyApp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: ''
  });
  const [reading, setReading] = useState(new Array<any>); // eslint-disable-line @typescript-eslint/no-explicit-any

  const numerologyMeanings: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
    lifePathDescriptions: {
      1: "Natural born leader, independent, ambitious, and innovative",
      2: "Cooperative, diplomatic, sensitive, and peaceful",
      3: "Creative, expressive, optimistic, and social",
      4: "Practical, organized, disciplined, and trustworthy",
      5: "Adventurous, freedom-loving, versatile, and adaptable",
      6: "Nurturing, responsible, caring, and harmonious",
      7: "Analytical, introspective, spiritual, and intellectual",
      8: "Ambitious, business-minded, successful, and power-seeking",
      9: "Humanitarian, compassionate, spiritual, and selfless",
      11: "Intuitive, inspirational, idealistic, and visionary",
      22: "Master builder, practical visionary, powerful, and successful",
      33: "Master teacher, nurturing, compassionate, and spiritual"
    },
    destinyDescriptions: {
      1: "Born to lead and pioneer new paths",
      2: "Destined to be a peacemaker and mediator",
      3: "Meant to express creativity and inspire others",
      4: "Called to build stable foundations and systems",
      5: "Destined for adventure and positive change",
      6: "Meant to nurture and create harmony",
      7: "Called to seek wisdom and spiritual truth",
      8: "Destined for material and spiritual abundance",
      9: "Meant to serve humanity and give to others"
    }
  };

  const handleChange = (e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const calculateLifePath = (birthDate: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Remove any non-numeric characters
    const numbers = birthDate.replace(/\D/g, '');
    
    // Keep reducing until we get a single digit or master number
    let sum = numbers.split('').reduce((acc: number, curr: number) => acc + curr, 0);
    
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc: number, curr: number) => acc + curr, 0);
    }
    
    return sum;
  };

  const calculateDestiny = (name: string) => {
    const letterValues: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
      a: 1, j: 1, s: 1,
      b: 2, k: 2, t: 2,
      c: 3, l: 3, u: 3,
      d: 4, m: 4, v: 4,
      e: 5, n: 5, w: 5,
      f: 6, o: 6, x: 6,
      g: 7, p: 7, y: 7,
      h: 8, q: 8, z: 8,
      i: 9, r: 9
    };

    const nameSum = name.toLowerCase()
      .replace(/[^a-z]/g, '')
      .split('')
      .reduce((sum, letter) => sum + (letterValues[letter] || 0), 0);

    let destinyNumber = nameSum;
    while (destinyNumber > 9) {
      destinyNumber = destinyNumber.toString()
        .split('')
        .reduce((acc, curr) => acc + parseInt(curr), 0);
    }

    return destinyNumber;
  };

  const handleSubmit = (e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    e.preventDefault();
    
    const lifePathNumber = calculateLifePath(formData.birthDate);
    const destinyNumber = calculateDestiny(formData.fullName);

    const dataSet: any = [{ // eslint-disable-line @typescript-eslint/no-explicit-any
        lifePath: {
          number: lifePathNumber,
          description: numerologyMeanings.lifePathDescriptions[lifePathNumber]
        },
        destiny: {
          number: destinyNumber,
          description: numerologyMeanings.destinyDescriptions[destinyNumber]
        },
        name: formData.fullName,
        birthDate: formData.birthDate
      }]
    setReading(dataSet);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Numerology Reading</h1>
          <p className="text-gray-600">Discover your life path and destiny numbers</p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name (as given at birth)
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-200 outline-none"
                required
                placeholder="Enter your full birth name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Birth Date
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-200 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Calculate Numbers
            </button>
          </form>
        </div>

        {/* Results */}
        {reading.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-center mb-4">Your Numerology Reading</h2>
            
            {/* Life Path Number */}
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                  {reading[0].lifePath.number}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Life Path Number</h3>
                  <p className="text-sm text-gray-600">Your life&apos;s purpose and journey</p>
                </div>
              </div>
              <p className="text-gray-700">{reading[0].lifePath.description}</p>
            </div>

            {/* Destiny Number */}
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                  {reading[0].destiny.number}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Destiny Number</h3>
                  <p className="text-sm text-gray-600">Your life&apos;s ultimate goal</p>
                </div>
              </div>
              <p className="text-gray-700">{reading[0].destiny.description}</p>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-gray-600 text-center">
                This reading is based on your birth name: {reading[0].name}<br />
                and birth date: {new Date(reading[0].birthDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumerologyApp;