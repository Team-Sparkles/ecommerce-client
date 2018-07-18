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

// INDEX - make a call to the server to show all orders
const showOrders = function () {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/orders'
  })
}

// SHOW - make a call to the server to show a specific order
const showOrder = function (id) {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + `/orders/:${id}`
  })
}

// UPDATE - make a call to server to update an order
const updateOrder = function (data) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + `/orders/:${data.id}`,
    data: data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// DESTROY - make a call to server to delete an order
const deleteOrder = function (id) {
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + `/orders/:${id}`,
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
