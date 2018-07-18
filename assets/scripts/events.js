'use strict'

const api = require('./api')
const ui = require('./ui')

const getTiles = function () {
  api.getTilesSubmit()
    .then(ui.getTilesSuccess)
    .catch(ui.getTilesError)
}

module.exports = {
  getTiles: getTiles
}
