const sidebarFR = {
    "Demande d'accès aux données": [
        'acces-donnees/demande-acces-donnees',
        'acces-donnees/telechargement-donnees',
        'acces-donnees/profil-utilisateur',
        'acces-donnees/processus-publication',
    ],
    Soumission: ['soumission/apercu-dictionnaire', 'soumission/soumettre-donnees-cliniques'],
};

module.exports = {
    'acces-donnees': {
        ...sidebarFR,
    },
    en: {
        'Data Access Request': [
            'acces-donnees/demande-acces-donnees',
            'acces-donnees/telechargement-donnees',
            'acces-donnees/profil-utilisateur',
            'acces-donnees/processus-publication',
        ],
        Submission: ['soumission/apercu-dictionnaire', 'soumission/soumettre-donnees-cliniques'],
    },
    soumission: {
        ...sidebarFR,
    },
};
