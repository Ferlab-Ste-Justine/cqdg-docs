---
id: apercu-dictionnaire
title: Dictionnaire de données
platform_key: DOCS_DICTIONARY_OVERVIEW
---


Le [dictionnaire de données](/dictionnaire) présente les détails du modèle de données et les formats et restrictions auxquels adhére ce modèle pour assurer l'harmonisation et la qualité des données. Chacune des tables du dictionnaire est reliée à un concept clinique. Les études partenaires doivent soumettre au CQDG des données pour un minumum de tables pour que le jeu de données soit considéré recevable.  


## Comprendre le dictionnaire de données

Le [visionneur du dictionnaire](/dictionnaire) présente l'ensemble des renseignements cliniques qui peut accompagner les données moléculaires hébergées au CQDG.

La liste des champs peut être filtrée de manière à identifier les **champs nécessaires** pour la soumission.

Les anciennes versions du dictionnaire peuvent être consultées en utilisant le menu déroulant au-dessus du dictionnaire. Cependant, la dernière version du dictionnaire doit être utilisée lors de la soumission de données.

### Descripteurs des chamnps

Chacun des champs est classé en fonction de l'exigence des données et de ses attributs. Ces informations permettent d'identifier les champs qui sont considérés nécessaires pour qu'une soumission soit jugée recevable.  Il est à noter qu'il n'est pas obligatoire de soumettre des données pour toutes les tables du dictionnaire. Cependant, si une table de données est soumise, celle-ci doit nécessairement être complète et respecter les standards du modèle de données. Les champs peuvent être classés ainsi:  

![ID](/assets/submission/dictionary-id.svg)
 
- Ces champs représentent des codes d'identification qui sont utilisés pour créer les liens entre les différentes tables de données.
- Ces champs peuvent être une clé primaire ou externe à une table du dictionnaire. 

![Conditional](/assets/submission/dictionary-conditional.svg)

- Ces champs doivent rencontrer certaines conditions et dépendent de la valeur d'un autre champ. Par exemple, l'âge du décès ne peut être soumis que lorsque le statut du donneur est "décédé". 
- Les règles entourant les champs conditionnels sont décrites dans les notes et scripts du dictionnaire de données.

![Required](/assets/submission/dictionary-required.svg)

- Ces champs doivent être soumis sans condition.

![Core](/assets/submission/dictionary-core.svg)

- Ces champs font partie de l'ensemble des renseignements cliniques essentiels pour une table de données.
- Lorsqu'un champ `Core`,est aussi considéré `Conditional`, ce dernier doit être soumis uniquement si les condtions sont rencontrées.

![Extended](/assets/submission/dictionary-extended.svg)

- Ces champs sont considérés d'intérêt mais sont optionnels.
- Afin d'augmenter la valeur des données du CQDG, il est fortement encouragé de soumettre des données pour un maximum de champs `Extended`. 

### Valeurs permises

- Afin de favoriser la standardisation des données, certains champs n'acceptent que les valeurs provenant d'une terminologie reconnue (CIM-10, CIM-O-3, HPO, DUO), ou certaines valeurs d'une énumération prédéfinie. Les valeurs permises sont présentées dans le dictionnaire de données ou, si cette liste est trop longue, elle est décrite dans les notes du dictionnaire. Prenez note que l'orthographe des mots doit être respectée.   


### Terminologie 

Le CQDG préconise l'utilisation de termiologies standards. Celles-ci incluent notamment: 

- [World Health Organization International Classification of Diseases, 10th Revision (ICD-10)](https://icd.who.int/browse10/2019/en)
- [International Classification of Diseases for Oncology (ICD-O)](https://www.who.int/standards/classifications/other-classifications/international-classification-of-diseases-for-oncology)
- [Data Use Ontology](https://github.com/EBISPOT/DUO)
- [Human Phenotype Ontology](https://hpo.jax.org/app/)
- [Mondo Disease Ontology (Mondo)](https://monarch-initiative.github.io/mondo)
Il est fortement recommandé d'utiliser ces systèmes de classification pour attribuer des valeurs standards à vos données. 
