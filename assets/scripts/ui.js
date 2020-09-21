'use strict'

// const events = require('./events')
const uiManager = require('./uiManager')
const store = require('./store')
// const calendar = require('./calendar')

// clear forms
// const clearForms = function () {
//   $('#register-form').trigger('reset')
//   $('#login-form').trigger('reset')
//   $('#create-event-form').trigger('reset')
//   resetHTML()
// }

// const resetHTML = function () {
//   $('#registration-result').html('')
//   $('#login-result').html('')
//   $('#change-password-result').html('')
//   $('#api-failure').html('')
// }

// succesfull registrations
const onRegisterSuccess = function (res) {
  store.user = res.user
  // reset forms
  // clearForms()
  uiManager.resetForms()
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
  // reset forms
  // clearForms()
  uiManager.resetForms()
  uiManager.resetHTML()
  store.user = res.user
  $('#login-result').html('')
  $('#login-form').hide()
}

// Failed User Logins
const onLoginFailure = function () {
  $('#login-result').html('Login failed - check your email address and password, and try again!')
}

// change password success
const onChangePasswordSuccess = function () {
  $('#change-password-result').html('You have succesfully changed your password!')
  // clearForms()
  uiManager.resetForms()
}

// change password failure
const onChangePasswordFailure = function () {
  $('#change-password-result').html('Change Password failed - check your password, and try again!')
}

// successfully create event
const onCreateEventSuccess = function (res) {
  // reset forms
  // clearForms()
  uiManager.resetForms()
  // show a confirmation message
  $('#create-event-result').html('Event Created!')
}

// fail to create event
const onCreateEventFailure = function () {
  $('#create-event-result').html('Create Event Failed - something went wrong with your request, please try again!')
}

const formatTime = function (string) {
  const t = string.split(':')
  const h = (t[0] % 12) === 0 ? `0${t}` : (t[0] % 12)
  const m = t[1]
  const d = (t[0] % 12) === 0 ? 'am' : 'pm'
  return `${h}:${m} ${d}`
}

// getUserEvents Success
const onGetUserEventsSuccess = function (res) {
  $('#event-owner').html(`${res.event[0].owner.firstName} ${res.event[0].owner.lastName}'s events:`)
  let eventsHTML = ''
  if (res.event.length === 0) {
    eventsHTML += '<div class="col-12">You do not have any events scheduled currently!</div>'
  } else {
    for (let i = 0; i < res.event.length; i++) {
      const date = new Date(res.event[i].startDate)
      const startTime = formatTime(res.event[i].startTime)
      const endTime = formatTime(res.event[i].endTime)
      eventsHTML += `
        <div class="col-12 events eventName"><h6>${res.event[i].eventName}</h6></div>
        <div class="col-12 events">${res.event[i].eventNotes}</div>
        <div class="col-12 events">${date.toDateString()}</div>
        <div class="col-12 events">${startTime} - ${endTime}</div>
        <div class="col-12 events edit-delete">
        <span><a href="#" id="event-edit" data-value-index="${res.event[i]._id}">edit</a></span>
        <span> | </span>
        <span><a href="#" id="event-delete" data-value-index='${res.event[i]._id}'>delete</a></span>
      </div>
      `
    }
  }
  $('#user-events').html(eventsHTML)
}

// getUserEvents Failure
const onGetUserEventsFailure = function () {
  console.log('Failed to get users events')
}

const onDeleteEventFailure = function () {
  console.log('Delete Failed')
}

module.exports = {
  onLoginSuccess: onLoginSuccess,
  onLoginFailure: onLoginFailure,
  onRegisterSuccess: onRegisterSuccess,
  onRegisterFailure: onRegisterFailure,
  onCreateEventSuccess: onCreateEventSuccess,
  onCreateEventFailure: onCreateEventFailure,
  onGetUserEventsSuccess: onGetUserEventsSuccess,
  onGetUserEventsFailure: onGetUserEventsFailure,
  // clearForms: clearForms,
  onChangePasswordFailure: onChangePasswordFailure,
  onChangePasswordSuccess: onChangePasswordSuccess,
  onDeleteEventFailure: onDeleteEventFailure
}
