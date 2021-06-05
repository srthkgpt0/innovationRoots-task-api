//CRUD

const { MongoClient, ObjectId } = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log('unable to connect')
    }
    const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //   name: 'Sarthak',
    //   Age: 24
    // })
    //     db.collection('tasks').insertMany(
    //       [
    //         {
    //           description: 'Message Naval Sir',
    //           completed: true
    //         },
    //         {
    //           description: 'Take bath',
    //           completed: false
    //         },
    //         {
    //           description: 'hmm',
    //           completed: true
    //         }
    //       ],
    //       (error, result) => {
    //         if (error) {
    //           return console.log('Error it is')
    //         }
    //         console.log(result.ops)
    //       }
    //     )
    // db.collection('tasks').findOne(
    //   { _id: ObjectId('60ab7fa1f1dd7409f0cb54c3') },
    //   (error, user) => {
    //     if (error) {
    //       console.log('Error')
    //     }
    //     console.log(user)
    //   }
    // )
    // db.collection('tasks')
    //   .find({ completed: false })
    //   .toArray((error, tasks) => {
    //     console.log(tasks)
    //   })

    // db.collection('tasks')
    //   .updateMany(
    //     { completed: false },
    //     {
    //       $set: {
    //         completed: true
    //       }
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    db.collection('tasks')
      .deleteOne({ description: 'Message Naval Sir' })
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }
)
