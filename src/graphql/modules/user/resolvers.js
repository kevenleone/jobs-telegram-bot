const UserModel = require('../../../models/user.model')
const Controller = require('../../resolver.controller')

class UserResolver extends Controller {
  Resolver () {
    return {
      Query: {
        Authenticate: async (obj, { email, password }) => {
          const hasEmail = await UserModel.find({ email }).lean()
          if (!hasEmail) {
            const user = await UserModel.find({ email, password }).lean()
            if (!user) {
              throw new Error(this.messages.USER_INVALID_CREDENTIALS)
            }
            return user
          } else {
            throw new Error(this.messages.USER_NOT_EXISTS)
          }
        }
      },
      Mutation: {
        CreateUser: async (obj, user) => {
          const { email } = user
          const userExists = await UserModel.findOne({ email }).lean()
          if (userExists) {
            throw new Error(this.messages.USER_EMAIL_EXISTS)
          } else {
            const newUser = await UserModel.create(user)
            return newUser
          }
        }
      }
    }
  }
}

module.exports = new UserResolver()
