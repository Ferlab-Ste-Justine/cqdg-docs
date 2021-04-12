const sidebarFR = {
    "Demande D'accès Aux Données": [
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
    soumission: {
        ...sidebarFR,
    },
};
