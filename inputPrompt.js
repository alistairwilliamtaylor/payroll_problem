const prompt = require('prompt')
const printPaySlip = require('./printPaySlip');
const createPayslip = require('./createPaySlip');

prompt.message = 'Please enter your ';
prompt.delimiter = '';
prompt.colors = false;

const schema = {
    properties: {
        name: {
            pattern: /^[a-zA-Z\s\-]+$/,
            message: 'Name may only contain letters, spaces, or dashes',
            required: true
        },
        surname: {
            pattern: /^[a-zA-Z\s\-]+$/,
            message: 'Surname may only contain letters, spaces, or dashes',
            required: true
        },
        'annual salary': {
            pattern: /^[0-9]+$/,
            message: 'Salary must be a positive integer',
            required: true
        },
        'super rate': {
            pattern: /^([0-9]|[1-4][0-9]|50)$/,
            message: 'Salary must be a positive integer between 0 and 50',
            required: true
        },
        'start date': {
            pattern: /^0?1 (January|February|March|April|May|June|July|August|September|October|November|December)$/,
            message: 'Date must be the first day of a month e.g. 1 February',
            required: true
        },
        'end date': {
            pattern: /^((31 (January|March|May|July|August|October|December))|(2[89] February)|(30 (September|April|June|November)))$/,
            message: 'Date must be the last day of a month e.g. 30 September',
            required: true
        },
    }
}

const runCommandLineApp = () => {
    prompt.get(schema, (err, result) => {
            const payslipInfo = createPayslip(result)
            printPaySlip(payslipInfo)
    })
}

module.exports = runCommandLineApp