'use strict'

// require dependencies
const config = require('../config')
const store = require('../store')

// CREATE - make a call to the server to create a new order
const createOrder = function (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/orders',
    headers: {
      Authorization: 'Token token=' + store.user.token,
      ContentType: 'application/json'
    },
    data: data
  })
}

// THIS FUNCTION NOT YET TESTED
// INDEX - make a call to the server to show all orders
const showOrders = function () {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/orders',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// SHOW - make a call to the server to show a specific order
const showOrder = function (id) {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + `/orders/${id}`,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// UPDATE - make a call to server to update an order
const updateOrder = function (id, data) {
  console.log('data inside of updateOrder function is ', data)
  console.log('id inside of updateOrder function is ', id)
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + `/orders/${id}`,
    data: data,
    headers: {
      Authorization: 'Token token=' + store.user.token,
      ContentType: 'application/json'
    }
  })
}

// DESTROY - make a call to server to delete an order
const deleteOrder = function (id) {
  console.log('inside deleteOrder and id is ', id)
  console.log('inside deleteOrder and store.user.token is ', store.user.token)
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + `/orders/${id}`,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  deleteOrder: deleteOrder,
  showOrder: showOrder,
  showOrders: showOrders,
  updateOrder: updateOrder,
  createOrder: createOrder
}
