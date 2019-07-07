const cheerio = require('cheerio')
const worker = require('../../worker')

class JobAgrobase extends worker {
  async getJobs (jobType = 'emprego-engenharia-ambiental', page = 1, paginate = true) {
    const Jobs = []
    const html = await this.Request(`https://www.agrobase.com.br/oportunidades/vagas/${jobType}/page/${page}`)
    const $ = cheerio.load(html)
    const jobs = $('div.post-template.post-t4.even')
    const nextPage = $('a.nextpostslink').attr('href')
    jobs.each(async (i, element) => {
      const jobElement = $(element)
      // const date = `${jobElement.find('div.post-date').children('h2').text()} ${jobElement.find('div.post-date').children('span').text()}`
      const data = {
        // date: `${jobElement.find('div.post-date').children('h2').text()} ${jobElement.find('div.post-date').children('span').text()}`,
        searchKey: jobType,
        title: jobElement.find('h3.post-title').text(),
        link: jobElement.find('h3.post-title').children('a').attr('href'),
        database: 'agrobase',
        company: {
          location: {
            city: jobElement.find('.ico16-local').text()
          },
          name: jobElement.find('.ico16-empresa').text(),
          about: jobElement.find('p').text()
        },
        job: {
          salary: {
            original: jobElement.find('.ico16-salario').text()
          }
        }
      }
      Jobs.push(data)
    })

    for (const Job in Jobs) {
      await this.getDetail(Jobs[Job])
    }

    await this.JobModel.create(Jobs)
    console.log(`Running page: ${page} total vanancy: ${Jobs.length} | nextPage: ${!!nextPage} | searching on ${jobType}`)

    if (nextPage && paginate) {
      this.getJobs(jobType, page + 1)
    }
  }

  async getAll () {
    const jobs = []
    for (const Job of [1, 2, 3, 4, 5, 6, 7, 8]) {
      jobs.push(this.getJobs(Job))
    }
    const Jobs = await Promise.all(jobs)
    return Jobs
  }

  async getDetail (Job) {
    const { link } = Job

    let articles = {
      'Requisitos/Perfil Desejado': 'requirements',
      'Atribuições e Responsabilidades': 'responsabilities'
    }
    const Sanitize = data => {
      if (data) {
        return this.formatText(data.split(':')[1])
      }
    }

    const html = await this.Request(link)
    const $ = cheerio.load(html)
    let benefits = Sanitize($('span.ico16.ico16-beneficios').text())
    if (benefits) {
      benefits = benefits.trim().split('\n')
    }

    let time = $('div.meta').children('span.ico16.ico16-calendar').text()
    Job.date = this.formatDate(time.substring(0, time.length / 2).trim())
    Job.job.contract = Sanitize($('span.ico16.ico16-contratos').text())
    Job.job.salary.original = Sanitize($('span.ico16.ico16-salarios').text())
    Job.job.job = $('div#article p').text()
    Job.job.apply = $('div.candidate-links').children('a').attr('href') || null
    Job.company.benefits = benefits
    Job.job.locations = [Sanitize($('span.ico16.ico16-locals').text())]
    Job.job.journey = Sanitize($('span.ico16.ico16-jornadas').text())

    const totalOfH2 = $('div#article h2').length
    $('div#article h2').each((i, el) => {
      const h2 = $(el).text()
      if (h2 !== 'Dados da Vaga de Emprego') {
        const name = articles[h2]
        Job.job[name] = []
        if (i === totalOfH2 - 2) {
          $('div#article ul').first().children('li').each((index, el) => {
            Job.job[name].push($(el).text())
          })
        } else {
          $('div#article ul').last().children('li').each((index, el) => {
            Job.job[name].push($(el).text())
          })
        }
      }
    })
  }
}

module.exports = new JobAgrobase()
