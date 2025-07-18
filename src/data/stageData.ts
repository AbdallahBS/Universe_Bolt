export interface Stage {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'initiation' | 'perfectionnement' | 'pfe';
  duration: string;
  description: string;
  requirements: string[];
  skills: string[];
  applicationDeadline: string;
  isRemote: boolean;
  salary?: string;
  logo?: string;
}

export const stagesData: Stage[] = [
  // Initiation Stages
  {
    id: '1',
    title: 'Stage Initiation en Développement Web',
    company: 'TechnoSoft Tunisia',
    location: 'Tunis',
    type: 'initiation',
    duration: '1 mois',
    description: 'Découvrez les bases du développement web avec HTML, CSS et JavaScript. Un stage parfait pour débuter votre carrière dans le développement.',
    requirements: ['Étudiant en informatique', 'Niveau débutant accepté', 'Motivation et curiosité'],
    skills: ['HTML', 'CSS', 'JavaScript', 'Git'],
    applicationDeadline: '2024-03-15',
    isRemote: false,
    salary: '300 DT/mois'
  },
  {
    id: '2',
    title: 'Stage Initiation Marketing Digital',
    company: 'Digital Marketing Pro',
    location: 'Sfax',
    type: 'initiation',
    duration: '6 semaines',
    description: 'Apprenez les fondamentaux du marketing digital, SEO, et gestion des réseaux sociaux.',
    requirements: ['Étudiant en marketing/communication', 'Connaissance de base des réseaux sociaux'],
    skills: ['SEO', 'Social Media', 'Google Analytics', 'Content Creation'],
    applicationDeadline: '2024-03-20',
    isRemote: true,
    salary: '250 DT/mois'
  },
  {
    id: '3',
    title: 'Stage Initiation Comptabilité',
    company: 'Cabinet Comptable Ben Ali',
    location: 'Sousse',
    type: 'initiation',
    duration: '1 mois',
    description: 'Introduction aux principes comptables et utilisation des logiciels de gestion.',
    requirements: ['Étudiant en comptabilité/gestion', 'Connaissance Excel'],
    skills: ['Comptabilité', 'Excel', 'Sage', 'Fiscalité'],
    applicationDeadline: '2024-03-25',
    isRemote: false,
    salary: '280 DT/mois'
  },

  // Perfectionnement Stages
  {
    id: '4',
    title: 'Stage Perfectionnement React.js',
    company: 'InnovaTech Solutions',
    location: 'Tunis',
    type: 'perfectionnement',
    duration: '3 mois',
    description: 'Perfectionnez vos compétences en développement React.js avec des projets réels et une équipe expérimentée.',
    requirements: ['Connaissance React.js', 'Expérience JavaScript', 'Portfolio de projets'],
    skills: ['React.js', 'Node.js', 'MongoDB', 'TypeScript', 'Redux'],
    applicationDeadline: '2024-04-01',
    isRemote: false,
    salary: '800 DT/mois'
  },
  {
    id: '5',
    title: 'Stage Perfectionnement Data Science',
    company: 'DataTech Analytics',
    location: 'Monastir',
    type: 'perfectionnement',
    duration: '4 mois',
    description: 'Travaillez sur des projets de data science avec Python, machine learning et visualisation de données.',
    requirements: ['Connaissance Python', 'Statistiques', 'Machine Learning basics'],
    skills: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'SQL'],
    applicationDeadline: '2024-04-10',
    isRemote: true,
    salary: '900 DT/mois'
  },
  {
    id: '6',
    title: 'Stage Perfectionnement Cybersécurité',
    company: 'SecureNet Tunisia',
    location: 'Ariana',
    type: 'perfectionnement',
    duration: '3 mois',
    description: 'Approfondissez vos connaissances en cybersécurité avec des cas pratiques et outils professionnels.',
    requirements: ['Bases en sécurité informatique', 'Réseaux', 'Linux'],
    skills: ['Penetration Testing', 'Network Security', 'Linux', 'Wireshark'],
    applicationDeadline: '2024-04-05',
    isRemote: false,
    salary: '850 DT/mois'
  },

  // PFE Stages
  {
    id: '7',
    title: 'PFE: Développement Application Mobile E-commerce',
    company: 'E-Shop Tunisia',
    location: 'Tunis',
    type: 'pfe',
    duration: '6 mois',
    description: 'Développez une application mobile complète pour le e-commerce avec React Native et backend Node.js.',
    requirements: ['Niveau ingénieur', 'React Native', 'Node.js', 'Base de données'],
    skills: ['React Native', 'Node.js', 'MongoDB', 'Payment Integration', 'API Development'],
    applicationDeadline: '2024-05-01',
    isRemote: false,
    salary: '1200 DT/mois'
  },
  {
    id: '8',
    title: 'PFE: Intelligence Artificielle pour la Santé',
    company: 'MedTech Innovation',
    location: 'Sfax',
    type: 'pfe',
    duration: '6 mois',
    description: 'Développez des solutions IA pour le diagnostic médical en utilisant deep learning et computer vision.',
    requirements: ['Master/Ingénieur', 'Deep Learning', 'Python', 'Computer Vision'],
    skills: ['TensorFlow', 'PyTorch', 'Computer Vision', 'Medical Imaging', 'Python'],
    applicationDeadline: '2024-05-15',
    isRemote: false,
    salary: '1500 DT/mois'
  },
  {
    id: '9',
    title: 'PFE: Blockchain et Fintech',
    company: 'FinTech Innovations',
    location: 'Tunis',
    type: 'pfe',
    duration: '6 mois',
    description: 'Créez une plateforme fintech basée sur la blockchain pour les paiements digitaux.',
    requirements: ['Niveau ingénieur', 'Blockchain', 'Smart Contracts', 'Web3'],
    skills: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts', 'DeFi'],
    applicationDeadline: '2024-05-20',
    isRemote: true,
    salary: '1400 DT/mois'
  },
  {
    id: '10',
    title: 'PFE: IoT et Smart Cities',
    company: 'Smart Solutions Tunisia',
    location: 'Sousse',
    type: 'pfe',
    duration: '6 mois',
    description: 'Développez des solutions IoT pour les villes intelligentes avec capteurs et analytics.',
    requirements: ['Ingénieur', 'IoT', 'Embedded Systems', 'Cloud Computing'],
    skills: ['Arduino', 'Raspberry Pi', 'AWS IoT', 'Sensors', 'Data Analytics'],
    applicationDeadline: '2024-05-10',
    isRemote: false,
    salary: '1300 DT/mois'
  }
];

export const getStagesByType = (type: Stage['type']): Stage[] => {
  return stagesData.filter(stage => stage.type === type);
};

export const getStagesByLocation = (location: string): Stage[] => {
  return stagesData.filter(stage => 
    stage.location.toLowerCase().includes(location.toLowerCase())
  );
};

export const searchStages = (query: string): Stage[] => {
  const lowercaseQuery = query.toLowerCase();
  return stagesData.filter(stage => 
    stage.title.toLowerCase().includes(lowercaseQuery) ||
    stage.company.toLowerCase().includes(lowercaseQuery) ||
    stage.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery))
  );
};