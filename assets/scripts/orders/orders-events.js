'use strict'

// const getFormFields = require('../../../lib/get-form-fields')
const ordersApi = require('./orders-api')
const ordersUi = require('./orders-ui')
const store = require('../store')

// event handlers for...
const addHandlers = function () {
  $('#marketplace').on('click', '.tile-cart-button', addItemToOrder)
}

const onCreateOrder = function () {
  console.log('you want to create a new order and store.user is : ', store.user)
  const data = {
    order: {
      items: [],
      checkoutComplete: false
    }
  }
  ordersApi.createOrder(data)
    .then(ordersUi.createOrderSuccess)
    .catch(ordersUi.createOrderError)
}

const addItemToOrder = function () {
  const itemId = $(this).attr('data-id')
  console.log('itemId is: ', itemId)
  // get this one order from db
  // push this itemID onto item array of order data
  // update order with new data
  // run update success function
}

module.exports = {
  addHandlers: addHandlers,
  addItemToOrder: addItemToOrder,
  onCreateOrder: onCreateOrder
}
