const server = require('./config/loader');
const PORT = process.env.PORT || 3000;
const cheerio = require('cheerio');
const request = require('request');


server.get('/scrapping', (req, res) => {
    request('https://www.agrobase.com.br/oportunidades/vagas/emprego-engenharia-ambiental/?tag=pernambuco', (error, response, html) => {
        if(!error && response.statusCode == 200){
            const $ = cheerio.load(html);
            const header = $('div.term-title');
            const jobs = $('div.post-template.post-t4.even');
           jobs.each((i, element) => {
               const jobElement = $(element);
               const title = jobElement.find('h3.post-title').text();
               const local = jobElement.find('span.ico16.ico16-local').text();
               const salary = jobElement.find('span.ico16.ico16-salary').text();
               const company = jobElement.find('span.ico16.ico16-empresa').text();
               const description = jobElement.find('p').text();
               console.log(description)

           })

           res.send('Loaded')
        }
    })
})

server.get('/', (req, res) => res.send('Running !!!'));

server.listen(PORT, () => console.log(`Running on ${PORT}`));