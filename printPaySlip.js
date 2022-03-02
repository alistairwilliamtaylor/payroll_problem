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

module.exports = printPaySlip