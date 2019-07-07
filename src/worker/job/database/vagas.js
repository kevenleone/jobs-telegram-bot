const worker = require('../../worker')

class VagasJob extends worker {
  async getJobs (job, page = 0, paginate = true) {
    try {
      const html = await this.Request(`https://www.vagas.com.br/${job}?ordenar_por=mais_recentes&pagina=${page}`)
      const $ = this.Cheerio.load(html)
      const nextPage = $('a.btMaisVagas').text().trim()
      const totalVanancy = $('div#todasVagas ul').children('li').length
      $('div#todasVagas ul').children('li').each(async (i, el) => {
        const li = $(el)
        const data = {
          title: li.find('h2').children('a').attr('title'),
          link: `${this.Vagas.baseUrl}${li.find('h2').children('a').attr('href')}`,
          searchKey: job,
          company: {
            location: {
              city: li.find('span.vaga-local').text().trim()
            },
            name: li.find('span.emprVaga').text().trim(),
            logo: li.find('figure').children('img').attr('src'),
            benefits: []
          },
          job: {
            career: li.find('span.nivelVaga').text().trim(),
            job: li.find('h2').children('a').attr('title'),
            salary: {}
          },
          date: this.formatDate(li.find('span.icon-relogio-24.data-publicacao').text().trim()),
          database: 'vagas.com'
        }
        await this.getJobDetail(data)
        await this.JobModel.create(data)
      })
      console.log(`Running page: ${page} total vanancy: ${totalVanancy} | nextPage: ${!!nextPage} | searching on ${job}`)
      if (nextPage && paginate) {
        await this.getJobs(job, page + 1, paginate)
      }
    } catch (e) {
      console.log('Error...', e)
    }
  }

  async getJobDetail (data) {
    const html = await this.Request(data.link)
    const $ = this.Cheerio.load(html)
    data.company.about = $('div.apresentacao-empresa').text().trim()
    data.job.salary.original = this.formatText($('div.infoVaga ul.clearfix').children('li').first().text())
    data.job.description = this.formatText($('div.texto').text())
    $('article.vaga').find('ul').last().children('li').each((indx, el) => {
      data.company.benefits.push(this.formatText($(el).text()))
    })
  }
}

module.exports = new VagasJob()
