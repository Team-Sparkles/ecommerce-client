'use strict'
// require dependencies
const ui = require('../ui')
const cartItemsHandlebars = require('../templates/cart-items.handlebars')
// const store = require('../store')

const showOrdersError = function (error) {
  console.log('Error from showOrdersError is: ', error)
  ui.showAlert('danger', 'Warning!', 'Failed to load orders from database', 3000)
}

const createOrderError = function (error) {
  console.log('Error from createOrderError is: ', error)
  ui.showAlert('danger', 'Warning!', 'Failed to create new order in database', 3000)
}

const showOrderError = function (error) {
  console.log('Error from showOrderError is: ', error)
  ui.showAlert('danger', 'Warning!', 'Failed to load order from database', 3000)
}

const deleteOrderError = function (error) {
  console.log('Error from deleteOrderError is: ', error)
  ui.showAlert('danger', 'Warning!', 'Failed to delete order from database', 3000)
}

const updateOrderError = function (error) {
  console.log('Error from updateOrderError is: ', error)
  ui.showAlert('danger', 'Warning!', 'Failed to update order in database', 3000)
}

const showOrdersSuccess = function (response) {
  console.log('Response from showOrdersError is: ', response)
}

const showOrderSuccess = function (response) {
  console.log('Response from showOrderSuccess is: ', response)
}

const deleteOrderSuccess = function (response) {
  console.log('Response from deleteOrderSuccess is: ', response)
}

const updateOrderSuccess = function (response) {
  console.log('Response from updateOrderSuccess is: ', response)
}

const createOrderSuccess = function (response) {
  updateCartDetails(response.order)
}

const updateCartDetails = function (order) {
  console.log('order from updateCartDetails is: ', order)
  $('#orderId').html(order._id)
  if (order.items.length > 0) {
    const cartItemsHtml = cartItemsHandlebars({ items: order.items })
    $('#cart-items').html('')
    $('#cart-items').html(cartItemsHtml)
  } else {
    $('#cart-items').html('You have nothing in your cart.')
  }
}

module.exports = {
  showOrdersError: showOrdersError,
  showOrdersSuccess: showOrdersSuccess,
  showOrderError: showOrderError,
  showOrderSuccess: showOrderSuccess,
  deleteOrderError: deleteOrderError,
  deleteOrderSuccess: deleteOrderSuccess,
  updateOrderError: updateOrderError,
  updateOrderSuccess: updateOrderSuccess,
  createOrderError: createOrderError,
  createOrderSuccess: createOrderSuccess,
  updateCartDetails: updateCartDetails
}
