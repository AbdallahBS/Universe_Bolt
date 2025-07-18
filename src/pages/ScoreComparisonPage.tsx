import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { getUniversitiesByLicense, availableSpecialties } from '../data/cycleIngenieurData';

const ScoreComparisonPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const scoreG = parseFloat(searchParams.get('scoreG') || '0');
  const [selectedLicense, setSelectedLicense] = useState('');

  const getAcceptanceChance = (lastScore: number): {
    label: string;
    color: string;
    percentage: number;
  } => {
    const scoreDiff = scoreG - lastScore;
    
    if (scoreDiff >= 5) {
      return {
        label: 'فرصتك كبيرة باهي',
        color: 'bg-green-500',
        percentage: 100
      };
    } else if (scoreDiff >= 2) {
      return {
        label: 'فرصة متوسطة، نجم تعدي',
        color: 'bg-yellow-500',
        percentage: 75
      };
    } else if (scoreDiff >= -2) {
      return {
        label: 'فرصة ضعيفة، اما نجم يصير خير',
        color: 'bg-orange-500',
        percentage: 50
      };
    } else {
      return {
        label: 'صعيبة برشا، لازم تلقى حل آخر',
        color: 'bg-red-500',
        percentage: 25
      };
    }
  };

  const matchingUniversities = selectedLicense ? getUniversitiesByLicense(selectedLicense) : [];

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cycle-ingenieur"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            ارجع للمدارس
          </Link>
          
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">وين تنجم تدخل؟</h1>
                <p className="text-slate-600">شوف المدارس الي تنجم تدخلها بالـ score متاعك</p>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {scoreG.toFixed(4)}
              </div>
              <div className="text-slate-600">Score Global متاعك</div>
            </div>

            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                اختار التخصص متاعك
              </label>
              <select
                value={selectedLicense}
                onChange={(e) => setSelectedLicense(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option value="">-- اختار تخصص --</option>
                {availableSpecialties
                  .filter(s => s !== 'Toutes les spécialités')
                  .map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {selectedLicense && (
          <div className="grid gap-6">
            {matchingUniversities.map(({ university, specialties }) => (
              <div key={university.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{university.name}</h3>
                    <p className="text-slate-600">{university.fullName}</p>
                  </div>
                  <Link
                    to={`/university/${university.id}?specialty=${encodeURIComponent(selectedLicense)}`}
                    className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
                  >
                    تفاصيل أكثر
                  </Link>
                </div>

                <div className="grid gap-4">
                  {specialties.map((specialty) => {
                    const chance = getAcceptanceChance(specialty.lastAcceptableScore);
                    return (
                      <div key={specialty.code} className="bg-slate-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-slate-800">{specialty.name}</div>
                          <span className="text-sm text-slate-500">{specialty.code}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-2">
                          <div className="text-sm">
                            <span className="text-slate-600">آخر score قبلوه:</span>{' '}
                            <span className="font-bold">{specialty.lastAcceptableScore}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-slate-600">عدد البلايص:</span>{' '}
                            <span className="font-bold">{specialty.capacity}</span>
                          </div>
                        </div>

                        <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                          <div 
                            className={`absolute left-0 top-0 h-full ${chance.color} transition-all duration-500`}
                            style={{ width: `${chance.percentage}%` }}
                          />
                        </div>

                        <div className="text-sm font-medium" style={{ color: chance.color.replace('bg-', 'text-') }}>
                          {chance.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreComparisonPage; 