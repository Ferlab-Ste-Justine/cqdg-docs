const validation = () =>
    (function validate(inputs) {
        const {$row, $name} = inputs;
        const $field = $row[$name];

        let result = {valid: true, message: 'Ok'};
        const currField = typeof $field === 'string' ? $field.trim().toLowerCase() : $field;
        const treatmentType = $row.treatment_type.trim().toLowerCase();
        const treatmentTypes = [
            'chemotherapy',
            'hormonal therapy',
            'immunotherapy',
            'other targeting molecular therapy',
            'other pharmacotherapy',
        ];

        if (!currField && treatmentTypes.includes(treatmentType)) {
            result = {
                valid: false,
                message: `${$name} must be provided when the treatment_type is one of the following: ${treatmentTypes.join(
                    ', ',
                )}`,
            };
        }
        return result;
    });

module.exports = validation;
