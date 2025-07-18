import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Calendar, Award, ExternalLink, Download, X, Phone, Mail, MapPin as LocationIcon, Navigation } from 'lucide-react';
import { University } from '../../data/cycleIngenieurData';

interface UniversityCardProps {
  university: University;
  license?: string;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ university, license }) => {
  const getTypeColor = (type: University['type']) => {
    switch (type) {
      case 'specifique':
        return 'bg-blue-100 text-blue-800';
      case 'independant':
        return 'bg-purple-100 text-purple-800';
      case 'ressource-pedagogique':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: University['type']) => {
    switch (type) {
      case 'specifique':
        return 'مخصوص';
      case 'independant':
        return 'مستقل';
      case 'ressource-pedagogique':
        return 'مورد تعليمي';
      default:
        return type;
    }
  };

  const getStatusColor = (status: University['concoursStatus']) => {
    switch (status) {
      case 'launched':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'not-launched':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'closed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'results-published':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: University['concoursStatus']) => {
    switch (status) {
      case 'launched':
        return 'المسابقة مفتوحة';
      case 'not-launched':
        return 'لسا ما انفتحت';
      case 'closed':
        return 'المسابقة مسكرة';
      case 'results-published':
        return 'النتائج طلعت';
      default:
        return status;
    }
  };

  // Filter specialties by license if provided
  const filteredSpecialties = license
    ? university.detailedSpecialties.filter(s => {
        // Handle both string and array license types
        if (Array.isArray(s.license)) {
          return s.license.includes(license);
        }
        return s.license === license;
      })
    : university.detailedSpecialties;
  // Get the lowest acceptable score from filtered specialties
  const lowestScore = filteredSpecialties.length > 0
    ? Math.min(...filteredSpecialties.map(s => s.lastAcceptableScore))
    : null;

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 overflow-hidden group">
        {/* University Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={university.image} 
            alt={university.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-1">
              {university.name}
            </h3>
            <p className="text-sm text-white/90">{university.fullName}</p>
          </div>
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
              
               
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {university.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  تأسست سنة {university.establishedYear}
                </div>
               
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <div className="text-sm text-slate-500 mb-2">
              <span className="font-medium">الجامعة:</span> {university.university}
            </div>
          </div>

       

          {/* Specialties */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">التخصصات:</h4>
            <div className="flex flex-wrap gap-2">
              {filteredSpecialties.slice(0, 2).map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium"
                >
                  {specialty.name} ({specialty.code})
                </span>
              ))}
              {filteredSpecialties.length > 2 && (
                <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-md text-xs">
                  +{filteredSpecialties.length - 2} أكثر
                </span>
              )}
            </div>
          </div>

          {/* Last Acceptable Score */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-4 border border-indigo-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-3 text-center">آخر نقطة مقبولة {university.lastYearScores.year}:</h4>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">{lowestScore !== null ? lowestScore : '--'}</div>
              
              {filteredSpecialties.length > 1 && (
                <div className="text-xs text-slate-500 mt-1">
                  (تختلف حسب التخصص)
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <a
              href={`https://${university.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              الموقع الرسمي
            </a>
            <Link 
              to={{
                pathname: `/university/${university.id}`,
                search: license ? `?specialty=${encodeURIComponent(license)}` : ''
              }}
              state={{ selectedSpecialty: license || "Toutes les spécialités" }}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 font-medium text-sm shadow-lg"
            >
              معلومات أكثر
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UniversityCard;