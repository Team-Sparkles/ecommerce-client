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

const updateOrderSuccess = function (response) {
  console.log('Response from updateOrderSuccess is: ', response)
}

const createOrderSuccess = function (response) {
  updateCartDetails(response.order)
}

// the order passed in here needs to be the kind that's populated with full
// items array of objects
const updateCartDetails = function (order) {
  console.log('order from updateCartDetails is: ', order)

  const priceArray = order.items.map(item => item.price)
  console.log('priceArray is ', priceArray)
  let totalCents = 0
  if (priceArray.length > 0) {
    totalCents = priceArray.reduce((total, num) => total + num, 0)
  }
  const totalDollars = (totalCents / 100).toFixed(2)
  console.log('order.totalDollars from updateCartDetails is ', totalDollars)
  console.log('order.totalCents from updateCartDetails is ', totalCents)
  // update order id and order total in all fields with those classes
  // (currently applies to both shopping cart modal and shopping cart test area)
  $('.order-id').html(order._id)
  $('.order-total').html(totalDollars)
  $('#stripe-widget').attr('data-amount', totalCents)
  // if there are any items, use Handlebars to loop through the items in the
  // order and write them to the #cart-items (and #cart-items-test) divs
  if (order.items.length > 0) {
    const cartItemsHtml = cartItemsHandlebars({ items: order.items })
    $('#cart-items').html('')
    $('#cart-items').html(cartItemsHtml)
    // REMOVE THESE 2 LINES WHEN DONE TESTING SHOPPPING CART; THEY GO TO MAIN
    // PAGE, NOT MODAL
    $('#cart-items-test').html('')
    $('#cart-items-test').html(cartItemsHtml)
  } else {
    $('#cart-items').html('You have nothing in your cart.')
    // REMOVE THIS LINE WHEN DONE TESTING SHOPPING CART; GOES TO MAIN PAGE, NOT MODAL
    $('#cart-items-test').html('You have nothing in your cart.')
  }
}

module.exports = {
  showOrdersError: showOrdersError,
  showOrdersSuccess: showOrdersSuccess,
  showOrderError: showOrderError,
  showOrderSuccess: showOrderSuccess,
  updateOrderError: updateOrderError,
  updateOrderSuccess: updateOrderSuccess,
  createOrderError: createOrderError,
  createOrderSuccess: createOrderSuccess,
  updateCartDetails: updateCartDetails
}
