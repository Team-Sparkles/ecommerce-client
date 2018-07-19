'use strict'

// const getFormFields = require('../../../lib/get-form-fields')
const ordersApi = require('./orders-api')
const ordersUi = require('./orders-ui')
const ui = require('../ui')

// event handlers for...
const addHandlers = function () {
  $('#marketplace').on('click', '.tile-cart-button', processUpdateRequest)
  $('#cart-items').on('click', '.remove-item-button', processUpdateRequest)
  $('#cart-items-test').on('click', '.remove-item-button', processUpdateRequest)
}

const addAlert = function () {
  ui.showAlert('success', 'Success!', 'Added to cart!', 3000)
}

const onCreateOrder = function () {
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

const processUpdateRequest = function () {
  // find item ID from button clicked
  const itemId = $(this).attr('data-id')
  console.log('itemId is: ', itemId)
  // finds the order id based on the contents of the first element with class
  // .order-id
  const orderId = $('.order-id').html()
  console.log('order id is: ', orderId)
  // checks what kind of button was clicked
  const buttonClass = $(this).attr('class')
  console.log('button class is: ', buttonClass)

  // get order in its current form from DB (which includes populated items)
  ordersApi.showOrder(orderId)
    .then((response) => {
      // create an array for item id references
      const itemsIdsOnlyArray = []
      // loop through items, which come in populated, grab their ids, and push
      // only the ids to the array
      response.order.items.forEach((item) => {
        itemsIdsOnlyArray.push(item._id)
      })
      console.log('updated items array before requested change: ', itemsIdsOnlyArray)
      // if add button was clicked, add new item requested to array of id refrences
      if (buttonClass === 'tile-cart-button') {
        itemsIdsOnlyArray.push(itemId)
        addAlert()
      // else if remove button was clicked, remove item from
      } else if (buttonClass === 'remove-item-button') {
        // find index of first element in array that matches the item ID you
        // asked to remove
        const firstMatchIndex = itemsIdsOnlyArray.findIndex(item => item === itemId)
        console.log('need to delete from array the first match at position ', firstMatchIndex)
        // remove one element from array at that index
        itemsIdsOnlyArray.splice(firstMatchIndex, 1)
        console.log('updated item list after removing item is: ', itemsIdsOnlyArray)
      }
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
      onUpdateOrder(orderId, data)
    })
    .catch(ordersUi.showOrderError)
}

const onUpdateOrder = function (orderId, data) {
  ordersApi.updateOrder(orderId, data)
    // because our update route doesn't return any data, we have to
    // do another show to retrieve the updated order with populated items
    .then(() => ordersApi.showOrder(orderId))
    // send the order from the response to the updateCartDetails function
    // to be printed to page
    .then(response => ordersUi.updateCartDetails(response.order))
    // log any errors along the way
    .catch(error => console.error)
}

module.exports = {
  addHandlers: addHandlers,
  onCreateOrder: onCreateOrder,
  onUpdateOrder: onUpdateOrder,
  processUpdateRequest: processUpdateRequest
}
