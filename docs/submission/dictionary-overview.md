---
id: dictionary-overview
title: Dictionnaire de données
platform_key: DOCS_DICTIONARY_OVERVIEW
---

Le dictionnaire de données est une ressource qui définit la structure de la base de données cliniques et génomiques, le modèle de données et les règles liées à ces données. Le dictionnaire de données définit aussi les liens qui existent entre les différentes entités du modèle de données.

Le [dictionnaire de données](/scripts/dictionary) représente les détails du modèle de données et les formats et restrictions auxquels adhére ce modèle pour assurer le portentiel d'harmonisation et la qualité des données. Chacune des tables du dictionnaire données est reliée à un concept clinique. Les projets partenaires doivent soumettre au CQDG des données pour un minumum de tables pour que l'ensemble de données soit considéré recevable.  

Veuillez vous référer à la section [publication du dictionnaire](/docs/release-notes/dictionary-releases) pour avoir des informations concernant les plus récentes mises à jour du dictionnaire,.

## Comprendre le dictionnaire de données

Le [visionneur du dictionnaire](/scripts/dictionary) présente l'ensemble de données cliniques qui peut accompagner les données moléculaires hébergées au CQDG.

La liste des champs peut être filtée en fonction du niveau d'exigence des données et de leur attribut, ce qui permet d'identifier les [champs nécessaires pour la soumission](/docs/submission/clinical-data-validation-rules).

Les anciennes versions du dictionnaire peuvent être consultées en utilisant le menu déroulant au dessus du dictionnaire. Cependant, la dernière version du dictionnaire doit être utilisée lors de la soumission de données.

### Descripteurs des chamnps

Chacun des champs est classé en fonction de l'exigence des données et de ses attributs. Ces information permettent d'identifier les champs qui sont considérés nécesaires pour qu'une soumission soit jugée recevable. Les champs peuvent être classés ainsi:  

![ID](/assets/submission/dictionary-id.svg) 

- Ces champs représentent des codes d'indentification uniques qui sont utilisés pour créer les liens entre les diffférentes tables de données.
- Ces champs peuvent être une clé primaire ou externe à une table du dictionnaire. 

![Conditional](/assets/submission/dictionary-conditional.svg)

- Ces champs doivent rencontrer certaines conditions et dépendent de la valeur d'un autre champs. Par exemple, l'âge du décès ne peut être soumis que lorsque le status du doneur est "décédé". 
- Les règles entourant les champs conditionnels sont décrites dans les notes et scripts du dictionnaire de données.

![Required](/assets/submission/dictionary-required.svg)

- Ces champs doivent être soumis sans condition.

![Core](/assets/submission/dictionary-core.svg)

- Ces champs font partie de l'ensemble de données cliniques essentiel à être soumis.  
- Lorsqu'un champs "core" est aussi considéré `Conditionmel`, ce dernier doit être soumis uniquement si les condtions sont rencontrées.

![Extended](/assets/submission/dictionary-extended.svg)

- Ces champs sont considérés d'intérêt mais sont optionnels.
- Afin d'augmenter la valeur des données du CQDG, il est fortement encouragé de soumettre des données pour un maximum de champs optionnels. 

### Valeurs permissibles

- Afin de favoriser la standardisation des données, certains champs n'acceptent que les valeurs provenant d'une terminologie reconnue (WHO ICD-10, ICD-O-3, HPO, DUO), ou certaines valeurs d'une énumération prédéfinie. Les valeurs permissibles sont présentées dans le dictionnaire de données ou, si cette liste est trop long, celles-ci sont décrites dans les notes du dictionnaire. Prenez note que l'orthographe des mots doit être respectée.   


### Terminologie 

Le CQDG préconise l'utilisation de termiologies standards. Celles-ci incluent, notamment: 

- [World Health Organization International Classification of Diseases, 10th Revision (ICD-10)](https://icd.who.int/browse10/2019/en)
- [International Classification of Diseases for Oncology (ICD-O)](http://www.iacr.com.fr/index.php?option=com_content&view=category&layout=blog&id=100&Itemid=577)
- [Data Use Ontology](https://github.com/EBISPOT/DUO)
- [Human Phenotype Ontology](https://hpo.jax.org/app/)