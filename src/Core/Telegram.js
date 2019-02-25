const Telegraf = require('telegraf');
const axios = require('axios');

const ENV = process.env;
class Telegram {

    constructor(){
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

    getData(){

    }

    run(){
        console.log('Running!', ENV.TELEGRAM_TOKEN)
        const bot = new Telegraf(ENV.TELEGRAM_TOKEN)
        bot.start((ctx) => {
            const {first_name, last_name} = ctx.message.from;
            this.reply(ctx, `Hello *${first_name} ${last_name}* Welcome to MercaWin Jobs ! Available Commands: /jobs`)
        })
        // bot.help((ctx) => ctx.reply('Send me a sticker'))
        // bot.on('sticker', (ctx) => ctx.reply('👍'))
        // bot.hears('hi', (ctx) => ctx.reply('Hey there'))

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

        bot.launch()
    }

}

module.exports = new Telegram();

