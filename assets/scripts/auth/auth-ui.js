'use strict'
// require dependencies
const ui = require('../ui')
const store = require('../store')
const ordersEvents = require('../orders/orders-events.js')
const ordersUi = require('../orders/orders-ui.js')

// run on sign up error
const signUpError = function (error) {
  showAuthErrorMessage('That email is already taken. Please pick a new one or sign in to an existing account instead.')
  clearAuthForms()
}

// run on sign in success
// (also run after successful sign-up leads to automatic sign-in, if successful)
const signInSuccess = function (response) {
  // store data retricved from server
  store.user = response.user
  // change which auth options are available
  $('.sign-up').addClass('hidden')
  $('.sign-in').addClass('hidden')
  $('.sign-out').removeClass('hidden')
  $('#see-orders-button').removeClass('hidden')
  $('#shopping-cart-button').removeClass('hidden')
  $('.change-password').removeClass('hidden')
  // clear form fields and hide modal
  clearAuthForms()
  $('#signInModal').modal('hide')
  $('#signUpModal').modal('hide')
  ordersEvents.onCreateOrder()
  ordersUi.displayOrders()
}

// run on sign-in error
const signInError = function (error) {
  // display error message and clear form fields
  showAuthErrorMessage('Email or password was incorrect. Please try again or sign up for a new account instead.')
  clearAuthForms()
}

const signUpPasswordError = function (error) {
  // display error message and clear form fields
  showAuthErrorMessage("Those passwords don't match. Please try again.")
  clearAuthForms()
}

// run on successful password change (note no response expected from server)
const changePasswordSuccess = function (response) {
  // diplay success message
  ui.showAlert('success', 'Success!', 'Your password has been changed.', 3000)
  // clear form fields and hide modal
  clearAuthForms()
  $('#changePasswordModal').modal('hide')
}

// run password change fails
const changePasswordError = function (error) {
  // display error message and clear form fields
  showAuthErrorMessage('Oops! Please correct your old password and try again.')
  clearAuthForms()
}

// run on successful sign-outline (note no response expected from server)
const signOutSuccess = function (response) {
  // update order id in all fields with class order-id
  $('.order-id').html('Uh oh! No user is signed in!')
  $('#cart-items').html('')
  delete store.user
  // change which auth options are available
  $('.sign-up').removeClass('hidden')
  $('.sign-in').removeClass('hidden')
  $('.sign-out').addClass('hidden')
  $('.change-password').addClass('hidden')
  $('#see-orders-button').addClass('hidden')
  $('#shopping-cart-button').addClass('hidden')
  $('#order-detail-detail').html('')
  $('#order-detail').addClass('hidden')
  $('#buttonCheckout').attr('data-amount', 0)
  $('#buttonCheckout').attr('data-order', 'null')
  ui.showAlert('success', 'Success!', 'We\'ve signed you out and deleted your cart.', 3000)
}

// run on sign-out error
const signOutError = function (error) {
  // show error and clear auth forms
  showAuthErrorMessage("Something went wrong. You're still logged in. Quick, show this error message to the nearest developer: ", error)
  clearAuthForms()
}

// display a message to the user on main screen and in modal
const showAuthErrorMessage = function (message) {
  $('.auth-alert-modal').html(message).removeClass('hidden')
}

// remove message currently displayed to user
const clearAuthMessage = function () {
  $('.auth-alert-main').addClass('hidden').html('')
  $('.auth-alert-modal').addClass('hidden').html('')
}

// clear values from all auth forms
const clearAuthForms = function () {
  $('input').val('')
}

module.exports = {
  signUpError: signUpError,
  signInSuccess: signInSuccess,
  signInError: signInError,
  changePasswordSuccess: changePasswordSuccess,
  changePasswordError: changePasswordError,
  signOutSuccess: signOutSuccess,
  signOutError: signOutError,
  showAuthErrorMessage: showAuthErrorMessage,
  clearAuthMessage: clearAuthMessage,
  clearAuthForms: clearAuthForms,
  signUpPasswordError: signUpPasswordError
}
