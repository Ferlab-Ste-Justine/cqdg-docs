---
id: submitting-clinical-data
title: Soumettre des données 
platform_key: DOCS_SUBMITTING_CLINICAL_DATA
---


> L'équipe du CQDG est à développer un système de soumission pour la validation en ligne de vos données. 

Entre temps, [Contactez-nous](https://plateforme.cqdg.ca/contact) pour créer un compte SFTP qui vous permettra de téléverser vos fichiers en toute sécurité 

## Comment soumettre vos données cliniques

L'information de base qui doit être inscrite pour chaque échantillon moléculaire est présentée dans la section inscription des échantillons du dictionnaire [Data Dictionary](/scripts/dictionary).

### Étape 1: Télécharger un client SFTP

Recommandation: le logiciel gratuit [Filezilla](https://filezilla-project.org/index.php)

### Étape 1: Inscription de vos échantillons

1. Accéder à votre compte à partir de la page principale du portail.
2. Télécharger le **gabarit TSV** pour l'inscription de vos échantillons et formatter ce fichier en fonction de la version actuelle du [Dictionnaire de données](/scripts/dictionary).
3.  Une fois que votre fichier d'inscription est formatté, il peut être soumis en cliquant `inscrire les échantillons`. Veillez à ce que le fichier soit en format TSV est soit nommé en débutant par _sample-registration_.
4. Le processus de validation de l'inscription des échantillons prend en général 24hr. Vous recevrez un message si des erreurs sont détectées dans le fichier soumis. Toutes les erreurs énumérées doivent être corrigées avant de pouvoir soumettre de nouveau le fichier.


>  [Contactez-nous](https://platform.icgc-argo.org/contact) si vous avez des changements à faire après l'insciption de vos échantillons.

### Étape 2: Soumttre vos données cliniques

1. Accéder à votre compte à partir de la page principale du portail.
2. Télécharger les **gabarits TSV** pour la soumission de vos échantillons et formatter ce fichier en fonction de la version actuel du [Dictionnaire de données](/scripts/dictionary). Vous pouvez ouvrir les fichiers dans Excel et copier votre données en format TEXT dans les champs appropriés (indiqués à la première ligne dans le fichier). 
3.  Une fois que vos fichiers de soumission sont formattés, ils peuvent être soumis en cliquant `soumettre vos données`. Veillez à ce que chaque fichier soit en format TSV est soit nommé en débutant par le nom de la table de données clinique, par example: donor, biospecimen, etc.
4. Le processus de validation des données soumises prend en général 24hr. Vous recevrez un message si des erreurs sont détectées dans les fichiers soumis. Toutes les erreurs énumérées doivent être corrigées avant de pouvoir accepter les données.
5.  Une fois que vos données ont été validées, il est important de signer le soumission pour officialiser leur intégration au CQDG

> Si vous devez effectuer des mises à jour suivant le soumission de vos données, vous devez nous contacter afin de réouvrir votre dossier de soumission.  


[Contactez-nous](https://plateforme.cqdg.ca/contact) si vous avez besoin d'assistance pour l'inscription de vos échantillons ou pour la soumssion de vos données cliniques.

## Comment soumettre vos données moléculaires

> Veuillez noter que les outils pour la soumission des données moléculaires sont en développement. 


## Traitement des données moléculaires soumises

Une fois que vos données moléculaires auront été soumises, elles seront analysées en utilisant des pipelines uniformes pour tous les échantillons. 

## Contrôle de la qualité et libération des données 


Les données ne seront rendues publiques qu'une fois le processus de contrôle de la qualité terminé. 

> Veuillez noter qu'une période d'embargo peut être exigée, durant laquelle uniquement les chercheurs de l'étude peuvent avoir accès aux données. Aprés cette période d'embargo, les données peuvent être rendues accessibles à la communauté scientifique plus large. 
