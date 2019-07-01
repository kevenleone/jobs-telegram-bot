const cron = require('node-cron')
const Contants = require('../../Util/Contants')
const Vagas = require('./database/vagas')
const Vulpi = require('./database/vulpi')
const Agrobase = require('./database/agrobase')

class Job {
  async run () {
    const AGROBASE_DOTCOM = Contants.AGROBASE_DOTCOM
    const VAGAS_DOTCOM = Contants.VAGAS_DOTCOM

    console.log('Worker Initializated')

    const VagasDotCom = async () => {
      for (const jobtype in VAGAS_DOTCOM) {
        for (const jobname in VAGAS_DOTCOM[jobtype]) {
          const job = VAGAS_DOTCOM[jobtype][jobname]
          await Vagas.getJobs(job, 0, true)
        }
      }
    }

    const AgrobaseDotCom = async () => {
      for (const jobtype in AGROBASE_DOTCOM) {
        const job = AGROBASE_DOTCOM[jobtype]
        await Agrobase.getJobs(job, 0, true)
      }
    }

    const VulpiDotCom = async () => {
      await Vulpi.getJobs()
    }

    cron.schedule('0 */5 * * * *', async () => {
      console.log('Starting', new Date())
      const promises = [VagasDotCom(), VulpiDotCom(), AgrobaseDotCom()]
      Promise.all(promises)
    }).start()
  }
}

module.exports = new Job()
