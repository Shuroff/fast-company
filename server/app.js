const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const request = require('request')

mongoose
process.env.HTTP_PROXY = 'http://127.0.0.1:20307'
process.env.HTTPS_PROXY = 'http://127.0.0.1:20307'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const PORT = config.get('port') ?? 8080

request(
  'http://n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017',
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    }
    if (error) {
      console.log(error)
    }
  }
)
async function start() {
  try {
    await mongoose.connect(
      'mongodb://utep6kfoz0cqibibsypc:ZdRwsDiVtMsaNwHco25H@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/btzrqsftdn4bttx?replicaSet=rs0'
    )
    console.log('MongoDB connected')
    app.listen(PORT, () => {
      console.log(
        chalk.green(`Server has been started on port ${PORT}
			`)
      )
    })
  } catch (e) {
    console.log(chalk.red(e.message))
    process.exit(1)
  }
}
start()
