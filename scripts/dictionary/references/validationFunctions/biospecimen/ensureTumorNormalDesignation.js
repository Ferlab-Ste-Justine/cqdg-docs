/**
 * If and only if the tumor_normal_designation is "tumor", then the "tumor_histological_type" must be provided.
 */
const validation = () =>
    (function validate(inputs) {
        const {$row, $name} = inputs;
        const $field = $row[$name];

        const currField = typeof $field === 'string' ? $field.trim().toLowerCase() : $field;
        const tumorNormalDesignation = $row.tumor_normal_designation || '';
        const tumorNormalDesignationLowered = tumorNormalDesignation.trim().toLowerCase();

        if (!currField && (tumorNormalDesignationLowered === 'tumor' || tumorNormalDesignationLowered === 'normal')) {
            return {
                valid: false,
                message: `${$name} must be provided when the biospecimen's tumor_normal_designation is Tumor or Normal.`,
            };
        }

        return { valid: true, message: 'Ok' };
    });

module.exports = validation;
