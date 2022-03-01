const prompt = require('prompt')

const grossIncome = salary => salary / 12;
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

prompt.message = 'Please enter your ';
prompt.delimiter = '';
prompt.colors = false;

prompt.get(['name','surname','annual salary', 'super rate'], (err, result) => {
    if (err) {
        return "whoops I don't understand"
    } else {
        const taxOwed = incomeTax(result['annual salary'])
        const netIncome = result['annual salary'] - taxOwed;
        console.log(`
        Name: ${result.name} ${result.surname}
        Gross Income: ${result['annual salary']}
        Income Tax: ${taxOwed}
        Net Income: ${netIncome}
        Super: ${superContribution(result['annual salary'], result['super rate'])}
        `);
    }
})   