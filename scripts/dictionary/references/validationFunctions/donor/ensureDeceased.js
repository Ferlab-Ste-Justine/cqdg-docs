/**
 * If and only if a donor is deceased, then the cause of death must be provided.
 */
const validation = () =>
    (function validate(inputs) {
        const {$row, $name} = inputs;
        const $field = $row[$name];

        let result = {valid: true, message: 'Ok'};
        const vitalStatus = $row.vital_status.trim().toLowerCase();

        if (!$field && vitalStatus.toLowerCase() === 'deceased') {
            result = {
                valid: false,
                message: `${$name} must be provided when the donor's vital_status is deceased.`,
            };
        } else if ($field && vitalStatus.toLowerCase() !== 'deceased') {
            result = {
                valid: false,
                message: `${$name} cannot be provided if the donor's vital_status is not deceased.`,
            };
        }
        return result;
    });

module.exports = validation;
