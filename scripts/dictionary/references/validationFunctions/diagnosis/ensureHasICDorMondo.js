const validation = () =>
    (function validate(inputs) {
        let result = {valid: true, message: 'Ok'};
        const {$row, $name} = inputs;
        const $field = $row[$name];
        if(!$field){
            if ($name === 'diagnosis_ICD_code' && !$row.diagnosis_mondo_code) {
                result = {
                    valid: false,
                    message: `${$name} must be provided when the diagnosis' diagnosis_mondo_code does not exist.`,
                };
            } else if ($name === 'diagnosis_mondo_code' && !$row.diagnosis_ICD_code) {
                result = {
                    valid: false,
                    message: `${$name} must be provided when the diagnosis' diagnosis_ICD_code does not exist.`,
                };
            }
        }

        return result;
    });

module.exports = validation;
