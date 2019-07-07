const mongoose = require('../../config/database')
const Schema = mongoose.Schema

const JobSchema = new Schema({
  title: String,
  link: String,
  company: {
    name: String,
    logo: String,
    about: String,
    benefits: [String],
    phone: String,
    company_type: String,
    website: String,
    business_area: String,
    location: {
      number: Number,
      country: { type: String, default: 'Brasil' },
      address: String,
      city: String,
      neighborhood: String,
      state: String,
      zip_code: String,
      geolocation: {
        lng: Number,
        lat: Number
      }
    }
  },
  job: {
    career: String,
    job: String,
    journey: String,
    salary: {
      original: String,
      salary_start: Number,
      salary_final: Number
    },
    description: String,
    contract: String,
    apply: String,
    experience: [String],
    requirements: [String],
    responsabilities: [String],
    skills: [String],
    locations: [String],
    frameworks: [String],
    remote: Boolean,
    formation: [String]
  },
  until: Date,
  date: Date,
  searchKey: String,
  database: String
})

module.exports = mongoose.model('Job', JobSchema)
