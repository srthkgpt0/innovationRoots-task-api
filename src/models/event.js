const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
      required: true
    },
    eventName: {
      type: String,
      trim: true,
      required: true
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    },
    user: [
      {
        name: {
          type: String,
          trim: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
)
eventSchema.methods.bookEvent = async function (body) {
  const event = this
  event.user = event.user.concat({ name: body })
  await event.save()
  return event
}
const Event = mongoose.model('Events', eventSchema)

module.exports = Event
