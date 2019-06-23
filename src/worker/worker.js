const request = require('request-promise')
const cheerio = require('cheerio')
const JobModel = require('../models/job.model')
const Contants = require('../Util/Contants')
const moment = require('moment')

class Worker {
  constructor () {
    this.JobModel = JobModel
    this.Request = request
    this.Cheerio = cheerio
    this.Contants = Contants
    this.Vagas = {
      baseUrl: 'https://www.vagas.com.br'
    }
  }

  getTemporalName (temporal) {
    let temp

    switch (temporal) {
      case 'dias':
      case 'dia': {
        temp = 'day'
        break
      }

      case 'semana':
      case 'semanas': {
        temp = 'week'
        break
      }
    }

    return temp
  }

  formatDate (date) {
    const validDate = moment(date, 'dd//mm/yyyy').isValid()
    if (validDate) {
      const newDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')
      return newDate
    } else {
      const [txt, dateNum, temporal] = date.split(' ')
      let today = moment()
      if (txt === 'Há') {
        today = today.subtract(dateNum, this.getTemporalName(temporal)).format('YYYY-MM-DD')
      }
      return today
    }
  }

  formatText (text) {
    const firstlv = text.trim().replace(/^\s+|\s+$/gm, '')
    const secondlv = firstlv.replace(/(\r\n|\n|\r)/gm, '')
    const thirdlv = secondlv.replace(/[^a-zA-Z ]/g, '')
    return thirdlv
  }
}

module.exports = Worker
