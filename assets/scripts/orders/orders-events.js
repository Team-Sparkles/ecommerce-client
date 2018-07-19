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
  // find item ID from button clicked
  const itemId = $(this).attr('data-id')
  console.log('itemId is: ', itemId)
  // finds the order id based on the contents of the first element with class
  // .order-id
  const orderId = $('.order-id').html()
  console.log('order id is: ', orderId)
  ordersApi.showOrder(orderId)
    .then((response) => {
      // const order = response.order
      console.log('response.order is ', response.order)
      console.log('response.order.items is ', response.order.items)
      console.log('response.order.items[0] is: ', response.order.items[0])
      if (response.order.items[0]) {
        console.log('response.order.items[0]._id is: ', response.order.items[0]._id)
      }
      console.log('typeof response.order.items is: ', typeof response.order.items)
      let itemsIdsOnlyArray = []
      response.order.items.forEach((item) => {
        itemsIdsOnlyArray.push(item._id)
      })
      console.log('updated items array w/o extra details : ', itemsIdsOnlyArray)
      itemsIdsOnlyArray.push(itemId)
      console.log('updated item list is: ', itemsIdsOnlyArray)
      const data = {
        order: {
          items: itemsIdsOnlyArray,
          checkoutComplete: false
        }
      }
      console.log('updated response about to be saved is: ', data)
      ordersApi.updateOrder(orderId, data)
        .then((response) => {
          console.log('succeeded at updating record, about to show record')
          return response
        })
        .then(() => ordersApi.showOrder(orderId))
        .then(response => ordersUi.updateCartDetails(response.order))
        .catch(error => console.error)
    })
    .catch(ordersUi.showOrderError)
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
