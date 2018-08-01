
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
  authEvents.addHandlers()
  events.getTiles()
  ordersEvents.addHandlers()

  // STRIPE FUNCTIONALITY

  // console.log('StripeCheckout is ', StripeCheckout)

  // stripe stuff previously in index.html
  const checkoutHandler = StripeCheckout.configure({
    key: 'pk_test_ikhOV44uVLXegqqnKBGr490P',
    locale: 'auto'
  })

  // set default values for total amount and order id
  // to be updated programmatically
  let cents = 0
  let orderId = 'null'

  const button = document.getElementById('buttonCheckout')

  // when customer clicks 'checkout' button in shopping cart...
  button.addEventListener('click', function (ev) {
    // set `cents` to the value of the button's `data-amount` attribute
    // set `orderId` to the value of the button's `data-order` attribute
    // both of those have been updated each time the cart contents changed
    cents = parseInt($(this).attr('data-amount'))
    orderId = $(this).attr('data-order')

    // open the checkout modal
    //  name and description will both show in the modal and amounts will be on
    // its button
    // token won't be visible to user
    checkoutHandler.open({
      name: 'Nozama Aquatic Aquisitions',
      description: `Order # ${$(this).attr('data-order')}`,
      amount: cents,
      token: handleToken
    })
  })

  function handleToken (token) {
    // console.log('token inside of handleToken is: ')
    // console.log(token)

    // before sending charge POST request, add orderId and amount as
    // metadata by adding properties to `token.card.metadata`
    // this will ensure it's sent to back end in an accessible spot
    token.card.metadata['orderId'] = orderId
    token.card.metadata['amount'] = cents
    // send POST request to the charge portion of the server
    fetch(`${config.apiUrl}/charge`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(token)
    })
      // when post of charge is successful, process the response
      .then(output => {
        // console.log('output is ', output)
        // console.log('output.id is ', output.id)
        // console.log('output.body is ', output.body)
        // console.log('output.status is ', output.status)

        // if response was success (200), hide the modal, show success alert,
        // reset amount and order ID attributes on button, and create a new
        // order with no items in it
        if (output.status === 200) {
          $('#shoppingCartModal').modal('hide')
          ui.showAlert('success', 'Success!', 'Your payment has been processed', 2000)
          $('#buttonCheckout').attr('data-amount', 0)
          $('#buttonCheckout').attr('data-order', 'null')
          setTimeout(ordersEvents.onCreateOrder, 2000)
        }
      })
  }
})
