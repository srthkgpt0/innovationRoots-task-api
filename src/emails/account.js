const sgMail = require('@sendgrid/mail')

const sendGridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendGridAPIKey)

// sgMail.send(
//   {
//     to: 'srthkgpt0@gmail.com',
//     from: 'srthkgpt0@gmail.com',
//     subject: 'This is my first email!',
//     text: 'I hope this one gets to you'
//   },
//   false,
//   (error, result) => {
//     if (error) {
//       return console.log('Error', error)
//     }
//     console.log('Response', result)
//   }
// )
const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'srthkgpt0@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}, Let me know how you get along with the app.`
  })
}
module.exports = {
  sendWelcomeEmail
}
