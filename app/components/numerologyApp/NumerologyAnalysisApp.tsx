"use client"
import React, { useState } from 'react';
import { Calculator, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card-component';


const NumerologyCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [results, setResults] = useState(Array<any>); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateLifePathNumber = (date: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Remove any non-numeric characters
    const numbers = date.replace(/\D/g, '');
    let sum = 0;
    
    // Add all numbers together
    for (const num of numbers) {
      sum += parseInt(num);
    }
    
    // Reduce to single digit unless it's 11, 22, or 33 (master numbers)
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      let tempSum = 0;
      sum.toString().split('').forEach(num => {
        tempSum += parseInt(num);
      });
      sum = tempSum;
    }
    
    return sum;
  };

  const calculateNameNumber = (name: string) => { 
    const numerologyMap: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
      'a': 1, 'j': 1, 's': 1,
      'b': 2, 'k': 2, 't': 2,
      'c': 3, 'l': 3, 'u': 3,
      'd': 4, 'm': 4, 'v': 4,
      'e': 5, 'n': 5, 'w': 5,
      'f': 6, 'o': 6, 'x': 6,
      'g': 7, 'p': 7, 'y': 7,
      'h': 8, 'q': 8, 'z': 8,
      'i': 9, 'r': 9
    };

    let sum = 0;
    name.toLowerCase().replace(/[^a-z]/g, '').split('').forEach((letter:string) => {
      sum += numerologyMap[letter] || 0;
    });

    // Reduce to single digit
    while (sum > 9) {
      let tempSum = 0;
      sum.toString().split('').forEach(num => {
        tempSum += parseInt(num);
      });
      sum = tempSum;
    }

    return sum;
  };

  const getLifePathMeaning = (number: number) => {
    const meanings: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
      1: "Natural born leader, independent, ambitious, and innovative",
      2: "Diplomatic, cooperative, sensitive, and peacekeeping",
      3: "Creative, expressive, optimistic, and social",
      4: "Practical, organized, disciplined, and hard-working",
      5: "Adventurous, freedom-loving, versatile, and adaptable",
      6: "Nurturing, responsible, caring, and harmonious",
      7: "Analytical, introspective, spiritual, and wisdom-seeking",
      8: "Ambitious, business-minded, successful, and power-seeking",
      9: "Humanitarian, compassionate, selfless, and spiritual",
      11: "Master Number - Spiritual messenger, intuitive, and enlightened",
      22: "Master Number - Master builder, practical visionary, and powerful achiever",
      33: "Master Number - Master teacher, nurturing mentor, and compassionate healer"
    };
    return meanings[number] || "Invalid number";
  };

  const getNameMeaning = (number: number) => {
    const meanings: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
      1: "Independent, leadership qualities, original thinker",
      2: "Cooperative, diplomatic, sensitive to others",
      3: "Creative self-expression, joyful, artistic",
      4: "Practical, trustworthy, good organizer",
      5: "Freedom lover, adventurous, progressive",
      6: "Responsible, caring, therapeutic",
      7: "Analytical mind, spiritual awareness, technical skills",
      8: "Executive ability, good judgment, money handler",
      9: "Humanitarian, giving, artistic expression"
    };
    return meanings[number] || "Invalid number";
  };

  const handleCalculate = async () => {
    if (!birthDate || !fullName) return;

    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lifePathNum = calculateLifePathNumber(birthDate);
    const nameNum = calculateNameNumber(fullName);
    
    const resultData: any = [{ // eslint-disable-line @typescript-eslint/no-explicit-any
        lifePath: {
            number: lifePathNum,
            meaning: getLifePathMeaning(lifePathNum)
          },
          name: {
            number: nameNum,
            meaning: getNameMeaning(nameNum)
          }
    }];
    setResults(resultData);
    
    setIsCalculating(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="text-center text-2xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Numerology Reading</h1>
            <p className="text-gray-600">Discover your life path and destiny numbers</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Input Section */}
            <div className="grid gap-6">
              <div className="space-y-2">
                <label htmlFor="birthdate">Birth Date</label>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <input
                    id="birthdate"
                    type="date"
                    value={birthDate}
                    onChange={(e:any) => setBirthDate(e.target.value)} // eslint-disable-line @typescript-eslint/no-explicit-any
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-200 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="fullname">Full Name</label>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <input
                    id="fullname"
                    type="text"
                    value={fullName}
                    onChange={(e: any) => setFullName(e.target.value)} // eslint-disable-line @typescript-eslint/no-explicit-any
                    placeholder="Enter your full name"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-200 outline-none"
                  />
                </div>
              </div>

              <button 
                onClick={handleCalculate}
                disabled={isCalculating || !birthDate || !fullName}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex justify-center"
              >
                {isCalculating ? (
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-5 h-5 animate-spin" />
                    <span>Calculating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-5 h-5" />
                    <span>Calculate Numbers</span>
                  </div>
                )}
              </button>
            </div>

            {/* Results Section */}
            {results.length > 0 && (
              <div className="space-y-6 mt-8">
                <h3 className="text-xl font-semibold text-center">Your Numerology Results</h3>
                
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Life Path Number */}
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-lg mb-2">Life Path Number: {results[0].lifePath.number}</h4>
                      <p className="text-gray-600">{results[0].lifePath.meaning}</p>
                    </CardContent>
                  </Card>

                  {/* Name Number */}
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-lg mb-2">Name Number: {results[0].name.number}</h4>
                      <p className="text-gray-600">{results[0].name.meaning}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NumerologyCalculator;