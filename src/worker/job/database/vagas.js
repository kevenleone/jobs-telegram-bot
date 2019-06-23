const worker = require('../../worker')

class VagasJob extends worker {
  async getJobs (page) {
    const jobType = 'emprego-engenharia-ambiental'
    const html = await this.Request(`https://www.vagas.com.br/vagas-de-Engenheiro-Ambiental`)
    const $ = this.Cheerio.load(html)
    $('div#todasVagas ul').children('li').each(async (i, el) => {
      const li = $(el)
      const data = {
        title: li.find('h2').children('a').attr('title'),
        link: `${this.Vagas.baseUrl}${li.find('h2').children('a').attr('href')}`,
        company: {
          name: li.find('span.emprVaga').text().trim(),
          logo: li.find('figure').children('img').attr('src'),
          benefits: []
        },
        job: {
          career: li.find('span.nivelVaga').text().trim(),
          job: li.find('h2').children('a').attr('title')
        },
        city: li.find('span.vaga-local').text().trim(),
        date: li.find('span.icon-relogio-24.data-publicacao').text().trim(),
        database: 'vagas.com'
      }

      await this.getJobDetail(data)

      console.log(data)
    })
  }

  async getJobDetail (data) {
    const html = await this.Request(data.link)
    const $ = this.Cheerio.load(html)
    data.company.about = $('div.apresentacao-empresa').text().trim()
    data.job.salary = this.formatText($('div.infoVaga ul.clearfix').children('li').first().text())
    data.job.description = this.formatText($('div.texto').text())
    $('article.vaga').find('ul').last().children('li').each((indx, el) => {
      data.company.benefits.push($(el).text().trim())
    })
  }
}

const Job = new VagasJob()
// Job.getJobDetail()
Job.getJobs()
