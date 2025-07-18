import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const UnderDevelopmentTooltip = () => (
    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-50">
      En cours de développement
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
    </div>
  );

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">À propos</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Universe est votre guide pour l'orientation universitaire en Tunisie. Nous vous aidons à trouver votre chemin vers l'excellence académique.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <div className="text-slate-400 hover:text-white transition-colors cursor-not-allowed relative group inline-flex items-center">
                  Accueil
                  <AlertCircle className="w-4 h-4 ml-2" />
               
                </div>
              </li>
              <li>
                <Link to="/cycle-ingenieur" className="text-slate-400 hover:text-white transition-colors">
                  Cycle Ingénieur
                </Link>
              </li>
              <li>
                <div className="text-slate-400 hover:text-white transition-colors cursor-not-allowed relative group inline-flex items-center">
                  Stages
                  <AlertCircle className="w-4 h-4 ml-2" />
            
                </div>
              </li>
              <li>
                <div className="text-slate-400 hover:text-white transition-colors cursor-not-allowed relative group inline-flex items-center">
                  Alternance
                  <AlertCircle className="w-4 h-4 ml-2" />
              
                </div>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li>
                <div className="text-slate-400 hover:text-white transition-colors cursor-not-allowed relative group inline-flex items-center">
                  Guide d'orientation
                  <AlertCircle className="w-4 h-4 ml-2" />
            
                </div>
              </li>
              <li>
                <div className="text-slate-400 hover:text-white transition-colors cursor-not-allowed relative group inline-flex items-center">
                  FAQ
                  <AlertCircle className="w-4 h-4 ml-2" />
          
                </div>
              </li>
              <li>
                <div className="text-slate-400 hover:text-white transition-colors cursor-not-allowed relative group inline-flex items-center">
                  Blog
                  <AlertCircle className="w-4 h-4 ml-2" />
              
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <div className="text-slate-400 hover:text-white transition-colors cursor-not-allowed relative group inline-flex items-center">
                  Nous contacter
                  <AlertCircle className="w-4 h-4 ml-2" />

                </div>
              </li>
              <li>
                <div className="text-slate-400 hover:text-white transition-colors cursor-not-allowed relative group inline-flex items-center">
                  Support
                  <AlertCircle className="w-4 h-4 ml-2" />
             
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            {new Date().getFullYear()} Universe
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
         
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;