import React from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { Stage } from '../../data/stageData';

interface StageFiltersProps {
  selectedType: Stage['type'] | 'all';
  onTypeChange: (type: Stage['type'] | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

const StageFilters: React.FC<StageFiltersProps> = ({
  selectedType,
  onTypeChange,
  searchQuery,
  onSearchChange,
  selectedLocation,
  onLocationChange
}) => {
  const stageTypes = [
    { value: 'all', label: 'Tous les stages', color: 'bg-slate-100 text-slate-700' },
    { value: 'initiation', label: 'Initiation', color: 'bg-blue-100 text-blue-700' },
    { value: 'perfectionnement', label: 'Perfectionnement', color: 'bg-purple-100 text-purple-700' },
    { value: 'pfe', label: 'PFE', color: 'bg-emerald-100 text-emerald-700' }
  ];

  const locations = ['Toutes les villes', 'Tunis', 'Sfax', 'Sousse', 'Monastir', 'Ariana', 'Nabeul'];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-800">Filtrer les stages</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Rechercher
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Titre, entreprise, compétences..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Localisation
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors appearance-none bg-white"
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Type Filter Buttons */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Type de stage
          </label>
          <div className="flex flex-wrap gap-2">
            {stageTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => onTypeChange(type.value as Stage['type'] | 'all')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedType === type.value
                    ? type.color + ' ring-2 ring-offset-1 ring-indigo-500'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageFilters;