/**
 * If tumour_normal_designation is NOT "Not applicable" then "cancer_biospecimen_type", 
 * "cancer_biospecimen_anatomic_location_source_text" and  
 * "cancer_biospecimen_anatomic_location_icd_code" must be provided.
 */
const validation = () =>
    (function validate(inputs) {
        const { $row, $name } = inputs;
        const $field = $row[$name];

        let result = { valid: true, message: 'Ok' };
        const currField = typeof $field === 'string' ? $field.trim().toLowerCase() : $field;
        const tumourNormalDesignation = $row.tumour_normal_designation || '';

        if (!currField && tumourNormalDesignation && tumourNormalDesignation.trim().toLowerCase() != 'Not applicable') {
            result = {
                valid: false,
                message: `${$name} must be provided when the biospecimen's tumour_normal_designation is either "Tumor" or "Normal".`,
            };
        }

        return result;
    });

module.exports = validation;
