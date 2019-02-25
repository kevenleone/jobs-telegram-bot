const cheerio = require('cheerio');
const request = require('request');

request('https://www.agrobase.com.br/oportunidades/vagas/emprego-engenharia-ambiental/', (error, response, html) => {
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);
        const header = $('div.term-title');
        const jobs = $('div.post-template.post-t4.even');

        console.log(jobs.html());
        
    }
})