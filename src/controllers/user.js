const UserModel = require('../models/user')
const logger = require('../utility/logger')
const bcrypt = require('bcryptjs')
const response = require('../utility/response')

async function addUser(req, res) {
  try {
    const user = new UserModel(req.body)
    await user.save()
    const token = await user.generateToken()
    response.responseHandler(res, { token })
  } catch (error) {
    response.errorHandler('addUser', error, res)
  }
}

async function getToken(req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      throw 'User not exists'
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) {
      throw 'Email/Password Mismatch'
    }
    const token = await user.generateToken()
    response.responseHandler(res, { user, token })
  } catch (error) {
    response.errorHandler('getToken', error, res)
  }
}

async function updateProfile(req, res) {
  try {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    )
    if (!isValidOperation) {
      throw 'Invalid Updates!'
    }
    updates.forEach((update) => (req.user[update] = req.body[update]))
    await req.user.save()
    response.responseHandler(res, req.user)
  } catch (error) {
    response.errorHandler('updateProfile', error, res)
  }
}

async function deleteUser(req, res) {
  try {
    const user = await UserModel.findByIdAndDelete(req.user._id)
    if (!user) {
      return res.status(404).send()
    }
    await req.user.remove()
    response.responseHandler(res, req.user)
  } catch (error) {
    response.errorHandler('deleteUser', error, res)
  }
}

module.exports = {
  addUser,
  getToken,
  updateProfile,

  deleteUser
}
