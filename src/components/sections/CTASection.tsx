import React from 'react';
import { Link } from 'react-router-dom';
import { translations, Translation } from '../../utils/translations';

interface CTASectionProps {
  language: string;
}

const CTASection: React.FC<CTASectionProps> = ({ language }) => {
  const t: Translation = translations[language];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-indigo-900/90"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse"></span>
          {t.ctaTagline}
        </div>
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
          {t.ctaTitle}
          <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          </span>
        </h2>
        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          {t.ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/signup"
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            {t.startFreeTrial}
          </Link>
          <button className="px-8 py-4 border-2 border-slate-400 text-slate-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300 transition-all duration-300 transform hover:scale-105 font-semibold">
            {t.scheduleDemo}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;