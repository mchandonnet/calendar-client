'use strict'

const store = require('./store')

/******************************/
/* BEGIN Handle User Logins   */
/******************************/
const onLoginSuccess = function (res) {
  store.user = res.user
  $('#login-result').html('')
  $('#login-form').trigger('reset')
  $('#login-form').hide()
  // $('#register-form').hide()
  // $('#navigation').show()
  // $('#small-games').hide()
  // $('#tic-tac-toe-board').show()
  console.log(res)
}

const onLoginFailure = function () {
  $('#login-result').html('Login failed - check your email address and password, and try again!')
}

module.exports = {
  onLoginSuccess: onLoginSuccess,
  onLoginFailure: onLoginFailure
}
