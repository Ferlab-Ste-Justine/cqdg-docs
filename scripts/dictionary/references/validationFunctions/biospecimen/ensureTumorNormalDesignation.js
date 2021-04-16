/**
 * If and only if the tumor_normal_designation is "tumor", then the "tumor_histological_type" must be provided.
 */
const validation = () =>
    (function validate(inputs) {
        const {$row, $name} = inputs;
        const $field = $row[$name];

        let result = {valid: true, message: 'Ok'};
        const currField = typeof $field === 'string' ? $field.trim().toLowerCase() : $field;
        const tumorNormalDesignation = $row.tumor_normal_designation.trim().toLowerCase();

        if (!currField && tumorNormalDesignation.toLowerCase() === 'tumor') {
            result = {
                valid: false,
                message: `${$name} must be provided when the biospecimen's tumor_normal_designation is tumor.`,
            };
        }

        return result;
    });

module.exports = validation;
