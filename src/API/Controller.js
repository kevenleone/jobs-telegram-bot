const Cheerio = require('cheerio');
const Request = require('request');
const RequestPromise = require('request-promise');

class Controller {
  constructor () {
    this.Cheerio = Cheerio;
    this.Request = Request;
    this.RequestPromise = RequestPromise;
  }

  brief (txtf, limit) {
    let txt = txtf.replace(/<[^>]*>/g, '');
    let size = txt.lenght >= 2000 ? txt.length / 2 : limit;
    return txt.substring(0, size) + '...';
  }

  JobTemplate (job) {
    const idk = 'Não informado';
    const { title, description, salary = idk, city = idk, company, date = idk, link = idk } = job;
    return `*Título:* ${title} \n*Empresa:* ${company}. \n*Cidade:* ${city} \n*Descrição:* ${this.brief(description, 300)} \n*Salário*: ${salary} \n*Data:* ${date} \n*Link:* ${link}`;
  }
}

module.exports = Controller;
