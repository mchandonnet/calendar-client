'use strict'

const events = require('./events')

// defining variables for building the initial calendar
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const today = new Date()
const currentMonth = months[today.getMonth()]
const currentYear = today.getFullYear()

// require the calendar file
const calendar = require('./calendar')

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
  // (cha, login, reg, small, tic)
  // events.views(false, false, false, false, false, login)
  $('#anchor-register-user').on('click', function () {
    events.resetHTML()
    events.resetForms()
    events.views(false, false, true, false, false)
  })

  $('#anchor-login').on('click', function () {
    events.resetHTML()
    events.resetForms()
    events.views(false, true, false, false, false)
    $('#navigation').hide()
  })

  // Events listeners to toggle between game page and change password page
  $('#btn-change-password').on('click', function () {
    events.resetHTML()
    events.resetForms()
    events.views(true, false, false, false, false)
  })

  // build and display the calendar on page load!
  calendar.buildCalendar(currentMonth, currentYear)
})
