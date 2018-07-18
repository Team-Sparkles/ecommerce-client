'use strict'

const getTilesSubmit = function () {
  return $.ajax({
    method: 'GET',
    url: 'http://localhost:4741/items',
    headers: {
      contentType: 'application/json'
    }
  })
}

module.exports = {
  getTilesSubmit: getTilesSubmit
}
