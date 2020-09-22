---
id: clinical-data-validation-rules
title: Validation des données cliniques
platform_key: DOCS_CLINICAL_VALIDATION_RULES
---

## Règles de codage des données cliniques

### Codes d'identification

Le dictionnaire de données contient certains champs qui sont des codes d'identification. Ces champs sont identifiés à l'aide d'une étiquette ![ID](/assets/submission/dictionary-id.svg) dans le dictionnaire de données. Ces codes incluent:

- Study: `submitter_study_id`
- Donor: `submitter_donor_id`
- Data Use Requirements: `submitter_access_requirement_id`
- Biospecimen: `submitter_biospecimen_id`
- Diagnosis: `submitter_diagnosis_id`
- Treatment: `submitter_treatment_id`
- Follow Up: `submitter_follow_up_id`
- Phenotype: `submitter_phenotype_id`
- Family: `submitter_family_id`


La création de ces codes d'identification doit être faite en respectant les directives suivantes: 


- Aucun numéro d'identification d'hôpital, de biobanque ou information personnelle ne doit être utilisé pour générer les codes d'identification. 
- Les codes d'identification doivent être conçus de manière à protéger l'identité des donneurs. 
- Les études partenaires ont l'entière responsabilité de conserver les clés permettant de faire le lien entre les données des donneurs soumises au CQDG et l'ensemble des données détenues sur ces donneurs par les études (incluant possiblement leurs informations personnelles). Ces clés ne doivent, en aucun cas, être communiquées avec le CQDG ou avec les utilisateurs des données du CQDG. 
- Les codes d'identification doivent être assignés par les études soumissionnaires et doivent être uniques parmi tous les codes d'identification soumis par ces études. 
- Les mêmes codes d'identification doivent être conservés durant toute la période de conservation des données par le CQDG. Lors d'une mise à jour des données ou d'une nouvelle soumission, les codes d'identification attribués aux donneurs, par exemple, ne peuvent ni changer, ni être réutilisés pour identifier d'autres donneurs.  
- Les codes d'identification sont sensibles aux majuscules et minuscules. 

### Codes d'identification des diagnostics, phénotypes, traitements et suivis médicaux:

Ces codes d'identification permettent de faire des liens entre différents évènements cliniques dans le parcours d'un patient. Les règles entourant le création de ces codes d'identification sont les suivantes:

- Un code d'identification unique doit être attribué à chaque diagnostic `submitter_diagnosis_id`. Par conséquent, si un donneur a plusieurs diagnostic, chacun des diagnostic doit avoir son code d'identification unique `submitter_diagnosis_id`. Afin de pouvoir lier un diagnostic à un biospécimen, vous allez devoir inclure le code d'identification `submitter_diagnosis_id` dans la table `Biopecimen` file. Le code d'identification `submitter_diagnosis_id` est aussi requis dans la table `Treatment` pour permettre d'associer un traitement à un diagnostic donné.
- Un code d'identification unique doit être attribué à chaque traitement `submitter_treatment_id` dans la table `Treatment`. Si le traitement est un traitement pharmacologique, vous aurez l'option de fournir sont numéro d'identification d'une drogue (DIN), qui est un numéro attribué par Santé Canada avant d'être commercialisé au Canada. 
- Un code d'identification unique doit également être attribué à chaque phénotype `submitter_phenotype_id` et à chaque suivi médical `submitter_follow_up_id`.  

### Dates partielles

Pour prévenir l'identification des donneurs, il est possible de soumettre des dates partielles, incluant minimalement l'année. Ceci est le cas pour la date de naissance. Pour ce type de données, comme pour tout autre type de données soumis au CQDG, l'étude partenaire est resonsable d'en assurer la qualité. Par conséquent, s'attend à voir une concordance entre les dates des évènements d'un parcours-patient (naissance, diagnostic, suivi, décès, etc.).

Le CQDG peut mettre en place une procédure de vérification de la concordance des données et signaler ou rejetter toute données ne rencontrant pas certaines exigences en matière de qualité  


## Contrôle de qualité

### Validation entre les différents champs du dictionnaire de données


Un certain nombre de vérifications de la concodance entre les champs sera effectué par le CQDG afin d'assurer le contrôle de la qualité des données. Certaines de ces vérifications sont documentées dans le dictionnaire de données; voir le bouton `View Script` dans la colonne notes du dictionnaire. Celles-ci incluent, notamment la vérification de la concorance entre des champs liés par une dépendence (champs conditionnels), par exemple: 

- Le sytème de gradation d'une tumeur `tumour_grading_system` et le grade de la tumeur `tumour_grade`.   
- Le type de biospécimen `specimen_type` et sa désignation comme échantillon tumoral ou normal `tumour_normal_designation`.
- L'âge du décès `age_of_death` et le status du donneur `vital_status`. 


### Validation entre les différentes tables du dictionnaire de données

Les relations entre les différents champs cliniques des différentes tables peuvent aussi être validées pour assurer l'intégrité et l'exactitude des données. Cette validation requiert la mise en correspondence des codes d'identification dans les différentes tables de données et la vérification de la valeur d'un champs d'une table à l'autre. En voici quelques exemples:  

- Vérification qu'il n'existe qu'un code d'identification donneur `submitter_donor_id` pour un biospécimen donné `submitter_biospecimen_id`.
- Vérification qu'il n'existe qu'un code d'identification famille `submitter_family_id` pour un donneur   `submitter_donor_id`.
- Vérification de l'existence d'un code `submitter_diagnosis_id` qui corresponde à un code dans les tables  `Treatment`, `Specimen` ou `Follow Up`.


## Complétude des données cliniques

Les données cliniques ne peuvent être considérées complétes que lorsque des valeurs ont été soumises pour tous les champs requis (indiqué par la mention 'core' dans le dictionnaire de données). 

 > **IMPORTANT: Les données cliniques doivent être considérées complètes afin que les fichiers d'analyses moléculaires soient rendus accessible pour la recherche.** 

### Comment évaluer la complétude des données cliniques?

On considère que les données cliniques sont complètes si le soumissionnaire a fourni des valeurs pour tous les champs qui sont définis comme étant des champs **"core"**  dans le [data dictionary](/scripts/dictionary), et ce, pour un ensemble minimal de tables: C'est à dire: 

- Un donneur doit avoir une table donneur dont tous les champs core comportent des valeurs.
- Au moins une table biospécimen doit être complétée pour chaque donneur, incluant tous les champs cores. 
