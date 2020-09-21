'use strict'

const getFormFields = require('./../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const uiManager = require('./uiManager')

// const resetForms = function () {
//   $('#change-password-form').trigger('reset')
//   $('#login-form').trigger('reset')
//   $('#register-form').trigger('reset')
//   $('#create-event-form').trigger('reset')
// }

// const resetHTML = function () {
//   $('#registration-result').html('')
//   $('#login-result').html('')
//   $('#change-password-result').html('')
//   $('#api-failure').html('')
// }

// const views = function (changepw, login, register, createEvent, showEvents) {
//   if (changepw) {
//     $('#change-password-form').show()
//   } else {
//     $('#change-password-form').hide()
//   }

//   if (login) {
//     $('#login-form').show()
//   } else {
//     $('#login-form').hide()
//   }

//   if (register) {
//     $('#register-form').show()
//   } else {
//     $('#register-form').hide()
//   }

//   if (createEvent) {
//     $('#create-event-form').show()
//   } else {
//     $('#create-event-form').hide()
//   }

//   if (showEvents) {
//     $('#show-events-section').show()
//   } else {
//     $('#show-events-section').hide()
//   }

//   uiManager.resetForms()
//   $('#api-failure').html('')
// }

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

const getUserEvents = function () {
  uiManager.views(false, false, false, false, true)
  api.apiCall('/events', 'GET', false, true)
  // handle SUCCESSFUL response
    .then(ui.onGetUserEventsSuccess)
  // handle ERROR response
    .catch(ui.onGetUserEventsFailure)
}

const deleteEvent = function (event) {
  console.log('Delete this event', event.target.dataset.valueIndex)
  const urlString = `/events/${event.target.dataset.valueIndex}`
  api.apiCall(urlString, 'DELETE', 'false', 'true')
  // handle SUCCESSFUL response
    .then(() => getUserEvents())
  // handle ERROR response
    .catch(ui.onDeleteEventsFailure)
}

const editEvent = function (event) {
  console.log('Edit this event', event.target.dataset.valueIndex)
}

module.exports = {
  onSignIn: onSignIn,
  onRegisterUser: onRegisterUser,
  onCreateEvent: onCreateEvent,
  onChangePassword: onChangePassword,
  // views: views,
  // resetHTML: resetHTML,
  // resetForms: resetForms,
  getUserEvents: getUserEvents,
  deleteEvent: deleteEvent,
  editEvent: editEvent
}
