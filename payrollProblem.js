const commandLinePrompt = require('./inputPrompt')
const csvConverter = require('./csvConverter')

if (process.argv[2] && process.argv[3]) {
    csvConverter(process.argv[2], process.argv[3])
} else {
    commandLinePrompt()
}