'use strict'

const getFormFields = require('./../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

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
  onChangePassword: onChangePassword
}
