'use strict'
const config = require('./config')

const getTilesSubmit = function () {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/items',
    headers: {
      contentType: 'application/json'
    }
  })
}

module.exports = {
  getTilesSubmit: getTilesSubmit
}
