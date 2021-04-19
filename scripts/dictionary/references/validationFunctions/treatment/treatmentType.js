const validation = () =>
    (function validate(inputs) {
        const {$row, $name} = inputs;
        const $field = $row[$name];

        if(!$field){
            return {valid: false, message: `Column ${$name} is missing.`};
        }

        let result = {valid: true, message: 'Ok'};
        const currField = typeof $field === 'string' ? $field.trim().toLowerCase() : $field;
        const treatmentType = $row.treatment_type || '';
        const treatmentTypes = [
            'chemotherapy',
            'hormonal therapy',
            'immunotherapy',
            'other targeting molecular therapy',
            'other pharmacotherapy',
        ];

        if (!currField && treatmentType && treatmentTypes.includes(treatmentType.trim().toLowerCase())) {
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
