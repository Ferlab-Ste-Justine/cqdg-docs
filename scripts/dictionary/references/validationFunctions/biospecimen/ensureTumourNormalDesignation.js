/**
 * If and only if the tumour_normal_designation is "tumour", then the "tumour_histological_type" must be provided.
 */
const validation = () =>
    (function validate(inputs) {
        const {$row, $name} = inputs;
        const $field = $row[$name];

        let result = {valid: true, message: 'Ok'};
        const currField = typeof $field === 'string' ? $field.trim().toLowerCase() : $field;
        const tumourNormalDesignation = $row.tumour_normal_designation.trim().toLowerCase();

        if (!currField && tumourNormalDesignation.toLowerCase() === 'tumour') {
            result = {
                valid: false,
                message: `${$name} must be provided when the biospecimen's tumour_normal_designation is Tumour.`,
            };
        }

        return result;
    });

module.exports = validation;
