import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, X, AlertCircle } from 'lucide-react';
import { getUniversitiesByLicense, availableSpecialties, University, universitiesData } from '../../data/cycleIngenieurData';

const ScoreCalculator: React.FC = () => {
  const [scores, setScores] = useState({
    // First Year
    moyenne1ereAnnee: '',
    rang1ereAnnee: '',
    effectif1ereAnnee: '',
    francais1ereAnnee: '',
    anglais1ereAnnee: '',
    
    // Second Year
    moyenne2emeAnnee: '',
    rang2emeAnnee: '',
    effectif2emeAnnee: '',
    francais2emeAnnee: '',
    anglais2emeAnnee: '',
    
    // Other parameters
    anneeNaissance: '',
    anneeConcours: new Date().getFullYear().toString(),
    moyenneBac: '',
    scoreE: '',
    selectedLicense: ''
  });

  const [results, setResults] = useState({
    scoreA: 0,
    scoreM: 0,
    scoreR: 0,
    scoreML: 0,
    scoreB1: 0,
    scoreB2: 0,
    scoreG: 0
  });

  // Add new state for comparison
  const [showComparison, setShowComparison] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [comparisonSpecialty, setComparisonSpecialty] = useState('');

  // Add new state for video modal
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Add new state for warning modal
  const [showWarningModal, setShowWarningModal] = useState(false);

  const calculateM = (mg: number): number => {
    if (mg >= 15) return 100;
    if (mg > 10) return 20 * (mg - 10);
    return 0;
  };

  const calculateRi = (rang: number, effectif: number): number => {
    if (!rang || !effectif) return 0;
    const ri = (rang - 1) / effectif;
    if (ri <= 0.3) return 100 - (700 * ri) / 3;
    return 0;
  };

  const calculateB1 = (anneeNaissance: number, anneeConcours: number): number => {
    return anneeNaissance >= anneeConcours - 22 ? 5 : 0;
  };

  const calculateB2 = (moyenneBac: number): number => {
    if (moyenneBac >= 16) return 20;
    if (moyenneBac >= 14) return 15;
    if (moyenneBac >= 12) return 10;
    if (moyenneBac >= 11) return 5;
    return 0;
  };

  const calculateScores = () => {
    // Calculate Mg (average of two years)
    const moy1 = parseFloat(scores.moyenne1ereAnnee) || 0;
    const moy2 = parseFloat(scores.moyenne2emeAnnee) || 0;
    const mg = (moy1 + moy2) / 2;
    
    // Calculate M
    const scoreM = calculateM(mg);
    
    // Calculate R
    const r1 = calculateRi(
      parseFloat(scores.rang1ereAnnee),
      parseFloat(scores.effectif1ereAnnee)
    );
    const r2 = calculateRi(
      parseFloat(scores.rang2emeAnnee),
      parseFloat(scores.effectif2emeAnnee)
    );
    const scoreR = (r1 + r2) / 2;
    
    // Calculate ML
    const fr1 = parseFloat(scores.francais1ereAnnee) || 0;
    const fr2 = parseFloat(scores.francais2emeAnnee) || 0;
    const en1 = parseFloat(scores.anglais1ereAnnee) || 0;
    const en2 = parseFloat(scores.anglais2emeAnnee) || 0;
    const scoreML = (fr1 + fr2 + en1 + en2) / 4;
    
    // Calculate B1
    const scoreB1 = calculateB1(
      parseInt(scores.anneeNaissance),
      parseInt(scores.anneeConcours)
    );
    
    // Calculate B2
    const scoreB2 = calculateB2(parseFloat(scores.moyenneBac));
    
    // Calculate Score A
    const scoreA = 0.2 * scoreM + (1.4/3) * scoreR + (5/6) * scoreML + (2/3) * (scoreB1 + scoreB2);

    // Calculate Score G
    const scoreE = parseFloat(scores.scoreE) || 0;
    const scoreG = scoreA * 0.7 + scoreE * 0.3;

    setResults({
      scoreA: Math.round(scoreA * 100) / 100,
      scoreM: Math.round(scoreM * 100) / 100,
      scoreR: Math.round(scoreR * 100) / 100,
      scoreML: Math.round(scoreML * 100) / 100,
      scoreB1,
      scoreB2,
      scoreG: Math.round(scoreG * 100) / 100
    });
  };

  useEffect(() => {
    calculateScores();
  }, [scores]);

  const handleInputChange = (field: string, value: string) => {
    setScores(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleCompareClick = () => {
    // This function is now handled by the new comparison section
    // navigate(`/score-comparison?scoreG=${results.scoreG.toFixed(4)}`);
  };

  const getComparisonStatus = (lastScore: number) => {
    const difference = results.scoreG - lastScore;
    
    if (difference >= 5) {
      return { color: 'bg-green-500', text: ' 🤲✨ فرصتك كبيرة إن شاء الله تكون من المقبولين' };
    } else if (difference >= 2) {
      return { color: 'bg-yellow-500', text: 'إن شاء الله تكون من المقبولين، عندك فرصة باهية ✨' };
    } else if (difference >= -5) {
      return { color: 'bg-orange-500', text: '  قريب ياسر إن شاء الله مقبول و بالتوفيق 🌟   ' };
    } else {
      return { color: 'bg-red-500', text: 'سكورك بعيد .  زيد شوف اختيارات آخرين و إن شاء الله بالتوفيق 🍀    ' };
    }
  };

  // Get specialties for selected university
  const getUniversitySpecialties = (university: University) => {
    return university.detailedSpecialties.map(spec => ({
      name: spec.name,
      code: spec.code,
      lastScore: spec.lastAcceptableScore,
      capacity: spec.capacity
    }));
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">i7seb score mte3ek </h3>
            <p className="text-slate-600">Da5el les notes w chouf Score A w Score Global mte3ek</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            {/* First Year Section */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-4">3am Lowel</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Mo3adel 3am lowel
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.01"
                    value={scores.moyenne1ereAnnee}
                    onChange={(e) => handleInputChange('moyenne1ereAnnee', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Ex: 15.50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Classement
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={scores.rang1ereAnnee}
                      onChange={(e) => handleInputChange('rang1ereAnnee', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ex: 1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      3dad fel promo
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={scores.effectif1ereAnnee}
                      onChange={(e) => handleInputChange('effectif1ereAnnee', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ex: 100"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Note Français
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.01"
                      value={scores.francais1ereAnnee}
                      onChange={(e) => handleInputChange('francais1ereAnnee', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ex: 15.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Note Anglais
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.01"
                      value={scores.anglais1ereAnnee}
                      onChange={(e) => handleInputChange('anglais1ereAnnee', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ex: 15.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Second Year Section */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-4">3am Theni</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Mo3adel 3am theni
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.01"
                    value={scores.moyenne2emeAnnee}
                    onChange={(e) => handleInputChange('moyenne2emeAnnee', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Ex: 16.00"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Classement
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={scores.rang2emeAnnee}
                      onChange={(e) => handleInputChange('rang2emeAnnee', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ex: 1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      3dad fel promo
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={scores.effectif2emeAnnee}
                      onChange={(e) => handleInputChange('effectif2emeAnnee', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ex: 100"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Note Français
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.01"
                      value={scores.francais2emeAnnee}
                      onChange={(e) => handleInputChange('francais2emeAnnee', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ex: 15.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Note Anglais
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.01"
                      value={scores.anglais2emeAnnee}
                      onChange={(e) => handleInputChange('anglais2emeAnnee', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ex: 15.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Other Information */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-4">Ma3loumet O5ra</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      3am Miledek
                    </label>
                    <input
                      type="number"
                      min="1990"
                      max="2010"
                      step="1"
                      value={scores.anneeNaissance}
                      onChange={(e) => handleInputChange('anneeNaissance', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ex: 2000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Mo3adel Bac
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.01"
                      value={scores.moyenneBac}
                      onChange={(e) => handleInputChange('moyenneBac', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ex: 15.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Score E (Ken 3andek)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={scores.scoreE}
                      onChange={(e) => handleInputChange('scoreE', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ken m3andekch 5alih fer8"
                    />
                    <button
                      onClick={() => setShowVideoModal(true)}
                      className="w-full py-2 px-4 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <Calculator className="w-4 h-4" />
                      M3raftech tall3 Score E? Ija n3awnek blili na9der kenek DSI kifi
                    </button>
                  </div>
                </div>
              </div>
            </div>

        

            {/* Add Compare Button */}
            <button
              onClick={() => setShowWarningModal(true)}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              9aren m3a les écoles
            </button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Score A */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800">Score A</h4>
                  <p className="text-sm text-slate-600">Score mta3 l'admission</p>
                </div>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${getScoreColor(results.scoreA)}`}>
                  {results.scoreA.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Score G */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800">Score Global</h4>
                  <p className="text-sm text-slate-600">Score A × 0.7 + Score E × 0.3</p>
                </div>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${getScoreColor(results.scoreG)}`}>
                  {results.scoreG.toFixed(2)}
                </div>
                {!scores.scoreE && (
                  <p className="text-sm text-slate-500">
                    Ken m3andekch Score E, Score Global yet7seb 3la Score A bark
                  </p>
                )}
              </div>
            </div>

            {/* Formula Info */}
            <div className="bg-slate-50 rounded-xl p-4">
              <h5 className="font-semibold text-slate-800 mb-3">Kifech yet7seb Score :</h5>
              <div className="space-y-2 text-sm">
                
                <code className="block bg-white p-2 rounded mt-1 text-xs">
                  Score Global = 0.7×Score A + 0.3×Score E
                </code>
               
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      {showComparison && (
        <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Chouf win tnajm tod5ol</h3>
          
          {/* University Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              E5tar l'école
            </label>
            <select
              value={selectedUniversity?.id || ''}
              onChange={(e) => {
                const uni = universitiesData.find(u => u.id === e.target.value);
                setSelectedUniversity(uni || null);
                setComparisonSpecialty('');
              }}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- E5tar l'école --</option>
              {universitiesData.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.name} - {uni.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Specialty Selection - Only show if university is selected */}
          {selectedUniversity && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                E5tar ta5assos
              </label>
              <select
                value={comparisonSpecialty}
                onChange={(e) => setComparisonSpecialty(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">-- E5tar ta5assos --</option>
                {getUniversitySpecialties(selectedUniversity).map((spec) => (
                  <option key={spec.code} value={spec.code}>
                    {spec.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Comparison Results - Only show if both university and specialty are selected */}
          {selectedUniversity && comparisonSpecialty && (
            <div className="space-y-6">
              {selectedUniversity.detailedSpecialties
                .filter(spec => spec.code === comparisonSpecialty)
                .map((specialty, index) => {
                  const status = getComparisonStatus(specialty.lastAcceptableScore);
                  return (
                    <div key={index} className="bg-slate-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-slate-800">{specialty.name}</h4>
                          <p className="text-sm text-slate-600">{specialty.capacity} places </p>
                        </div>
                        <div className="text-sm">
                          <span className="text-slate-600">Score minimum:</span>{' '}
                          <span className="font-bold">{specialty.lastAcceptableScore.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-slate-600">
                              {specialty.lastAcceptableScore.toFixed(2)}
                            </span>
                          </div>
                          <div>
                            <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white ${status.color}`}>
                              {results.scoreG.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="flex h-2 mb-4 overflow-hidden rounded bg-slate-200">
                          <div
                            style={{ width: '100%' }}
                            className={`shadow-none flex flex-col whitespace-nowrap justify-center ${status.color}`}
                          ></div>
                        </div>
                        <div className="text-center font-medium" style={{ color: status.color.replace('bg-', 'text-') }}>
                          {status.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}

      {/* Warning Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-2xl transform transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">la7tha  tensech </h3>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
               koll fac 3ndha Score E 5as biha 7asb l formule, dima badel Score E 7asb l fac li cht9aren biha w inchallah rabi M3ak ❤️
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowWarningModal(false);
                  setShowComparison(true);
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold text-slate-800">Kifech t7seb Score E mte3ek</h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://drive.google.com/file/d/1BO23V4JxSF6GFWkjlvLMFWQBHhz-jgm0/preview"
                title="Score E Calculation Guide"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4 bg-slate-50 rounded-b-xl">
              <p className="text-sm text-slate-600">
                video li nes li 9raw DSI , Exemple 3ala Ecole Nationale Des Sciences De l'informatique,
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScoreCalculator;