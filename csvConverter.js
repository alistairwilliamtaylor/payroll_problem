const fs = require('fs')
const { parse } = require('csv-parse');
const ObjectsToCsv = require('objects-to-csv')
const createPayslip = require('./createPaySlip');

const csvConverter = (inputFilename, outputFilename) => {
    const csvInput = fs.readFileSync(inputFilename).toString()
    parse(csvInput, {}, (err, records) => {
            const individualPayslipInfos = records.slice(1).map(record => createPayslip(interpretCSVInput(record)));
            saveToCSV(individualPayslipInfos, outputFilename)
    });
}

const saveToCSV = async (payslips, outputFilename) => {
    const csv = new ObjectsToCsv(payslips);
    await csv.toDisk(`./${outputFilename}`)
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

module.exports = csvConverter;