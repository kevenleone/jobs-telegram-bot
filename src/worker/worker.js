const request = require('request-promise')
const cheerio = require('cheerio')

class Worker {
  constructor () {
    this.Request = request
    this.Cheerio = cheerio
    this.Vagas = {
      baseUrl: 'https://www.vagas.com.br'
    }
  }

  formatDate (date) {

  }

  formatText (text) {
    const firstlv = text.trim().replace(/^\s+|\s+$/gm, '')
    const secondlv = firstlv.replace(/(\r\n|\n|\r)/gm, '')
    const thirdlv = secondlv.replace(/[^a-zA-Z ]/g, '')
    return thirdlv
  }
}

module.exports = Worker
