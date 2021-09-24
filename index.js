const util = require(`./util.js`)
const getMockTagRes = util.getMockTag({key: `userName`, value: `2017-11-12`})
console.log(`getMockTagRes`, getMockTagRes[0])
