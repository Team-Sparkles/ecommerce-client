'use strict'

const api = require('./api')
const ui = require('./ui')

const getTiles = function () {
  // console.log('event is ', event)
  // event.preventDefault()
  api.getTilesSubmit()
    .then(ui.getTilesSuccess)
    .catch(ui.getTilesError)
}

module.exports = {
  getTiles: getTiles
}
