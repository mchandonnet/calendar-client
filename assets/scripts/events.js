'use strict'

const getFormFields = require('./../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const resetForms = function () {
  $('#change-password-form').trigger('reset')
  $('#login-form').trigger('reset')
  $('#register-form').trigger('reset')
  $('#create-event-form').trigger('reset')
}

const resetHTML = function () {
  $('#registration-result').html('')
  $('#login-result').html('')
  $('#change-password-result').html('')
  $('#api-failure').html('')
}

const views = function (cha, login, reg, events) {
  if (cha) {
    $('#change-password-form').show()
  } else {
    $('#change-password-form').hide()
  }

  if (login) {
    $('#login-form').show()
  } else {
    $('#login-form').hide()
  }

  if (reg) {
    $('#register-form').show()
  } else {
    $('#register-form').hide()
  }

  if (events) {
    $('#small-games').show()
  } else {
    $('#small-games').hide()
  }

  resetForms()
  $('#api-failure').html('')
}

// sign-in event handler
const onSignIn = function (event) {
  // prevent default action for the event
  event.preventDefault()
  // get the form from event object
  const form = event.target
  // use getFormFields() to get the data from the form
  const data = getFormFields(form)
  api.apiCall('/sign-in', 'POST', data, false)
  // handle SUCCESSFUL response
    .then(ui.onLoginSuccess)
  // handle ERROR response
    .catch(ui.onLoginFailure)
}

// registration event handler
const onRegisterUser = function (event) {
  // prevent the default action for the event
  event.preventDefault()
  // get the form from the event object
  const form = event.target
  // use getFormFields() to get the data from the form
  const data = getFormFields(form)
  // calling a function to register the user
  // api.signUp(data)
  api.apiCall('/sign-up', 'POST', data, false)
  // handle SUCCESSFUL response
    .then(ui.onRegisterSuccess)
  // handle ERROR response
    .catch(ui.onRegisterFailure)
}

// change password event handler
const onChangePassword = function (event) {
  // prevent the default action
  event.preventDefault()
  // get the form from the event object
  const form = event.target
  // use getFormFields() to get the data from the form
  const data = getFormFields(form)
  api.apiCall('/change-password', 'PATCH', data, true)
  // handle SUCCESSFUL response
    .then(ui.onChangePasswordSuccess)
  // handle ERROR response
    .catch(ui.onChangePasswordFailure)
}

// create event handler
const onCreateEvent = function (event) {
  // prevent the default action for the event
  event.preventDefault()
  // get the form from the event object
  const form = event.target
  // use getFormFields() to get the data from the form
  const data = getFormFields(form)
  api.apiCall('/events', 'POST', data, true)
  // handle SUCCESSFUL response
    .then(ui.onCreateEventSuccess)
  // handle ERROR response
    .catch(ui.onCreateEventFailure)
}

module.exports = {
  onSignIn: onSignIn,
  onRegisterUser: onRegisterUser,
  onCreateEvent: onCreateEvent,
  onChangePassword: onChangePassword,
  views: views,
  resetHTML: resetHTML,
  resetForms: resetForms
}
