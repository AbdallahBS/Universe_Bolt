import React, { useState } from 'react';
import { Calculator, BookOpen, BarChart, Search, FileText } from 'lucide-react';

interface OrientationPageProps {
  language: string;
}

const OrientationPage: React.FC<OrientationPageProps> = ({ language }) => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [score, setScore] = useState("0.00");

  const sectors = [
    {
      name: "Mathématiques",
      subjects: 9,
      icon: Calculator
    },
    {
      name: "Sciences Expérimentales",
      subjects: 9,
      icon: BookOpen
    },
    {
      name: "Sciences Techniques",
      subjects: 8,
      icon: BarChart
    },
    {
      name: "Économie et Gestion",
      subjects: 8,
      icon: Search
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="bg-red-500 text-white p-2 rounded-lg">
              <Calculator className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold">OrientationTN</h1>
            <p className="text-sm text-slate-500">Ton avenir commence ici</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 mt-6">
            <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Calculateur
            </button>
            <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              Comparer
            </button>
            <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-2">
              <Search className="w-4 h-4" />
              Explorer
            </button>
            <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-2">
              <FileText className="w-4 h-4" />
              وجهني إنت
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Calculator Section */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Calculator className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold">Calculateur de Score</h2>
            </div>
            
            <p className="text-center text-slate-600 mb-8">
              Calcule ton score d'orientation en entrant tes notes du Baccalauréat. Le système utilise 
              les coefficients officiels de ton secteur.
            </p>

            {/* Sector Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Sélectionne ton secteur</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {sectors.map((sector) => (
                  <button
                    key={sector.name}
                    onClick={() => setSelectedSector(sector.name)}
                    className={`p-4 rounded-lg border transition-all ${
                      selectedSector === sector.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <sector.icon className={`w-5 h-5 ${
                        selectedSector === sector.name ? 'text-blue-500' : 'text-slate-500'
                      }`} />
                      <div className="text-left">
                        <div className="font-medium">{sector.name}</div>
                        <div className="text-sm text-slate-500">{sector.subjects} matières</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Score d'orientation</h3>
              <div className="text-4xl font-bold text-blue-900 mb-2">{score}</div>
              <div className="text-sm text-blue-700">Passable</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrientationPage; 