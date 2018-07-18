'use strict'
// require dependencies
const ui = require('../ui')
// const store = require('../store')

const getOrdersError = function (error) {
  console.log('Error from getOrdersError is: ', error)
  ui.showAlert('danger', 'Warning!', 'Failed to load orders from database', 3000)
}

const createOrderError = function (error) {
  console.log('Error from createOrderError is: ', error)
  ui.showAlert('danger', 'Warning!', 'Failed to create new order in database', 3000)
}

const getOrderError = function (error) {
  console.log('Error from getOrderError is: ', error)
  ui.showAlert('danger', 'Warning!', 'Failed to load order from database', 3000)
}

const deleteOrderError = function (error) {
  console.log('Error from deleteOrderError is: ', error)
  ui.showAlert('danger', 'Warning!', 'Failed to delete order from database', 3000)
}

const updateOrderError = function (error) {
  console.log('Error from updateOrderError is: ', error)
  ui.showAlert('danger', 'Warning!', 'Failed to update order in database', 3000)
}

const getOrdersSuccess = function (response) {
  console.log('Response from getOrdersError is: ', response)
}

const getOrderSuccess = function (response) {
  console.log('Response from getOrderSuccess is: ', response)
}

const deleteOrderSuccess = function (response) {
  console.log('Response from deleteOrderSuccess is: ', response)
}

const updateOrderSuccess = function (response) {
  console.log('Response from updateOrderSuccess is: ', response)
}

const createOrderSuccess = function (response) {
  console.log('Response from createOrderSuccess is: ', response)
}

module.exports = {
  getOrdersError: getOrdersError,
  getOrdersSuccess: getOrdersSuccess,
  getOrderError: getOrderError,
  getOrderSuccess: getOrderSuccess,
  deleteOrderError: deleteOrderError,
  deleteOrderSuccess: deleteOrderSuccess,
  updateOrderError: updateOrderError,
  updateOrderSuccess: updateOrderSuccess,
  createOrderError: createOrderError,
  createOrderSuccess: createOrderSuccess
}
