'use strict'
const tileEvents = require('./events')
const authEvents = require('./auth/auth-events')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // $('#marketplace').on('load', tileEvents.getTiles)
  $(document).ready(function () {
    console.log('document loaded')
    tileEvents.getTiles()
})
})
