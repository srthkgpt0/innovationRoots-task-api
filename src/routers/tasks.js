const express = require('express')
const router = express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
  // const task = new Task(req.body)
  const task = new Task({ ...req.body, owner: req.user._id })
  try {
    const taskFetched = await task.save()
    res.status(201).send(taskFetched)
  } catch (error) {
    res.status(400).send(e)
  }
})
router.get('/tasks', auth, async (req, res) => {
  const match = {}
  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }
  try {
    // const task = await Task.find({ owner: req.user._id })
    // if (!task) {
    //   return res.status(404).send()
    // }
    console.log(match)
    await req.user
      .populate({
        path: 'tasks',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip)
        }
      })
      .execPopulate()
    res.send(req.user.tasks)
  } catch (error) {
    res.status(500).send()
  }
})
router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    // const task = await Task.findById(_id)
    const task = await Task.findOne({ _id, owner: req.user._id })

    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (error) {
    res.status(500).send(error)
  }
})
router.patch('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )
  if (!isValidOperation) {
    return res.status(400).send({
      error: 'Invalid Updates!'
    })
  }
  try {
    // const task = await Task.findById(_id)
    const task = await Task.findOne({ _id, owner: req.user._id })

    if (!task) {
      return res.status(404).send()
    }
    updates.forEach((update) => (task[update] = req.body[update]))
    await task.save()
    // const task = await Task.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true
    // })

    res.send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})
router.delete('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    // const task = await Task.findByIdAndDelete(_id)
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id })
    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (error) {
    res.status(400).send()
  }
})
module.exports = router
