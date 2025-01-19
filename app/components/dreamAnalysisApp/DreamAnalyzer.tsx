"use client"
import React, { useState, useCallback } from 'react';
import { Book, Moon, Search, Plus, Calendar, RotateCw, Sparkles, Cloud, Sun } from 'lucide-react';

// Type definitions
interface DreamSymbol {
  symbol: string;
  meaning: string;
}

interface DreamAnalysis {
  mainThemes: string[];
  symbols: DreamSymbol[];
  mood: 'positive' | 'negative' | 'neutral';
  interpretation: string;
  guidance: string;
  timestamp: string;
}

interface Dream {
  text: string;
  analysis: DreamAnalysis;
}

interface CommonSymbols {
  [key: string]: string;
}

const DreamAnalyzer: React.FC = () => {
  // State management with proper types
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [currentDream, setCurrentDream] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'write' | 'journal'>('write');
  const [showResponse, setShowResponse] = useState<boolean>(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<DreamAnalysis | null>(null);

  // Common dream symbols and their meanings
  const commonSymbols: CommonSymbols = {
    flying: 'Feeling of freedom, escape from limitations',
    falling: 'Loss of control, anxiety about a situation',
    water: 'Emotions, unconscious mind, clarity',
    teeth: 'Anxiety about appearance or communication',
    chase: 'Avoiding an issue or person in waking life',
    house: 'State of mind, different aspects of personality',
    animals: 'Basic instincts, hidden qualities',
    vehicles: 'Direction in life, journey towards goals'
  };

  const analyzeDream = useCallback(async (dreamText: string) => {
    if (!dreamText.trim()) return;

    setLoading(true);
    setError('');
    setShowResponse(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const analysis: DreamAnalysis = {
        mainThemes: ['personal growth', 'transformation', 'relationships'],
        symbols: detectSymbols(dreamText),
        mood: analyzeMood(dreamText),
        interpretation: generateInterpretation(dreamText),
        guidance: provideGuidance(dreamText),
        timestamp: new Date().toISOString()
      };

      const newDream: Dream = {
        text: dreamText,
        analysis: analysis
      };

      setDreams(prev => [newDream, ...prev]);
      setCurrentAnalysis(analysis);
      setShowResponse(true);
    } catch (err) {
      setError('Failed to analyze dream. Please try again.');
      console.error('Error analyzing dream:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const detectSymbols = (text: string): DreamSymbol[] => {
    return Object.entries(commonSymbols)
      .filter(([symbol]) => text.toLowerCase().includes(symbol.toLowerCase()))
      .map(([symbol, meaning]) => ({ symbol, meaning }));
  };

  const analyzeMood = (text: string): DreamAnalysis['mood'] => {
    const moodIndicators = {
      positive: ['happy', 'peaceful', 'exciting', 'beautiful'],
      negative: ['scary', 'anxious', 'frightening', 'dark'],
      neutral: ['strange', 'unclear', 'mysterious']
    };

    const textLower = text.toLowerCase();
    if (moodIndicators.positive.some(word => textLower.includes(word))) return 'positive';
    if (moodIndicators.negative.some(word => textLower.includes(word))) return 'negative';
    return 'neutral';
  };

  const generateInterpretation = (text: string): string => {
    const symbols = detectSymbols(text);
    const mood = analyzeMood(text);
    return `Your dream appears to reflect ${mood} emotions and contains symbols related to ${
      symbols.map(s => s.symbol).join(', ') || 'general themes'
    }. This suggests you might be processing experiences related to these themes.`;
  };

  const provideGuidance = (text: string): string => {
    const mood = analyzeMood(text);
    const guidance = {
      positive: 'Consider how you can maintain and build upon the positive elements in your waking life.',
      negative: 'These symbols might be highlighting areas that need attention or resolution in your life.',
      neutral: 'Reflect on these symbols and how they might relate to your current life situation.'
    };
    return guidance[mood];
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    analyzeDream(currentDream);
  };

  const handleNewDream = () => {
    setCurrentDream('');
    setShowResponse(false);
    setCurrentAnalysis(null);
    setActiveTab('write');
  };

  const filteredDreams = dreams.filter(dream => {
    const searchLower = searchTerm.toLowerCase();
    return (
      dream.text.toLowerCase().includes(searchLower) ||
      dream.analysis.mainThemes.some(theme => theme.toLowerCase().includes(searchLower)) ||
      dream.analysis.symbols.some(symbol => symbol.symbol.toLowerCase().includes(searchLower))
    );
  });

  const renderAnalysis = (analysis: DreamAnalysis) => (
    <div className="space-y-6 mt-6 bg-gray-50 p-6 rounded-xl">
      {/* Themes */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
          <Sun className="w-4 h-4 text-indigo-600" />
          Main Themes
        </h4>
        <div className="flex flex-wrap gap-2">
          {analysis.mainThemes.map((theme, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
            >
              {theme}
            </span>
          ))}
        </div>
      </div>

      {/* Symbols */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-medium text-gray-800 mb-2">Symbols Found</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysis.symbols.map((symbol, i) => (
            <div key={i} className="bg-gray-50 p-3 rounded-lg">
              <span className="font-medium text-indigo-600">{symbol.symbol}</span>
              <p className="text-sm text-gray-600 mt-1">{symbol.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interpretation & Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium text-gray-800 mb-2">Interpretation</h4>
          <p className="text-sm text-gray-600">{analysis.interpretation}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium text-gray-800 mb-2">Guidance</h4>
          <p className="text-sm text-gray-600">{analysis.guidance}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Moon className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Dream Analyzer</h1>
          </div>
          <p className="text-gray-600">Uncover the hidden meanings in your dreams</p>
        </div>

        {/* Main Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setActiveTab('write')}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                activeTab === 'write'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Dream
              </div>
            </button>
            <button
              onClick={() => setActiveTab('journal')}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                activeTab === 'journal'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Book className="w-4 h-4" />
                Journal ({dreams.length})
              </div>
            </button>
          </div>
        </div>

        {activeTab === 'write' && (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    className="w-full h-48 p-4 border rounded-xl resize-none bg-gray-50 focus:bg-white transition-colors duration-200 text-gray-800 focus:ring-2 focus:ring-indigo-200 outline-none"
                    placeholder="Describe your dream in detail..."
                    value={currentDream}
                    onChange={(e) => setCurrentDream(e.target.value)}
                  />
                  <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
                    {currentDream.length} characters
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  disabled={!currentDream.trim() || loading}
                >
                  {loading ? (
                    <>
                      <RotateCw className="w-5 h-5 animate-spin" />
                      Analyzing your dream...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Reveal Dream Meaning
                    </>
                  )}
                </button>

                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-lg animate-fadeIn">
                    {error}
                  </div>
                )}
              </div>
            </form>

            {showResponse && currentAnalysis && renderAnalysis(currentAnalysis)}
          </div>
        )}

        {activeTab === 'journal' && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-indigo-200 outline-none"
                placeholder="Search your dream journal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Dream Entries */}
            <div className="space-y-6">
              {filteredDreams.map((dream, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <Cloud className="w-5 h-5 text-indigo-600" />
                        <h3 className="font-semibold text-lg text-gray-800">
                          Dream #{dreams.length - index}
                        </h3>
                      </div>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(dream.analysis.timestamp).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">{dream.text}</p>
                    {renderAnalysis(dream.analysis)}
                  </div>
                </div>
              ))}

              {filteredDreams.length === 0 && (
                <div className="text-center py-12">
                  <Moon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No dreams found in your journal yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DreamAnalyzer;