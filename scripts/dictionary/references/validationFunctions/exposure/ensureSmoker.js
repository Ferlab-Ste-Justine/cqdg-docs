/**
 * If a donor is a smoker or former smoker, then the number of pack-years must be provided.
 */
const validation = () =>
    (function validate(inputs) {
        const {$row, $name} = inputs;
        const $field = $row[$name];

        let result = {valid: true, message: 'Ok'};
        const smokingStatus = $row.smoking_status || '';

        if (!$field && smokingStatus && smokingStatus.trim().toLowerCase() !=  'Never smoker' && smokingStatus.trim().toLowerCase() != 'Unknown if ever smoked') {
            result = {
                valid: false,
                message: `${$name} has to be provided if the donor's smoking_status is NOT Never smoker or Unknown if ever smoked.`,
            };
        }
        return result;
    });

module.exports = validation;
