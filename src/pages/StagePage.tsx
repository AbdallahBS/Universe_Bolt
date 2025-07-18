import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, TrendingUp, Users } from 'lucide-react';
import { stagesData, Stage } from '../data/stageData';
import StageCard from '../components/stage/StageCard';
import StageFilters from '../components/stage/StageFilters';
import { translations, Translation } from '../utils/translations';

interface StagePageProps {
  language: string;
}

const StagePage: React.FC<StagePageProps> = ({ language }) => {
  const [selectedType, setSelectedType] = useState<Stage['type'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Toutes les villes');
  const t: Translation = translations[language];

  // Filter stages based on selected criteria
  const filteredStages = useMemo(() => {
    let filtered = stagesData;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(stage => stage.type === selectedType);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(stage =>
        stage.title.toLowerCase().includes(query) ||
        stage.company.toLowerCase().includes(query) ||
        stage.skills.some(skill => skill.toLowerCase().includes(query)) ||
        stage.description.toLowerCase().includes(query)
      );
    }

    // Filter by location
    if (selectedLocation !== 'Toutes les villes') {
      filtered = filtered.filter(stage =>
        stage.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    return filtered;
  }, [selectedType, searchQuery, selectedLocation]);

  const handleApply = (stageId: string) => {
    // Handle stage application logic
    console.log('Applying for stage:', stageId);
    alert('Candidature envoyée avec succès!');
  };

  // Statistics
  const stats = {
    total: stagesData.length,
    initiation: stagesData.filter(s => s.type === 'initiation').length,
    perfectionnement: stagesData.filter(s => s.type === 'perfectionnement').length,
    pfe: stagesData.filter(s => s.type === 'pfe').length
  };

  return (
    <div className={`min-h-screen bg-slate-50 pt-20 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 mb-6 transition-colors w-fit"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à l'accueil
          </Link>

          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
              <Briefcase className="w-4 h-4 mr-2" />
              Opportunités de Stage
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Stages Disponibles en Tunisie
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez les meilleures opportunités de stage dans les entreprises tunisiennes. 
              Filtrez par type, localisation et compétences pour trouver le stage parfait.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
              <div className="text-sm text-slate-600">Total Stages</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{stats.initiation}</div>
              <div className="text-sm text-slate-600">Initiation</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{stats.perfectionnement}</div>
              <div className="text-sm text-slate-600">Perfectionnement</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{stats.pfe}</div>
              <div className="text-sm text-slate-600">PFE</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <StageFilters
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
        />

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">
              {filteredStages.length} stage{filteredStages.length !== 1 ? 's' : ''} trouvé{filteredStages.length !== 1 ? 's' : ''}
            </h2>
            {(selectedType !== 'all' || searchQuery || selectedLocation !== 'Toutes les villes') && (
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSearchQuery('');
                  setSelectedLocation('Toutes les villes');
                }}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        </div>

        {/* Stage Cards */}
        {filteredStages.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredStages.map((stage) => (
              <StageCard
                key={stage.id}
                stage={stage}
                onApply={handleApply}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Aucun stage trouvé</h3>
            <p className="text-slate-600 mb-6">
              Essayez de modifier vos critères de recherche pour voir plus de résultats.
            </p>
            <button
              onClick={() => {
                setSelectedType('all');
                setSearchQuery('');
                setSelectedLocation('Toutes les villes');
              }}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 font-medium"
            >
              Voir tous les stages
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StagePage;