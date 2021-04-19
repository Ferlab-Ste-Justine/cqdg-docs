const validation = () =>
    (function validate(inputs) {
        let result = {valid: true, message: 'Ok'};
        const {$row, $name} = inputs;
        const $field = $row[$name];

        if(!$field){
            return result;
        }

        const currField = typeof $field === 'string' ? $field.trim().toLowerCase() : $field;
        const isCancer = $row.is_cancer && $row.is_cancer.trim().toLowerCase() == "true";

        if (!currField && isCancer) {
            result = {
                valid: false,
                message: `${$name} must be provided when the diagnosis' is_cancer flag is 1/true.`,
            };
        }
        return result;
    });

module.exports = validation;
