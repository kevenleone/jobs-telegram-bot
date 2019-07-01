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
      case 'minuto':
      case 'minutos': {
        temp = 'minutes'
        break
      }

      case 'hora':
      case 'horas': {
        temp = 'hours'
        break
      }

      case 'dia':
      case 'dias': {
        temp = 'day'
        break
      }

      case 'semana':
      case 'semanas': {
        temp = 'week'
        break
      }

      case 'meses':
      case 'mês':
      case 'mes': {
        temp = 'month'
      }
    }

    return temp
  }

  formatDate (date = '') {
    if (!date || date === 'Hoje') {
      return moment().format()
    } else {
      const validDate = moment(date, 'dd/mm/yyyy').isValid()
      if (validDate) {
        const newDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')
        return newDate
      } else {
        let subtract = true
        let today = moment()
        let temporal, dateNum
        let dateSplit = date.split(' ')
        if (date.indexOf('Há') > -1) {
          dateNum = dateSplit[1]
          temporal = dateSplit[2]
        } else if (date.indexOf('atrás') > -1) {
          dateNum = dateSplit[0]
          temporal = dateSplit[1]
        } else {
          subtract = false
        }

        if (subtract) {
          today = today.subtract(dateNum, this.getTemporalName(temporal)).format()
        }
        return today
      }
    }
  }

  formatText (text) {
    const firstlv = text.trim().replace(/^\s+|\s+$/gm, '')
    const secondlv = firstlv.replace(/(\r\n|\n|\r)/gm, '')
    const thirdlv = secondlv.replace(/<[^>]*>/g, ' ')
    const fourtylv = thirdlv.replace(/&nbsp;/gi, '')
    return fourtylv.trim()
  }

  formatArrToString (arr, key = 'title', delimiter = '/') {
    let txt = ''
    arr.forEach((arr) => (txt += `${arr[key]}${delimiter}`))
    return txt.substring(0, txt.length - 1)
  }
}

module.exports = Worker
