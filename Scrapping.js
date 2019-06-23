const cheerio = require('cheerio');
const RequestPromise = require('request-promise');

function JobTemplate(job){
    const idk = 'Não informado'
    const { title, description, salary = idk, city = idk, company, date = idk, link = idk} = job;
    return `*Título:* ${title} \n*Empresa:* ${company}. \n*Cidade:* ${city} \n*Descrição:* ${description} \n*Salário*: ${salary} \n*Data:* ${date} \n*Link:* ${link}`;
}

async function getJobs(config = {}) {
    const {jobType, page = 1} = config;
    const arr = []
    const html = await RequestPromise(`https://www.agrobase.com.br/oportunidades/vagas/${jobType}/page/${page}/?tag=pernambuco`);
    const $ = cheerio.load(html);
    const header = $('div.term-title');
    const jobs = $('div.post-template.post-t4.even');
    jobs.each((i, element) => {
        const jobElement = $(element);
        const title = jobElement.find('h3.post-title').text();
        const link = jobElement.find('h3.post-title').children('a').attr('href')
        const city = jobElement.find('.ico16-local').text();
        const salary = jobElement.find('.ico16-salario').text();
        const company = jobElement.find('.ico16-empresa').text();
        const description = jobElement.find('p').text();
        const date = `${jobElement.find('div.post-date').children('h2').text()} ${jobElement.find('div.post-date').children('span').text()}`
        arr.push(JobTemplate({title, city, salary, company, description, link, date}));
    });
    return arr;
}

console.log(getJobs({jobType: 'emprego-engenharia-ambiental'}))

// request('https://www.agrobase.com.br/oportunidades/vagas/emprego-engenharia-ambiental/', (error, response, html) => {
//     if(!error && response.statusCode == 200){
//         const $ = cheerio.load(html);
//         const header = $('div.term-title');
//         const jobs = $('div.post-template.post-t4.even');

//         console.log(jobs.html());
        
//     }
// })