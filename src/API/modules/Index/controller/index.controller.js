const requestPromise = require('request-promise')
const cheerio = require('cheerio')
const Selectors = require('../../../../Util/Selectors')
const JobModel = require('../../../../models/job.model')

class IndexController {
  JobTemplate (job) {
    const idk = 'Não informado'
    const {
      title,
      description,
      salary = idk,
      city = idk,
      company,
      date = idk,
      link = idk
    } = job
    return `*Título:* ${title} \n*Empresa:* ${company}. \n*Cidade:* ${city} \n*Descrição:* ${description} \n*Salário*: ${salary} \n*Data:* ${date} \n*Link:* ${link}`
  }

  async getJobs (page) {
    const Selector = new Selectors('AGROBASE')
    const jobType = 'emprego-engenharia-ambiental'
    // const page = 1
    const Jobs = []
    const html = await requestPromise(`https://www.agrobase.com.br/oportunidades/vagas/${jobType}/page/${page}`)
    const $ = cheerio.load(html)
    const header = $('div.term-title').text()
    const jobs = $('div.post-template.post-t4.even')

    jobs.each(async (i, element) => {
      const jobElement = $(element)
      const Selectors = Selector.getSelectors($, jobElement)
      Jobs.push(Selectors)
    })

    for (const Job in Jobs) {
      const { link } = Jobs[Job]
      Jobs[Job].detail = await this.getJobDetail(link)
    }
    await JobModel.create(Jobs)
    return Jobs
  }

  async getAll (req, res, next) {
    await JobModel.deleteMany()
    const jobs = []
    for (const Job of [1, 2, 3, 4, 5, 6, 7, 8]) {
      jobs.push(this.getJobs(Job))
    }
    const Jobs = await Promise.all(jobs)
    res.send(Jobs)
  }

  async getJobDetail (link = 'https://www.agrobase.com.br/oportunidades/2019/06/emprego-supervisor-de-unidades-nutricionista-minas-gerais-2/') {
    let articles = {
      'Requisitos/Perfil Desejado': 'requirements',
      'Atribuições e Responsabilidades': 'responsabilities'
    }
    const Sanitize = data => {
      if (data) {
        return data.split(':')[1].trim()
      }
    }

    const html = await requestPromise(link)
    const $ = cheerio.load(html)
    let benefits = Sanitize($('span.ico16.ico16-beneficios').text())
    if (benefits) {
      benefits = benefits.trim().split('\n')
    }
    const data = {
      contract: Sanitize($('span.ico16.ico16-contratos').text()),
      salary: Sanitize($('span.ico16.ico16-salarios').text()),
      benefits,
      journey: Sanitize($('span.ico16.ico16-jornadas').text()),
      local: Sanitize($('span.ico16.ico16-locals').text()),
      apply: $('div.candidate-links').children('a').attr('href') || null,
      job: $('div#article p').first().text()
    }

    const totalOfH2 = $('div#article h2').length
    // const totalH2 = totalOfH2 > 3 ? totalOfH2 - 1 : totalOfH2
    $('div#article h2').each((i, el) => {
      const h2 = $(el).text()
      if (h2 !== 'Dados da Vaga de Emprego') {
        const name = articles[h2]
        data[name] = []
        if (i === totalOfH2 - 2) {
          $('div#article ul').first().children('li').each((index, el) => {
            data[name].push($(el).text())
          })
        } else {
          $('div#article ul').last().children('li').each((index, el) => {
            data[name].push($(el).text())
          })
        }
      }
    })

    return data
  }

  async getOne (req, res, next) {
    let articles = {
      'Requisitos/Perfil Desejado': 'requirements',
      'Atribuições e Responsabilidades': 'responsabilities'
    }
    const Sanitize = data => {
      if (data) {
        return data.split(':')[1].trim()
      }
    }

    const html = await requestPromise(`https://www.agrobase.com.br/oportunidades/2019/06/emprego-supervisor-de-unidades-nutricionista-minas-gerais-2/`)
    const $ = cheerio.load(html)
    let benefits = Sanitize($('span.ico16.ico16-beneficios').text())
    if (benefits) {
      benefits = benefits.trim().split('\n')
    }
    const data = {
      contract: Sanitize($('span.ico16.ico16-contratos').text()),
      salary: Sanitize($('span.ico16.ico16-salarios').text()),
      benefits,
      journey: Sanitize($('span.ico16.ico16-jornadas').text()),
      local: Sanitize($('span.ico16.ico16-locals').text()),
      apply: $('div.candidate-links').children('a').attr('href') || null,
      job: $('div#article p').text()
    }

    const totalOfH2 = $('div#article h2').length
    $('div#article h2').each((i, el) => {
      const h2 = $(el).text()
      if (h2 !== 'Dados da Vaga de Emprego') {
        const name = articles[h2]
        data[name] = []
        if (i === totalOfH2 - 2) {
          $('div#article ul').first().children('li').each((index, el) => {
            data[name].push($(el).text())
          })
        } else {
          $('div#article ul').last().children('li').each((index, el) => {
            data[name].push($(el).text())
          })
        }
      }
    })

    return data

    // res.send({ data })
  }
}

module.exports = new IndexController()
