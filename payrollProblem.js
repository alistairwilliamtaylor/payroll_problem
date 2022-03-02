const fs = require('fs')
const prompt = require('prompt')
const { parse } = require('csv-parse');
const ObjectsToCsv = require('objects-to-csv')
const createPayslip = require('./createPaySlip');
const printPaySlip = require('./printPaySlip');

const csvInput = fs.readFileSync('sample_input.csv').toString()

parse(csvInput, {}, (err, records) => {
        const individualPayslipInfos = records.slice(1).map(record => createPayslip(interpretCSVInput(record)));
        saveToCSV(individualPayslipInfos)
        // console.log(individualPayslipInfos);
        // individualPayslipInfos.forEach(info => printPaySlip(createPayslip(info)));
    });
    
    const saveToCSV = async (payslips) => {
        const csv = new ObjectsToCsv(payslips);
        await csv.toDisk('./thisThingOn.csv')
        return 1
} 

const interpretCSVInput = record => {
        const [name, surname, salary, superPercentage, payPeriod] = record;
        const superRate = superPercentage.substring(0, superPercentage.length - 1);
        const [startDate, endDate] = payPeriod.split(' - ');
        const personalDetails = {
                name,
                surname,
                'annual salary': salary,
                'super rate': superRate,
                'start date': startDate,
                'end date': endDate,
        } 
        return personalDetails
}

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

// prompt.get(schema, (err, result) => {
//         const payslipInfo = createPayslip(result)
//         printPaySlip(payslipInfo)
// })