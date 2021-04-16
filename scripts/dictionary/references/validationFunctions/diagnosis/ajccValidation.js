const validation = () =>
    (function validate(inputs) {
        const {$row, $name} = inputs;
        const $field = $row[$name];

        if(!$field){
            return {valid: false, message: `Column ${$name} is missing.`};
        }

        let result = {valid: true, message: 'Ok'};
        const currField = typeof $field === 'string' ? $field.trim().toLowerCase() : $field;
        const tumorStagingSystem = $row.tumor_staging_system.trim();

        if (!currField && /^(AJCC)\b/i.test(tumorStagingSystem)) {
            result = {
                valid: false,
                message: `${$name} must be provided when the tumor_staging_system is AJCC.`,
            };
        } else if (currField && !/^(AJCC)\b/i.test($field)) {
            result = {
                valid: false,
                message: `${$name} cannot be provided when the tumor_staging_system is not AJCC.`,
            };
        }
        return result;
    });

module.exports = validation;
