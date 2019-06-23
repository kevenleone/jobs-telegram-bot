const Controller = require('./Controller')
const Contants = require('../Util/Contants')

class Agrobase extends Controller {
  async getJobs (config = {}) {
    const { jobType = Contants.AMBIENTAL_ENGINEER_AGROBASE, page = 1 } = config
    var arr = []

    const html = await this.RequestPromise(`https://www.agrobase.com.br/oportunidades/vagas/${jobType}/page/${page}/?tag=pernambuco`)
    const $ = this.Cheerio.load(html)
    const header = $('div.term-title')
    const jobs = $('div.post-template.post-t4')
    jobs.each((i, element) => {
      const jobElement = $(element)
      const title = jobElement.find('h3.post-title').text()
      const link = jobElement.find('h3.post-title').children('a').attr('href')
      const city = jobElement.find('.ico16-local').text()
      const salary = jobElement.find('.ico16-salario').text()
      const company = jobElement.find('.ico16-empresa').text()
      const description = jobElement.find('p').text()
      const date = `${jobElement.find('div.post-date').children('h2').text()} ${jobElement.find('div.post-date').children('span').text()}`
      arr.push(this.JobTemplate({ title, city, salary, company, description, link, date }))
    })
    return arr
  }
}

module.exports = new Agrobase()
