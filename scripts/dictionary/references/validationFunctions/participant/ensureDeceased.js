/**
 * If and only if a participant is deceased, then the cause of death must be provided.
 */
const validation = () =>
    (function validate(inputs) {
        const {$row, $name} = inputs;
        const $field = $row[$name];

        let result = {valid: true, message: 'Ok'};
        const vitalStatus = $row.vital_status || '';

        if ($field && vitalStatus && vitalStatus.trim().toLowerCase() !== 'deceased') {
            result = {
                valid: false,
                message: `${$name} cannot be provided if the participant's vital_status is not Deceased.`,
            };
        }
        return result;
    });

module.exports = validation;
