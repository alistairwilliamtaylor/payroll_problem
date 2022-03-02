const printPaySlip = payslipInfo => {
    console.log(`
    Name: ${payslipInfo.name}
    Pay Period:  ${payslipInfo['pay period']}
    Gross Income: ${payslipInfo['gross income']}
    Income Tax: ${payslipInfo['income tax']}
    Net Income: ${payslipInfo['net income']}
    Super: ${payslipInfo.super}
    `);
}

module.exports = printPaySlip