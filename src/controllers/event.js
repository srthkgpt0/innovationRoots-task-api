const response = require('../utility/response')
const EventModel = require('../models/event')
async function addEvent(req, res) {
  try {
    const event = new EventModel(req.body)
    await event.save()
    response.responseHandler(res, event)
  } catch (error) {
    response.errorHandler('addEvent', error, res)
  }
}
async function getEvents(req, res) {
  try {
    const events = await EventModel.find({})
    response.responseHandler(res, events)
  } catch (error) {
    response.errorHandler('getEvents', error, res)
  }
}
async function bookEvent(req, res) {
  try {
    let id = req.params.id
    const event = await EventModel.findById(id)
    const bookedEvent = event.bookEvent(req.body.name)
    response.responseHandler(res, bookedEvent)
  } catch (error) {
    response.errorHandler('bookEvent', error, res)
  }
}
async function getRegisteredUsers(req, res) {
  try {
    const events = await EventModel.find({})
    response.responseHandler(res, events)
  } catch (error) {
    response.errorHandler('getRegisteredUsers', error, res)
  }
}
module.exports = {
  addEvent,
  getEvents,
  bookEvent,
  getRegisteredUsers
}
