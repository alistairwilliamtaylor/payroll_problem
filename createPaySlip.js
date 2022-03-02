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
    const payslipInfo = {
        name, 
        'pay period': formattedPayPeriod, 
        'gross income': grossIncome, 
        'income tax': taxOwed, 
        'net income': netIncome, 
        'super': superPaid,
    }
    return payslipInfo
}

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

module.exports = createPayslip