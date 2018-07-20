
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
  const button = document.getElementById('buttonCheckout')
  button.addEventListener('click', function (ev) {
    console.log("$(this).attr('data-amount') is ", $(this).attr('data-amount'))
    const cents = parseInt($(this).attr('data-amount'))
    console.log('cents in click handler is ', cents)
    checkoutHandler.open({
      name: 'Nozama Aquatic Aquisitions',
      description: 'Your Purchase',
      amount: cents,
      token: handleToken
    })
  })
  function handleToken (token) {
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
          // document.getElementById('shop').innerHTML = '<p>Purchase complete!</p>'
          $('#shoppingCartModal').modal('hide')
          ui.showAlert('success', 'Success!', 'Your payment has been processed', 2000)
          setTimeout(ordersEvents.onCreateOrder, 2000)
          // TODO: update record to show as completed
          // TODO: add the charge id to the record
          // ordersEvents.onCreateOrder()
        }
      })
  }
})
