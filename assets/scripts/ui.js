'use strict'

const store = require('./store')
const calEvents = require('./cal_events')

// succesfull registrations
const onRegisterSuccess = function (res) {
  store.user = res.user
  // reset the login form and the registration form
  $('#login-form').trigger('reset')
  $('#register-form').trigger('reset')
  // display a message to the user, and redirect back to the login page after 5 seconds
  $('#registration-result').html(`Thanks for registering ${store.user.email}.  You are about to be redirected to the login page...`)
  setTimeout(function () {
    $('#register-form').hide()
    $('#login-form').show()
    $('#registration-result').html('')
  }, 5000)
}

// failed registrations
const onRegisterFailure = function () {
  $('#registration-result').html('There was a problem registering your account - please check your Email address and Password, and try again!')
}

// Succesfull User Logins
const onLoginSuccess = function (res) {
  store.user = res.user
  $('#login-result').html('')
  $('#login-form').trigger('reset')
  $('#login-form').hide()
  // $('#register-form').hide()
  // $('#navigation').show()
  // $('#small-games').hide()
  // $('#tic-tac-toe-board').show()

  // call the function to display calendar_events
  calEvents.getUserEvents()
}

// Failed User Logins
const onLoginFailure = function () {
  $('#login-result').html('Login failed - check your email address and password, and try again!')
}

// successfully create event
const onCreateEventSuccess = function (res) {
  // reset the form
  $('#create-event-form').trigger('reset')
  // show a confirmation message
  $('#create-event-result').html('Event Created!')
}

// fail to create event
const onCreateEventFailure = function () {
  $('#create-event-result').html('Create Event Failed - something went wrong with your request, please try again!')
}

// getUserEvents Success
const onGetUserEventsSuccess = function (res) {
  console.log('Successfully got users events', res)
}

// getUserEvents Failure
const onGetUserEventsFailure = function () {
  console.log('Failed to get users events')
}


module.exports = {
  onLoginSuccess: onLoginSuccess,
  onLoginFailure: onLoginFailure,
  onRegisterSuccess: onRegisterSuccess,
  onRegisterFailure: onRegisterFailure,
  onCreateEventSuccess: onCreateEventSuccess,
  onCreateEventFailure: onCreateEventFailure,
  onGetUserEventsSuccess: onGetUserEventsSuccess,
  onGetUserEventsFailure: onGetUserEventsFailure
}
