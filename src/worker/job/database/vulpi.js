const worker = require('../../worker')

class Vulpi extends worker {
  async getJobs (job = 'https://api.vulpi.com.br/v1/board', page = 1, paginate = true) {
    const baseUrl = 'https://app.vulpi.com.br'
    try {
      const vulpix = await this.Request(`${job}?page=${page}`, { json: true })
      const vulpiJobs = vulpix.results.map(vulpi => {
        const { id, title, salary_range_start, salary_range_finish, experience, locations = [], skills = [], frameworks = [], formation = [], company: { trading_name, company_name, website, logo, business_area, company_type, description, phone, remote = false } } = vulpi
        return {
          title: vulpi.title,
          database: 'vulpi',
          link: `${baseUrl}/${trading_name.toLowerCase()}/${id}`,
          company: {
            name: company_name || trading_name,
            logo,
            about: description,
            business_area,
            company_type,
            phone,
            website
          },
          job: {
            job: title,
            career: this.formatArrToString(experience),
            description: this.formatText(vulpi.description),
            apply: `${baseUrl}/${trading_name.toLowerCase()}/${id}`,
            salary: {
              original: `${salary_range_start || ''} ${salary_range_finish || ''}`,
              salary_start: salary_range_start || 0,
              salary_final: salary_range_finish || 0
            },
            remote,
            locations: locations.map(value => value.title),
            skills: skills.map(value => value.title),
            frameworks: frameworks.map(value => value.title),
            formation: formation.map(value => value.title)
          }
        }
      })
      await this.JobModel.create(vulpiJobs)
      console.log(`Running page: ${page} total vanancy: ${vulpiJobs.length} | nextPage: ${!!vulpix.next} | searching on ${job}`)
      if (vulpix.next && paginate) {
        this.getJobs(job, page + 1, paginate)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new Vulpi()
