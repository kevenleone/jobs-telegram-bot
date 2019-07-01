const mongoose = require('../../config/database')
const Schema = mongoose.Schema

const UserModel = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String
}, { timestamps: true })

module.exports = mongoose.model('User', UserModel)
