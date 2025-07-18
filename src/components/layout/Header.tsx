import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X, ChevronDown, AlertCircle, GraduationCap, Calculator } from 'lucide-react';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { translations, Translation } from '../../utils/translations';

interface HeaderProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const t: Translation = translations[language];

  const toggleDropdown = (dropdown: string) => {
    if (dropdown === 'cycle') {
      setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    }
  };

  const UnderDevelopmentTooltip = () => (
    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-50">
      En cours de développement
      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-slate-800"></div>
    </div>
  );

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
              Universe
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <div className="relative px-4 py-2 rounded-lg transition-all duration-300 font-medium text-slate-400 cursor-not-allowed">
                {t.home}
                <AlertCircle className="w-4 h-4 inline-block ml-1 text-slate-400" />
              </div>
            </div>

            {/* New Orientation Link */}
            <Link
              to="/orientation"
              className="relative px-4 py-2 rounded-lg transition-all duration-300 font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              التوجيه
              <span className="absolute -top-2 -right-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full animate-pulse">
                NEW
              </span>
            </Link>

            {/* Stage Dropdown */}
            <div className="relative group">
              <div className="flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 font-medium text-slate-400 cursor-not-allowed">
                {t.stage}
                <ChevronDown className="w-4 h-4" />
                <AlertCircle className="w-4 h-4 inline-block ml-1 text-slate-400" />
              </div>
            </div>

            <div className="relative group">
              <div className="px-4 py-2 rounded-lg transition-all duration-300 font-medium text-slate-400 cursor-not-allowed">
                {t.alternance}
                <AlertCircle className="w-4 h-4 inline-block ml-1 text-slate-400" />
              </div>
            </div>

            {/* Cycle Ingénieur Dropdown */}
            <div className="relative">
              <Link
                to="/cycle-ingenieur"
                className="flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
              >
                {t.cycleIngenieur}
              </Link>
            </div>

            <div className="relative group">
              <div className="px-4 py-2 rounded-lg transition-all duration-300 font-medium text-slate-400 cursor-not-allowed">
                {t.services}
                <AlertCircle className="w-4 h-4 inline-block ml-1 text-slate-400" />
              </div>
            </div>

            <div className="relative group">
              <div className="px-4 py-2 rounded-lg transition-all duration-300 font-medium text-slate-400 cursor-not-allowed">
                {t.contact}
                <AlertCircle className="w-4 h-4 inline-block ml-1 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher currentLanguage={language} onLanguageChange={onLanguageChange} />
            <div className="relative group">
              <div className="px-5 py-2 text-slate-400 cursor-not-allowed font-medium">
                {t.login}
                <AlertCircle className="w-4 h-4 inline-block ml-1 text-slate-400" />
              </div>
            </div>
            <div className="relative group">
              <div className="px-6 py-2.5 bg-gradient-to-r from-slate-400 to-slate-500 text-white rounded-lg cursor-not-allowed font-medium">
                {t.getStarted}
                <AlertCircle className="w-4 h-4 inline-block ml-1 text-white" />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-200">
            <div className="flex flex-col space-y-2 pt-4">
              <div className="text-left px-4 py-3 text-slate-400 rounded-lg font-medium cursor-not-allowed flex items-center">
                {t.home}
                <AlertCircle className="w-4 h-4 ml-2" />
              </div>

              {/* New Mobile Orientation Link */}
              <Link
                to="/orientation"
                className="text-left px-4 py-3 text-slate-700 rounded-lg font-medium hover:bg-slate-50 flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  التوجيه
                </div>
                <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full animate-pulse">
                  NEW
                </span>
              </Link>

              <div className="px-4 py-2 opacity-50 cursor-not-allowed">
                <div className="text-slate-400 font-medium mb-2 flex items-center">
                  {t.stage}
                  <AlertCircle className="w-4 h-4 ml-2" />
                </div>
              </div>

              <div className="text-left px-4 py-3 text-slate-400 rounded-lg font-medium cursor-not-allowed flex items-center">
                {t.alternance}
                <AlertCircle className="w-4 h-4 ml-2" />
              </div>

              {/* Cycle Ingénieur */}
              <Link
                to="/cycle-ingenieur"
                className="text-left px-4 py-3 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.cycleIngenieur}
              </Link>

              <div className="text-left px-4 py-3 text-slate-400 rounded-lg font-medium cursor-not-allowed flex items-center">
                {t.services}
                <AlertCircle className="w-4 h-4 ml-2" />
              </div>

              <div className="text-left px-4 py-3 text-slate-400 rounded-lg font-medium cursor-not-allowed flex items-center">
                {t.contact}
                <AlertCircle className="w-4 h-4 ml-2" />
              </div>

              <div className="flex flex-col space-y-3 pt-4">
                <LanguageSwitcher currentLanguage={language} onLanguageChange={onLanguageChange} />
                <div className="px-4 py-3 text-slate-400 cursor-not-allowed font-medium flex items-center">
                  {t.login}
                  <AlertCircle className="w-4 h-4 ml-2" />
                </div>
                <div className="px-6 py-3 bg-slate-400 text-white rounded-lg cursor-not-allowed font-medium flex items-center justify-center">
                  {t.getStarted}
                  <AlertCircle className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;