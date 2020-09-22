'use strict'

const uiManager = require('./uiManager')
const store = require('./store')
const calendar = require('./calendar')

// defining variables for building the initial calendar
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const today = new Date()
const currentMonth = months[today.getMonth()]
const currentYear = today.getFullYear()
const currentM = ((today.getMonth()) + 1) <= 9 ? `0${((today.getMonth()) + 1)}` : ((today.getMonth()) + 1)
const currentD = today.getDate() <= 9 ? `0${today.getDate()}` : today.getDate()

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
  uiManager.resetForms(true)
  store.user = res.user
  store.user.today = `${currentYear}-${currentM}-${currentD}`
  uiManager.views(false, false, false, false, false, false, true, true)
  calendar.buildCalendar(currentMonth, currentYear)
}

// Failed User Logins
const onLoginFailure = function () {
  $('#login-result').html('Login failed - check your email address and password, and try again!')
  $('#login-password').val('')
}

// logout Success
const onLogoutSuccess = function () {
  uiManager.resetForms(true)
  uiManager.views(false, true, false, false, false, false, false, false)
  delete store.user
  calendar.buildCalendar(currentMonth, currentYear)
}

// logout failure
const onLogoutFailure = function () {
  $('#logout-result').html('User logout failed - please try again! -- ')
}

// change password success
const onChangePasswordSuccess = function () {
  $('#change-password-result').html('You have succesfully changed your password!')
  uiManager.resetForms(false)
}

// change password failure
const onChangePasswordFailure = function () {
  $('#change-password-result').html('Change Password failed - check your password, and try again!')
  $('#change-password-old').val('')
  $('#change-password-new').val('')
  $('#change-password-form').on('click', function () {
    $('#change-password-result').html('')
  })
}

// successfully create event
const onCreateEventSuccess = function (res) {
  uiManager.resetForms()
  // show a confirmation message
  $('#create-event-result').html('Event Created!')
}

// fail to create event
const onCreateEventFailure = function () {
  $('#create-event-result').html('Action Failed - Please try again in a few minutes!')
  $('#create-event-form').on('click', function () {
    $('#create-event-result').html('')
  })
}

// function to convert time from 24 hour clock to 12 hour clock
const formatTime = function (string) {
  const t = string.split(':')
  if (t[0] === '00') {
    const h = 12
    const m = t[1]
    const d = 'am'
    return `${h}:${m} ${d}`
  } else {
    const h = (t[0] % 12) === 0 ? `0${t}` : (t[0] % 12)
    const m = t[1]
    const d = (t[0] < 12) ? 'am' : 'pm'
    return `${h}:${m} ${d}`
  }
}

// getUserEvents Success
const onGetUserEventsSuccess = function (res) {
  $('#event-owner').html(`<p>${store.user.firstName}  ${store.user.lastName}'s Events</p>`)
  let eventsHTML = ''
  if (res.event.length === 0) {
    eventsHTML += '<div class="col-12">You do not have any events scheduled currently!</div>'
  } else {
    for (let i = 0; i < res.event.length; i++) {
      // const date = new Date(res.event[i].startDate)
      const startTime = formatTime(res.event[i].startTime)
      const endTime = formatTime(res.event[i].endTime)
      eventsHTML += `
        <div class="col-12 events eventName"><h6>${res.event[i].eventName}</h6></div>
        <div class="col-12 events">${res.event[i].eventNotes}</div>
        <div class="col-12 events">${res.event[i].startDate}</div>
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
const onGetUserEventsFailure = function (err) {
  console.log('Failed to get users events', err)
}

const onDeleteEventFailure = function () {
  $('#display-events-result').html('Action Failed - Please try again in a few minutes!')
}

const onEditEventGetDetailsSuccess = function (res) {
  uiManager.resetForms()
  $('#edit-event-name').val(res.event.eventName)
  $('#event-id').val(res.event._id)
  $('#edit-event-notes').val(res.event.eventNotes)
  $('#edit-start-date').val(res.event.startDate)
  $('#edit-start-time').val(res.event.startTime)
  $('#edit-end-time').val(res.event.endTime)
  uiManager.views(false, false, false, false, false, true, true, true)
}

const onEditEventGetDetailsFailure = function () {
  uiManager.resetForms()
  $('#display-events-result').html('Action Failed - Please try again in a few minutes!')
}

const onEditEventFailure = function () {
  $('#edit-event-result').html('Action Failed - Please try again in a few minutes!')
}

module.exports = {
  onLoginSuccess: onLoginSuccess,
  onLoginFailure: onLoginFailure,
  onRegisterSuccess: onRegisterSuccess,
  onRegisterFailure: onRegisterFailure,
  onLogoutSuccess: onLogoutSuccess,
  onLogoutFailure: onLogoutFailure,
  onCreateEventSuccess: onCreateEventSuccess,
  onCreateEventFailure: onCreateEventFailure,
  onGetUserEventsSuccess: onGetUserEventsSuccess,
  onGetUserEventsFailure: onGetUserEventsFailure,
  // clearForms: clearForms,
  onChangePasswordFailure: onChangePasswordFailure,
  onChangePasswordSuccess: onChangePasswordSuccess,
  onDeleteEventFailure: onDeleteEventFailure,
  onEditEventGetDetailsSuccess: onEditEventGetDetailsSuccess,
  onEditEventGetDetailsFailure: onEditEventGetDetailsFailure,
  onEditEventFailure: onEditEventFailure
}
