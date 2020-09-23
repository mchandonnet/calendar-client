'use strict'

const getFormFields = require('./../../lib/get-form-fields')
const api = require('./api')
const store = require('./store')
const ui = require('./ui')
const uiManager = require('./uiManager')

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

// sign-out event handler
const onLogout = function () {
  // api.signUp(data)
  api.apiCall('/sign-out', 'DELETE', false, true)
  // handle SUCCESSFUL response
    .then(ui.onLogoutSuccess)
  // handle ERROR response
    .catch(ui.onLogouFailure)
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
    .then(setTimeout(function () {
      ui.getUserEvents(store.user.LDC)
      uiManager.resetForms()
    }, 1000))
  // handle ERROR response
    .catch(ui.onCreateEventFailure)
}

// const getUserEvents = function (eventdate) {
//   store.user.LDC = eventdate
//   console.log('LDC: ', store.user.LDC)
//   uiManager.views(false, false, false, false, true, false, true, true)
//   const urlString = (eventdate === 'all') ? '/events' : '/events/date/' + eventdate
//   console.log(urlString)
//   api.apiCall(urlString, 'GET', false, true)
//   // handle SUCCESSFUL response
//     .then(ui.onGetUserEventsSuccess)
//   // handle ERROR response
//     .catch(ui.onGetUserEventsFailure)
// }

const deleteEvent = function (event) {
  const urlString = `/events/${event.target.dataset.valueIndex}`
  api.apiCall(urlString, 'DELETE', 'false', 'true')
  // handle SUCCESSFUL response
    .then(() => ui.getUserEvents(store.user.LDC))
  // handle ERROR response
    .catch(ui.onDeleteEventsFailure)
}

const editEventGetDetails = function (event) {
  const urlString = `/events/${event.target.dataset.valueIndex}`
  api.apiCall(urlString, 'GET', 'false', 'true')
  // handle SUCCESSFUL response
    .then(ui.onEditEventGetDetailsSuccess)
  // handle ERROR response
    .catch(ui.onEditEventGetDetailsFailure)
}

const onEditEvent = function (event) {
  // prevent the default action for the event
  event.preventDefault()
  // get the form from the event object
  const form = event.target
  // use getFormFields() to get the data from the form
  const data = getFormFields(form)
  const urlString = `/events/${data.ID}`
  api.apiCall(urlString, 'PATCH', data, true)
  // handle SUCCESSFUL response
    .then(() => {
      $('#edit-event-result').html('Saving changes...')
    })
    .then(setTimeout(function () { 
      uiManager.resetForms(true)
      ui.getUserEvents(store.user.LDC)
    }, 1000))
  // handle ERROR response
    .catch(ui.onEditEventFailure)
}

module.exports = {
  onSignIn: onSignIn,
  onRegisterUser: onRegisterUser,
  onCreateEvent: onCreateEvent,
  onChangePassword: onChangePassword,
  // getUserEvents: getUserEvents,
  deleteEvent: deleteEvent,
  editEventGetDetails: editEventGetDetails,
  onEditEvent: onEditEvent,
  onLogout: onLogout
}
