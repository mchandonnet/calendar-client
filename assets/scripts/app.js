'use strict'

// require the calendar, uiManager and events files
const events = require('./events')
const uiManager = require('./uiManager')
const calendar = require('./calendar')
const store = require('./store')

// defining variables for building the initial calendar
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const today = new Date()
const currentMonth = months[today.getMonth()]
const currentYear = today.getFullYear()

$(() => {
  // create event listener for form submissions
  // login
  $('#login-form').on('submit', events.onSignIn)
  // registration
  $('#register-form').on('submit', events.onRegisterUser)
  // change password
  $('#change-password-form').on('submit', events.onChangePassword)
  // create event
  $('#create-event-form').on('submit', events.onCreateEvent)
  // edit event
  $('#edit-event-form').on('submit', events.onEditEvent)

  // Event listener to toggle the register and login function based on user request
  // (changepw, login, register, createEvent, showEvents, editEvent, footer, nav)
  // uiManager.views(false, false, false, false, false, false, false, false)

  // click register user from the login page
  $('#anchor-register-user').on('click', function () {
    uiManager.resetForms(true)
    uiManager.views(false, false, true, false, false, false, false, false)
  })

  // click the login from the registration form
  $('#anchor-login').on('click', function () {
    uiManager.resetForms(true)
    uiManager.views(false, true, false, false, false, false, false, false)
    $('#navigation').hide()
  })

  // click change password from the navigation
  $('#anchor-change-pw-form').on('click', function () {
    uiManager.resetForms(true)
    uiManager.views(true, false, false, false, false, false, true, true)
  })

  // click the logout link from the navigation
  $('#anchor-logout').on('click', events.onLogout)

  // click create a new event from the event list form
  $('#btn-create-event').on('click', function () {
    // events.getUserEvents()
    uiManager.resetForms(true)
    uiManager.views(false, false, false, true, false, false, true, true)
    $('#create-start-date').val(store.user.LDC)
  })

  // click show all events from the calendar footer
  $('#anchor-show-events').on('click', function () {
    uiManager.resetForms(true)
    uiManager.views(false, false, false, false, true, false, true, true)
    events.getUserEvents('all')
  })

  // click return to events from the create event form
  $('.anchor-event-list').on('click', function () {
    uiManager.resetForms(true)
    uiManager.views(false, false, false, false, true, false, true, true)
    events.getUserEvents(store.user.LDC)
  })

  // edit and delete buttons for users events
  $('#user-events').on('click', '#event-edit', events.editEventGetDetails)
  $('#user-events').on('click', '#event-delete', events.deleteEvent)

  $('#calendar-days').on('click', '#selectDate', function (event) {
    events.getUserEvents(event.target.dataset.valueIndex)
  })

  // event listener for clearing the failed log message
  $('#login-password').on('click', function () {
    $('#login-result').html('')
  })

  // build and display the calendar on page load!
  calendar.buildCalendar(currentMonth, currentYear)
})
