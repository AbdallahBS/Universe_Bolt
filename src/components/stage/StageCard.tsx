import React from 'react';
import { MapPin, Clock, Building2, Calendar, Wifi, DollarSign, Tag } from 'lucide-react';
import { Stage } from '../../data/stageData';

interface StageCardProps {
  stage: Stage;
  onApply: (stageId: string) => void;
}

const StageCard: React.FC<StageCardProps> = ({ stage, onApply }) => {
  const getTypeColor = (type: Stage['type']) => {
    switch (type) {
      case 'initiation':
        return 'bg-blue-100 text-blue-800';
      case 'perfectionnement':
        return 'bg-purple-100 text-purple-800';
      case 'pfe':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: Stage['type']) => {
    switch (type) {
      case 'initiation':
        return 'Initiation';
      case 'perfectionnement':
        return 'Perfectionnement';
      case 'pfe':
        return 'PFE';
      default:
        return type;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(stage.type)}`}>
                {getTypeLabel(stage.type)}
              </span>
              {stage.isRemote && (
                <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  <Wifi className="w-3 h-3" />
                  Remote
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors mb-2">
              {stage.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
              <div className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {stage.company}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {stage.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {stage.duration}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 mb-4 leading-relaxed">
          {stage.description}
        </p>

        {/* Skills */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Compétences requises:</h4>
          <div className="flex flex-wrap gap-2">
            {stage.skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium"
              >
                {skill}
              </span>
            ))}
            {stage.skills.length > 4 && (
              <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-md text-xs">
                +{stage.skills.length - 4} plus
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Deadline: {new Date(stage.applicationDeadline).toLocaleDateString('fr-FR')}
            </div>
            {stage.salary && (
              <div className="flex items-center gap-1 text-emerald-600 font-medium">
                <DollarSign className="w-4 h-4" />
                {stage.salary}
              </div>
            )}
          </div>
          <button
            onClick={() => onApply(stage.id)}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg"
          >
            Postuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default StageCard;