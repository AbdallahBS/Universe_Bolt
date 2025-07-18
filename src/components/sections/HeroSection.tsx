import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { translations, Translation } from '../../utils/translations';

interface HeroSectionProps {
  language: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const t: Translation = translations[language];

  const heroImages = [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              currentImageIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
            {t.heroTagline}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-left">
            <span className="text-white">
              {t.heroTitle}
            </span>
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {t.heroSubtitle}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 leading-relaxed text-left">
            {t.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => scrollToSection('services')}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 font-medium"
            >
              {t.exploreServices}
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link 
              to="/signup"
              className="px-8 py-4 border-2 border-white/30 text-white rounded-xl hover:border-indigo-400 hover:bg-white/10 hover:text-indigo-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 font-medium backdrop-blur-sm"
            >
              {t.getStarted}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;