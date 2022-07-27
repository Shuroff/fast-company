var globalTunnel = require('global-tunnel-ng')

globalTunnel.initialize({
  host: '10.33.101.131',
  port: 58228,
  proxyAuth: 'shde33:shd121', // optional authentication
})
process.env.http_proxy = 'http://shde33:shd121@10.33.101.131:58228'
process.env.https_proxy = 'http://shde33:shd121@10.33.101.131:58228'
globalTunnel.initialize()
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const PORT = config.get('port') ?? 8080

// if (process.env.NODE_ENV === 'production') {
//   console.log('Production')
// } else {
//   console.log('Development')
// }

// user: lev
// password: fast-cmp-lev
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
