---
id: dictionary-overview
title: Dicitonary Overview
platform_key: DOCS_DICTIONARY_OVERVIEW
---


Le [Data Dictionary](/scripts/dictionary) outines the details of the data model which adheres to specific formats and restrictions to ensure data quality and harmonization. Each table in the Data Dictionary is related to a clinical concept. Partner studies must submit data for a minimum number of tables for the dataset to be considered admissible. 


## Understanding the Data Dictionary

Le [Dictionary viewer](/scripts/dictionary) lists all clinical variables that can be submitted along with the genomic data hosted by the CQDG.

Field listings can be filtered in order to identify all [the data elements that are required for the submission](/docs/submission/clinical-data-validation-rules).

You can explore previous dictionary versions using the dropdown at the top of the dictionary. Using the latest version of the dictionary is required during data submission.

### Field Descriptors

Each field has a data tier and an attribute classification. This information may be used to identify fields that are required for the submission to be considered admissible. Field can be classified as such:   

![ID](/assets/submission/dictionary-id.svg) 

- These fields are unique identifiers used for cross file validation.
- These fields may be primary of foreign keys. 

![Conditional](/assets/submission/dictionary-conditional.svg)

- These fields must meet certain conditions and depend on the value of another field. For example, age of death can only be submitted when the donor's status is "deceased".
- The rules surrounding conditional fields are described in the data dictionary notes and scripts.

![Required](/assets/submission/dictionary-required.svg)

- These fields must be provided without any condition.

![Core](/assets/submission/dictionary-core.svg)

- These fields are part of the mandatory minimum set of clinical data that must be submitted.
- When paired with the `Conditional` attribute, this field is only required if `Conditional` requirements are met.


![Extended](/assets/submission/dictionary-extended.svg)

- These fields are considered of scientific interest but are optional.
- In order to enhance the value of the CQDG data, it is strongly suggested to submit as many  `Extended` fields as possible. 

### Permissibles values

- In order to facilitate data standardization, some fields only accept values that are compatible with certaines terminologies such as (WHO ICD-10, ICD-O-3, HPO, DUO), or certain predefined values. Permissible values are presented in the Data Dictionary, or, if the list is too long, it is described in the notes. Please note that spelling must be exact in order for the data to be admissible. 


### Terminology 

The CQDG recommends the use of standard termiologies. These include, in particular:

- [World Health Organization International Classification of Diseases, 10th Revision (ICD-10)](https://icd.who.int/browse10/2019/en)
- [International Classification of Diseases for Oncology (ICD-O)](http://www.iacr.com.fr/index.php?option=com_content&view=category&layout=blog&id=100&Itemid=577)
- [Data Use Ontology](https://github.com/EBISPOT/DUO)
- [Human Phenotype Ontology](https://hpo.jax.org/app/)
