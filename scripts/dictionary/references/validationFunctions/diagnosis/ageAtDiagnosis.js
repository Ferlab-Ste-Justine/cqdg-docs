/**
 * Age at diagnosis 0 to 100 with decimals
 */
const validation = ($row, $field, $name) =>
  (function validate() {
    let result = { valid: true, message: 'Ok' };
    try {
      const currField = parseFloat($field);
      if (currField >= 101) {
        result = {
          valid: false,
          message: `${$name} must be between 0 and 100, optionally with decimal.`,
        };
      }
    } catch (err) {
      result = {
        valid: false,
        message: `The value '${field}' of the field ${$name} could not be converted to a decimal number. (parseFloat failed)`,
      };
    }

    return result;
  })();

module.exports = validation;
