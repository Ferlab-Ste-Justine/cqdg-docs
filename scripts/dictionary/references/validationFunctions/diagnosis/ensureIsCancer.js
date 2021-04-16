const validation = () =>
    (function validate(inputs) {
        const {$row, $name} = inputs;
        const $field = $row[$name];

        if(!$field){
            return {valid: false, message: `Column ${$name} is missing.`};
        }

        let result = {valid: true, message: 'Ok'};
        const currField = typeof $field === 'string' ? $field.trim().toLowerCase() : $field;
        const isCancer = parseInt($row.is_cancer);

        if (!currField && isCancer === 1) {
            result = {
                valid: false,
                message: `${$name} must be provided when the diagnosis' is_cancer flag is 1/true.`,
            };
        }
        return result;
    });

module.exports = validation;
