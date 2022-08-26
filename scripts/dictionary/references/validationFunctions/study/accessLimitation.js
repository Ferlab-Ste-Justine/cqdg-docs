const validation = () =>
    (function validate(inputs) {
        let result = {valid: true, message: 'Ok'};
        const list = [
            "DUO:0000004",
            "DUO:0000006",
            "DUO:0000007",
            "DUO:0000011",
            "DUO:0000042",
          ];

        const {$row, $name} = inputs;
        const $field = $row[$name];

        if(!$field){
            return result;
        }

        const currField = $field.trim().replace(/\s/g, '');
        const currValues = currField.split(';');
        let valid = true;
        currValues.forEach((value) => {
            if (value && !list.includes(value)) {
                valid = false;
            }
        })

        if (!valid) {
            result = {
                valid: false,
                message: `${$name} must contain a list of these codes: ${list.join(';')} separated by semicolon (;)`
            }
        }

        return result;
    });

module.exports = validation;
