'use strict'
const handlebars = require('./tile.handlebars')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authEvents = require('./auth/auth-events')
$(() => {
const showTilesHtml = handlebars({ items: data.items })
  // $('#marketplace').html('')
  $('#marketplace').append(showTilesHtml)
  authEvents.addHandlers()
})
