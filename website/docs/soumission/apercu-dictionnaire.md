---
id: apercu-dictionnaire
title: Dictionnaire de données
platform_key: DOCS_DICTIONARY_OVERVIEW
---


Le [dictionnaire de données](/dictionnaire) présente les détails du modèle de données et les formats et restrictions auxquels adhére ce modèle pour assurer l'harmonisation et la qualité des données. Chacune des tables du dictionnaire est reliée à un concept clinique. Les études partenaires doivent soumettre au CQDG des données pour un minumum de tables pour que le jeu de données soit considérées recevables.  


## Comprendre le dictionnaire de données

Le [visionneur du dictionnaire](/dictionnaire) présente l'ensemble des variables cliniques qui peut accompagner les données moléculaires hébergées au CQDG.

La liste des champs peut être filtée de manière à identifier les [champs nécessaires pour la soumission](/soumission/soumettre-donnees-cliniques).

Les anciennes versions du dictionnaire peuvent être consultées en utilisant le menu déroulant au dessus du dictionnaire. Cependant, la dernière version du dictionnaire doit être utilisée lors de la soumission de données.

### Descripteurs des chamnps

Chacun des champs est classé en fonction de l'exigence des données et de ses attributs. Ces informations permettent d'identifier les champs qui sont considérés nécessaires pour qu'une soumission soit jugée recevable. Les champs peuvent être classés ainsi:  

![ID](/assets/submission/dictionary-id.svg) 

- Ces champs représentent des codes d'indentification uniques qui sont utilisés pour créer les liens entre les différentes tables de données.
- Ces champs peuvent être une clé primaire ou externe à une table du dictionnaire. 

![Conditionnel](/assets/submission/dictionary-conditional.svg)

- Ces champs doivent rencontrer certaines conditions et dépendent de la valeur d'un autre champs. Par exemple, l'âge du décès ne peut être soumis que lorsque le status du doneur est "décédé". 
- Les règles entourant les champs conditionnels sont décrites dans les notes et scripts du dictionnaire de données.

![Requis](/assets/submission/dictionary-required.svg)

- Ces champs doivent être soumis sans condition.

![Essentiel](/assets/submission/dictionary-core.svg)

- Ces champs font partie de l'ensemble des données cliniques essentiel à être soumis.  
- Lorsqu'un champs `Essentiel`,est aussi considéré `Conditionnel`, ce dernier doit être soumis uniquement si les condtions sont rencontrées.

![Supplémentaire](/assets/submission/dictionary-extended.svg)

- Ces champs sont considérés d'intérêt mais sont optionnels.
- Afin d'augmenter la valeur des données du CQDG, il est fortement encouragé de soumettre des données pour un maximum de champs `Supplémentaire`. 

### Valeurs permissibles

- Afin de favoriser la standardisation des données, certains champs n'acceptent que les valeurs provenant d'une terminologie reconnue (WHO ICD-10, ICD-O-3, HPO, DUO), ou certaines valeurs d'une énumération prédéfinie. Les valeurs permissibles sont présentées dans le dictionnaire de données ou, si cette liste est trop longue, celles-ci sont décrites dans les notes du dictionnaire. Prenez note que l'orthographe des mots doit être respectée.   


### Terminologie 

Le CQDG préconise l'utilisation de termiologies standards. Celles-ci incluent, notamment: 

- [World Health Organization International Classification of Diseases, 10th Revision (ICD-10)](https://icd.who.int/browse10/2019/en)
- [International Classification of Diseases for Oncology (ICD-O)](http://www.iacr.com.fr/index.php?option=com_content&view=category&layout=blog&id=100&Itemid=577)
- [Data Use Ontology](https://github.com/EBISPOT/DUO)
- [Human Phenotype Ontology](https://hpo.jax.org/app/)
