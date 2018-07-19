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

  // get order in its current form from DB (which includes populated items)
  ordersApi.showOrder(orderId)
    .then((response) => {
      // create an array for item id references
      let itemsIdsOnlyArray = []
      // loop through items, which come in populated, grab their ids, and push
      // only the ids to the array
      response.order.items.forEach((item) => {
        itemsIdsOnlyArray.push(item._id)
      })
      console.log('updated items array w/o extra details : ', itemsIdsOnlyArray)
      // add the new item requested to the array of id references
      itemsIdsOnlyArray.push(itemId)
      console.log('updated item list is: ', itemsIdsOnlyArray)
      // set up data to update order with, using the items array made up of
      // only IDs, not populated objects
      const data = {
        order: {
          items: itemsIdsOnlyArray,
          checkoutComplete: false
        }
      }
      console.log('updated response about to be saved is: ', data)
      // call the function to update the order, passing in the order number and
      // the revised data
      ordersApi.updateOrder(orderId, data)
        // because our update route doesn't return any data, we have to
        // do another show to retrieve the updated order with populated items
        .then(() => ordersApi.showOrder(orderId))
        // send the order from the response to the updateCartDetails function
        // to be printed to page
        .then(response => ordersUi.updateCartDetails(response.order))
        // log any errors along the way
        .catch(error => console.error)
    })
    .catch(ordersUi.showOrderError)
}

module.exports = {
  addHandlers: addHandlers,
  addItemToOrder: addItemToOrder,
  onCreateOrder: onCreateOrder
}