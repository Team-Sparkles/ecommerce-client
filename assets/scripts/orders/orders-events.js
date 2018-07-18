'use strict'

// const getFormFields = require('../../../lib/get-form-fields')
// const ordersApi = require('./orders-api')
// const ordersUi = require('./orders-ui')

// event handlers for...
const addHandlers = function () {
  $('#marketplace').on('click', '.tile-cart-button', addItemToOrder)
}

const createNewOrder = function () {

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
  addItemToOrder: addItemToOrder
}
