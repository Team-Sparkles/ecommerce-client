
const events = require('./events')
const config = require('./config')
const ui = require('./ui')
const authEvents = require('./auth/auth-events')
const ordersEvents = require('./orders/orders-events')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  console.log('document loaded')
  authEvents.addHandlers()
  events.getTiles()
  ordersEvents.addHandlers()
  console.log('StripeCheckout is ', StripeCheckout)

  // stripe stuff previously in index.html
  const checkoutHandler = StripeCheckout.configure({
    key: 'pk_test_ikhOV44uVLXegqqnKBGr490P',
    locale: 'auto'
  })

  let cents = 0
  let orderId = '0'
  const button = document.getElementById('buttonCheckout')

  button.addEventListener('click', function (ev) {
    // console.log("$(this).attr('data-amount') is ", $(this).attr('data-amount'))
    // console.log("$(this).attr('data-order') is ", $(this).attr('data-order'))
    cents = parseInt($(this).attr('data-amount'))
    orderId = $(this).attr('data-order')
    // console.log('cents in click handler is ', cents)
    checkoutHandler.open({
      name: 'Nozama Aquatic Aquisitions',
      description: `Order # ${$(this).attr('data-order')}`,
      amount: cents,
      token: handleToken
    })
  })

  function handleToken (token) {
    console.log('token inside of handleToken is: ')
    console.log(token)
    token.card.metadata['orderId'] = orderId
    token.card.metadata['amount'] = cents
    fetch(`${config.apiUrl}/charge`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(token)
    })
      .then(output => {
        console.log('output is ', output)
        console.log('output.id is ', output.id)
        console.log('output.body is ', output.body)
        console.log('output.status is ', output.status)
        if (output.status === 200) {
          $('#shoppingCartModal').modal('hide')
          ui.showAlert('success', 'Success!', 'Your payment has been processed', 2000)
          setTimeout(ordersEvents.onCreateOrder, 2000)
          $('#buttonCheckout').attr('data-amount', 0)
          $('#buttonCheckout').attr('data-order', 'null')
          // TODO: update record to show as completed
          // TODO: add the charge id to the record
        }
      })
  }
})
