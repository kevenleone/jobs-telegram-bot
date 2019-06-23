const mongoose = require('mongoose')
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017/jobs', { useNewUrlParser: true }).then(conn => {
  console.log('Connected')
}).catch(err => {
  console.log(err)
})

module.exports = mongoose
