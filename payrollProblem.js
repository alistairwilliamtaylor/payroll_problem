const prompt = require('prompt')

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

prompt.get(['name','surname','annual salary', 'super rate', 'start date', 'end date'], (err, result) => {
    if (err) {
        return "whoops I don't understand"
    } else {
        const monthsWorked = numberOfMonthsWorked(result['start date'], result['end date']);
        const grossIncome = Math.round(result['annual salary'] / 12 * monthsWorked);
        const taxOwed = Math.round(incomeTax(result['annual salary']) / 12 * monthsWorked);
        const netIncome = grossIncome - taxOwed;
        const superPaid = Math.round(superContribution(result['annual salary'], result['super rate']) / 12 * monthsWorked);
        console.log(`
        Name: ${result.name} ${result.surname}
        Months Worked: ${monthsWorked}
        Gross Income: ${grossIncome}
        Income Tax: ${taxOwed}
        Net Income: ${netIncome}
        Super: ${superPaid}
        `);
    }
})   