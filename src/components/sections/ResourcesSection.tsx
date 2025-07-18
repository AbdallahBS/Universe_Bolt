import React from 'react';
import { BookOpen, Download, PlayCircle, ChevronRight } from 'lucide-react';
import { translations, Translation } from '../../utils/translations';

interface ResourcesSectionProps {
  language: string;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ language }) => {
  const t: Translation = translations[language];

  return (
    <section id="resources" className="py-24 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            {t.resourcesTagline}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            {t.resourcesTitle}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t.resourcesDescription}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Download className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{t.softwareGuides}</h3>
                <p className="text-slate-600 leading-relaxed">{t.softwareGuidesDesc}</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{t.studyMaterials}</h3>
                <p className="text-slate-600 leading-relaxed">{t.studyMaterialsDesc}</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <PlayCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{t.videoTutorials}</h3>
                <p className="text-slate-600 leading-relaxed">{t.videoTutorialsDesc}</p>
              </div>
            </div>

            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 font-medium shadow-lg">
              {t.browseResources}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
            <div className="aspect-video bg-slate-200 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Students studying"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-center justify-center">
                <button className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-xl">
                  <PlayCircle className="w-10 h-10 text-white" />
                </button>
              </div>
            </div>
            
            {/* Floating stats */}
            <div className="absolute -top-6 -right-6 bg-white rounded-xl p-6 shadow-xl border border-slate-200">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">10K+</div>
                <div className="text-sm text-slate-600 font-medium">Resources</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl border border-slate-200">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">5K+</div>
                <div className="text-sm text-slate-600 font-medium">Videos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;