const fs = require('fs')
const prompt = require('prompt')
const { parse } = require('csv-parse');

// const csvInput = fs.readFileSync('sample_input.csv').toString()

// parse(csvInput, {}, (err, records) => {
//         const individualRecords = records.slice(1).map(record => interpretCSVInput(record));
//         console.log(individualRecords);
// });

// const interpretCSVInput = record => {
//         const [name, surname, salary, superPercentage, payPeriod] = record;
//         const superRate = superPercentage.substring(0, superPercentage.length - 1);
//         const [startDate, endDate] = payPeriod.split(' - ');
//         const personalDetails = {
//                 name,
//                 surname,
//                 'annual salary': salary,
//                 'super rate': superRate,
//                 'start date': startDate,
//                 'end date': endDate,
//         } 
//         return personalDetails
// }

const incomeTax = salary => {
        if (salary < 18200) {
            return 0
        } else if (salary <= 37000) {
            return (salary - 18200) * .19;
        } else if (salary <= 87000) {
            return 3572 + (salary - 37000) * .325;
        } else if (salary <= 180000) {
            return 19822 + (salary - 87000) * .37;               
        } else {
            return 54232 + (salary - 180000) * .45
        } 
}

const superContribution = (salary, superRate) => salary * (superRate/100)

const theMonths = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12
}

const numberOfMonthsWorked = (start, end) => theMonths[end] - (theMonths[start] - 1)

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

prompt.get(schema, (err, result) => {
        const payslipInfo = createPayslip(result)
        printPaySlip(payslipInfo)
})

const createPayslip = data => {
        const name = `${data.name} ${data.surname}` 
        let [startDay, startMonth] = data['start date'].split(' ')
        const twoDigitStartDay = startDay.length == 1 ? '0' + startDay : startDay;
        const formattedPayPeriod = `${twoDigitStartDay} ${startMonth} - ${data['end date']}`
        const endMonth = data['end date'].split(' ')[1];
        const monthsWorked = numberOfMonthsWorked(startMonth, endMonth);
        const grossIncome = Math.round(data['annual salary'] / 12 * monthsWorked);
        const taxOwed = Math.round(incomeTax(data['annual salary']) / 12 * monthsWorked);
        const netIncome = grossIncome - taxOwed;
        const superPaid = Math.round(superContribution(data['annual salary'], data['super rate']) / 12 * monthsWorked);
        const payslipInfo = [name, formattedPayPeriod, grossIncome, taxOwed, netIncome, superPaid]
        return payslipInfo
}

const printPaySlip = payslipInfo => {
        const [name, payPeriod, grossIncome, taxOwed, netIncome, superPaid] = payslipInfo
        console.log(`
        Name: ${name}
        Pay Period:  ${payPeriod}
        Gross Income: ${grossIncome}
        Income Tax: ${taxOwed}
        Net Income: ${netIncome}
        Super: ${superPaid}
        `);
}