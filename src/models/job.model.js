const mongoose = require('../../config/database')
const Schema = mongoose.Schema

const JobSchema = new Schema({
  title: String,
  link: String,
  city: String,
  company: {
    name: String,
    logo: String,
    about: String,
    benefits: [String]
  },
  job: {
    career: String,
    job: String,
    salary: String,
    description: String,
    contract: String,
    apply: String,
    requirements: [String],
    responsabilities: [String]
  },
  date: Date,
  database: String
})

module.exports = mongoose.model('Job', JobSchema)
