class Selectors {
  constructor (database) {
    this.database = database
  }

  getSelectors (first, second) {
    let selector = {}
    switch (this.database) {
      case 'AGROBASE' : {
        selector.title = second.find('h3.post-title').text()
        selector.link = second.find('h3.post-title').children('a').attr('href')
        selector.city = second.find('.ico16-local').text()
        selector.salary = second.find('.ico16-salario').text()
        selector.company = second.find('.ico16-empresa').text()
        selector.description = second.find('p').text()
        selector.date = `${second.find('div.post-date').children('h2').text()} ${second.find('div.post-date').children('span').text()}`
      }
    }

    return selector
  }
}

module.exports = Selectors
