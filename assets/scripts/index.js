'use strict'
const events = require('./events')
const authEvents = require('./auth/auth-events')
const ordersEvents = require('./orders/orders-events')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // console.log('document loaded')
  authEvents.addHandlers()
  events.getTiles()
  ordersEvents.addHandlers()
})
