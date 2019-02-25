const Telegraf = require('telegraf');
const axios = require('axios');
const Core = require('./Core');
const Contants = require('../Util/Contants');
const ENV = process.env;
class Telegram extends Core {

    constructor(){
        super();
        this.extra = {
            parse_mode: "Markdown"
        }
    }

    reply(ctx, message){
        let msg = message.replace(/<[^>]*>/g, "")
        ctx.reply(msg, this.extra);
    }

    brief(txtf, limit){
        let txt = txtf.replace(/<[^>]*>/g, "");
        let size = txt.lenght >= 2000 ? txt.length/2 : limit;
        return txt.substring(0, size)+'...';
    }

    async getJob(config){
        let jobs = await this.Agrobase.getJobs({jobType: Contants.AMBIENTAL_ENGINEER_AGROBASE, page: 0});
        return jobs;
    }

    sendJobs(jobs, ctx){
        if(!jobs.length) this.reply(ctx, "Nenhum dado encontrado!");

        jobs.forEach(job => {
            this.reply(ctx, job);
         });
    }

    run(){
        console.log('Running!', ENV.TELEGRAM_TOKEN)
        const bot = new Telegraf(ENV.TELEGRAM_TOKEN)
        bot.start((ctx) => {
            const {first_name, last_name} = ctx.message.from;
            this.reply(ctx, `Olá *${first_name} ${last_name}* Bem vindo ao MercaWin Jobs ! Comandos Disponíveis: \n*/jobs* \n*/agrobase*`)
        })
      
        bot.command('/jobs', async (ctx) => {
            const {first_name} = ctx.message.from;
            const {text} = ctx.message;
            if(text.split(' ').length <= 1){
                this.reply(ctx, `*${first_name}*, before we start tell me in this format: \n/*jobs job_description - job_location*`);
            } else {
                const msgArgs = text.split('/jobs').toString().replace(',', '').split('-');
                const desc = msgArgs[0];
                const city = msgArgs[1];
                const jobs = await axios.get(`https://jobs.github.com/positions.json?description=${desc}&location=${city}`);
                if(jobs.data.length) await ctx.reply(`Hey!, Great News ! I found ${jobs.data.length}`);
                
                jobs.data.forEach(async (job) => {
                    await this.reply(ctx, `*Company:* ${job.company}. \n*Title:* ${job.title} \n*Location*: ${job.location} \n*Description*: ${this.brief(job.description, 300)} \n*Apply:* ${job.how_to_apply}`);
                });
                ctx.reply('Want More? Type /More')
            }
        });

        bot.command('/agrobase', async (ctx) => {
            let page = 1;
            const {text} = ctx.message;
            const {first_name} = ctx.message.from;
            const availableJobs = [
            {
                name: "1) Engenheiro Ambiental",
                type: Contants.AMBIENTAL_ENGINEER_AGROBASE
            },{
                name: "2) Engenheiro Florestal",
                type: Contants.FLORESTAL_ENGINEER_AGROBASE
            }, {
                name: "3) Nutricionista",
                type: Contants.NUTRICIONIST_AGROBASE
            }];
            if(text.split(' ').length <= 1){
                this.reply(ctx,`${first_name} estes são os cargos disponíveis para consulta: \n1) Engenheiro Ambiental \n2) Engenharia Florestal \n3) Nutricionista`);
                this.reply(ctx, `Antes de começarmos diga o que busca neste formato: */agrobase 1, 2 ou 3*`);
            } else {
                const data = text.split(' ');
                const opt = data[1]-1;

                this.reply(ctx, `Você escolheu *${availableJobs[opt].name}*`);
                this.reply(ctx, `Página de Consulta ${page}`);
                let jobs = await this.Agrobase.getJobs({jobType: availableJobs[opt].type, page});
                this.sendJobs(jobs, ctx);
    
                bot.command('/mais', async ctx => {
                    page++;
                    this.reply(ctx, `Página de Consulta ${page}`);
                    let jobs = await this.Agrobase.getJobs({jobType: availableJobs[opt].type, page});
                    this.sendJobs(jobs, ctx);
                });
    
                this.reply(ctx, "Digite */mais* para receber mais empregos");
            }
            
        });

        bot.launch();
    }

}

module.exports = new Telegram();

