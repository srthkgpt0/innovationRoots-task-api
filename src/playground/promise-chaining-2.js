require('../db/mongoose')
const Task = require('../models/task')

// Task.findByIdAndDelete('60aca27251eb6233dc746e9e')
//   .then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
//   })
//   .then((value) => {
//     console.log(value)
//   })
//   .catch((e) => {
//     console.log(e)
//   })

const deleteTaskAndCount = async (Id) => {
  const user = await Task.findByIdAndDelete(Id)
  const count = await Task.countDocuments({ completed: false })
  return count
}
deleteTaskAndCount('60ac95336a7f702f445e6b8a')
  .then((count) => {
    console.log(count)
  })
  .catch((e) => {
    console.log(e)
  })
