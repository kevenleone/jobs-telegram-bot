const cron = require('node-cron')
const Vagas = require('./database/vagas')
const Contants = require('../../Util/Contants')
class Job {
  async run () {
    console.log('Worker Initializated')
    const vagas = Contants.VAGAS
    cron.schedule('0 */22 * * * *', async () => {
      console.log('Starting', new Date())
      for (const jobtype in vagas) {
        for (const jobname in vagas[jobtype]) {
          const job = vagas[jobtype][jobname]
          await Vagas.getJobs(job, 0, false)
        }
      }
    }).start()
  }
}

module.exports = new Job()
