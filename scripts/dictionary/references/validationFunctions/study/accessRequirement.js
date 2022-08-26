const validation = () =>
    (function validate(inputs) {
        let result = {valid: true, message: 'Ok'};
        const list = [
            "DUO:0000017",
            "DUO:0000018",
            "DUO:0000019",
            "DUO:0000020",
            "DUO:0000021",
            "DUO:0000022",
            "DUO:0000025",
            "DUO:0000026",
            "DUO:0000027",
            "DUO:0000028",
            "DUO:0000029",
            "DUO:0000043",
            "DUO:0000044",
            "DUO:0000045",
            "DUO:0000046"
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
