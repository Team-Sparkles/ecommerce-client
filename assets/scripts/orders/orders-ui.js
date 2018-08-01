'use strict'
// require dependencies
const ui = require('../ui')
const cartItemsHandlebars = require('../templates/cart-items.handlebars')
const orderListHandlebars = require('../templates/past-orders.handlebars')

const ordersApi = require('./orders-api')

// const store = require('../store')

const showOrdersError = function (error) {
  // console.log('Error from showOrdersError is: ', error)
  ui.showAlert('danger', 'Warning!', 'Failed to load orders from database', 3000)
}

const createOrderError = function (error) {
  // console.log('Error from createOrderError is: ', error)
  ui.showAlert('danger', 'Warning!', 'Failed to create new order in database', 3000)
}

const showOrderError = function (error) {
  // console.log('Error from showOrderError is: ', error)
  ui.showAlert('danger', 'Warning!', 'Failed to load order from database', 3000)
}

const updateOrderError = function (error) {
  // console.log('Error from updateOrderError is: ', error)
  ui.showAlert('danger', 'Warning!', 'Failed to update order in database', 3000)
}

const showOrdersSuccess = function (response) {
  // console.log('Response from showOrdersError is: ', response)
}

const showOrderSuccess = function (response) {
  // console.log('Response from showOrderSuccess is: ', response)
}

const updateOrderSuccess = function (response) {
  displayOrders()
}

const createOrderSuccess = function (response) {
  updateCartDetails(response.order)
  displayOrders()
  ui.showAlert('success', 'Success!', 'We\'ve created a new order for you. Add some items to it below!', 3000)
}

const displayOrders = function () {
  ordersApi.showOrders()
    .then(response => {
      // console.log('response.orders from showOrders is: :', response.orders)
      // console.log('typeof response.orders from showOrders is: :', typeof response.orders)
      const orderListHtml = orderListHandlebars({ orders: response.orders })
      $('#past-order-list').html('')
      $('#past-order-list').html(orderListHtml)
    })
    .catch(console.error)
}

const displayOrder = function () {

}

// the order passed in here needs to be the kind that's populated with full
// items array of objects
const updateCartDetails = function (order) {
  // console.log('order from updateCartDetails is: ', order)
  // show or hide checkout button based on how many items are in cart
  if (order.items.length === 0) {
    $('#buttonCheckout').addClass('hidden')
  } else {
    $('#buttonCheckout').removeClass('hidden')
  }
  // update order id and order total in all fields with those classes
  $('.order-id').html(order._id)
  $('.order-total').html((order.total / 100).toFixed(2))
  $('#buttonCheckout').attr('data-amount', order.total)
  $('#buttonCheckout').attr('data-order', order._id)
  // if there are any items, use Handlebars to loop through the items in the
  // order and write them to the #cart-items div
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
  updateOrderError: updateOrderError,
  updateOrderSuccess: updateOrderSuccess,
  createOrderError: createOrderError,
  createOrderSuccess: createOrderSuccess,
  updateCartDetails: updateCartDetails,
  displayOrders: displayOrders,
  displayOrder: displayOrder
}
