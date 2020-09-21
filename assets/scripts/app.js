'use strict'

const events = require('./events')
const uiManager = require('./uiManager')

// defining variables for building the initial calendar
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const today = new Date()
const currentMonth = months[today.getMonth()]
const currentYear = today.getFullYear()

// require the calendar file
const calendar = require('./calendar')
// const calEvents = require('./calEvents')

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

  // Event listener to toggle the register and login function based on user request
  // (changepw, login, register, createEvent, showEvents)
  // uiManager.views(false, false, false, false, false)
  $('#anchor-register-user').on('click', function () {
    uiManager.resetHTML()
    uiManager.resetForms()
    uiManager.views(false, false, true, false, false)
  })

  $('#anchor-login').on('click', function () {
    uiManager.resetHTML()
    uiManager.resetForms()
    uiManager.views(false, true, false, false, false)
    $('#navigation').hide()
  })

  // Events listeners to change password
  $('#anchor-change-pw-form').on('click', function () {
    uiManager.resetHTML()
    uiManager.resetForms()
    uiManager.views(true, false, false, false, false)
  })

  // Events listeners to create a new event
  $('#btn-create-event').on('click', function () {
    events.getUserEvents()
    uiManager.resetHTML()
    uiManager.resetForms()
    uiManager.views(false, false, false, true, false)
  })

  // Events listeners to create a new event (from the calendar footer)
  $('#anchor-show-events').on('click', function () {
    console.log('This is a test')
    uiManager.resetHTML()
    uiManager.resetForms()
    uiManager.views(false, false, false, false, true)
    events.getUserEvents()
  })

  // Events listeners to create a new event (from the calendar footer)
  $('#anchor-event-list').on('click', function () {
    uiManager.resetHTML()
    uiManager.resetForms()
    uiManager.views(false, false, false, false, true)
    events.getUserEvents()
  })

  // temp - for testing only!
  // $('#anchor-show-events').on('click', events.getUserEvents)

  // edit and delete buttons for users events
  $('#user-events').on('click', '#event-edit', events.editEvent)
  $('#user-events').on('click', '#event-delete', events.deleteEvent)

  // build and display the calendar on page load!
  calendar.buildCalendar(currentMonth, currentYear)
})
