const Cheerio = require('cheerio');
const Request = require('request');
const RequestPromise = require('request-promise');
const Axios = require('axios');

class Controller {
    constructor(){
        this.Cheerio = Cheerio;
        this.Request = Request;
        this.RequestPromise = RequestPromise;
        this.Axios = Axios;
    }

    brief(txtf, limit){
        let txt = txtf.replace(/<[^>]*>/g, "");
        let size = txt.lenght >= 2000 ? txt.length/2 : limit;
        return txt.substring(0, size)+'...';
    }

    JobTemplate(job){
        const { title, description, salary = "Não informado", city = "Não informado", company, date, link = 'Não informado'} = job;
        return `*Título:* ${title} \n*Empresa:* ${company}. \n*Cidade:* ${city} \n*Descrição:* ${this.brief(description, 300)} \n*Salário*: ${salary} \n*Link:* ${link}`;
    }
}

module.exports = Controller;