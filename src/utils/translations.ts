export interface Translation {
  home: string;
  stage: string;
  alternance: string;
  cycleIngenieur: string;
  services: string;
  contact: string;
  login: string;
  getStarted: string;
  specifique: string;
  independant: string;
  ressourcePedagogique: string;
}

export const translations: { [key: string]: Translation } = {
  en: {
    home: 'Accueil',
    stage: 'Stage',
    alternance: 'Alternance',
    cycleIngenieur: 'Cycle Ingénieur',
    services: 'Services',
    contact: 'Contact',
    login: 'Connexion',
    getStarted: 'Commencer',
    specifique: 'Spécifique',
    independant: 'Indépendant',
    ressourcePedagogique: 'Ressource Pédagogique'
  },
  fr: {
    home: 'Accueil',
    stage: 'Stage',
    alternance: 'Alternance',
    cycleIngenieur: 'Cycle Ingénieur',
    services: 'Services',
    contact: 'Contact',
    login: 'Connexion',
    getStarted: 'Commencer',
    specifique: 'Spécifique',
    independant: 'Indépendant',
    ressourcePedagogique: 'Ressource Pédagogique'
  }
};