'use strict'

// const getFormFields = require('../../../lib/get-form-fields')
const ordersApi = require('./orders-api')
const ordersUi = require('./orders-ui')
const orderDetailHandlebars = require('../templates/past-cart-detail.handlebars')

// event handlers for...
const addHandlers = function () {
  $('#marketplace').on('click', '.tile-cart-button', processUpdateRequest)
  $('#cart-items').on('click', '.remove-item-button', processUpdateRequest)
  $('#cart-items-test').on('click', '.remove-item-button', processUpdateRequest)
  $('#past-order-list').on('click', '.show-past-order-button', onShowOrder)
}

// display details of past order
const onShowOrder = function () {
  const orderId = $(this).attr('data-id')
  console.log('in onShowOrder and orderId is: ', orderId)
  ordersApi.showOrder(orderId)
    .then(response => {
      console.log('response.order.items from showOrder is: :', response.order.items)
      console.log('typeof response.order from showOrder is: :', typeof response.order.items)
      console.log('response.order.items[0] from showOrder is: :', response.order.items[0])
      const orderDetailHtml = orderDetailHandlebars({ items: response.order.items })
      $('#order-detail-detail').html('')
      $('#order-detail-detail').html(orderDetailHtml)
      $('#order-detail').removeClass('hidden')
      $('#past-order-id').html(`<h3>Details for Order # ${orderId}</h3>`)
      // calculate total price of cart
      const priceArray = response.order.items.map(item => item.price)
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
      $('#past-order-total').html(`<h5>Total Cost: ${totalDollars}</h5>`)
    })
    .catch(console.error)
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
