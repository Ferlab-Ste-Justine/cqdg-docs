const sidebarFR = {
  Soumission: [
    'soumission/apercu-dictionnaire',
    'soumission/soumettre-donnees-cliniques',
  ],
  'Demande D\'accès Aux Données': [
    'acces-donnees/demande-acces-donnees',
    'acces-donnees/telechargement-donnees',
    'acces-donnees/profil-utilisateur',
    'acces-donnees/processus-publication',
  ],
}

module.exports = {
  en: {
      Submission: [
        'en/submission/dictionary-overview',
        'en/submission/submitting-clinical-data',
      ],
      'Data Access Request': [
        'en/data-access/data-access-request',
        'en/data-access/data-download',
        'en/data-access/user-profile',
        'en/data-access/publication-guidelines',
      ],
    },
  soumission: {
    ...sidebarFR
  },
  'acces-donnees': {
    ...sidebarFR
  }
};

