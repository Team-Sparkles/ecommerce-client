'use strict'

const handlebars = require('./tile.handlebars')

const getTilesSuccess = function (data) {
  const showTilesHtml = handlebars({ items: data.items })
  $('#marketplace').html('')
  $('#marketplace').html(showTilesHtml)
}
const getTilesError = function (error) {
  // $('#display').html('Tiles retrieval unsuccessful', error)
  console.log('GET error is ', error)
}

// uses Bootstrap to add a color-coded, dismissable alert based on context
// context options: success (green), info (blue), warning (tan), danger (red)
// if you pass in an optional fadeTime, the alert will hide itself after that
// many milliseconds; otherwise user will need to dismiss
const showAlert = function (context, msgBold, msgText, fadeTime) {
  console.log('in ui.showAlert')
  $('#alert-zone').html(`<div class="alert alert-${context} alert-dismissible" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <strong><span="msg-bold">${msgBold}</span></strong> <span id="msgText">${msgText}</span>
  </div>`)
  if (fadeTime) {
    $(`#alert-zone .alert-${context}`).delay(fadeTime).fadeOut()
  }
}

// deletes all alerts from #alert-zone
const clearAlerts = function () {
  $('#alert-zone').html('')
}

module.exports = {
  showAlert: showAlert,
  clearAlerts: clearAlerts,
  getTilesSuccess: getTilesSuccess,
  getTilesError: getTilesError
}
