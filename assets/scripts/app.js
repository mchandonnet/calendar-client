'use strict'

const events = require('./events')

// const today = new Date()
// const currentMonth = today.getMonth() + 1
// const currentYear = today.getFullYear()

// const calendar = require('./calendar')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // create event handlers for form submissions
  $('#login-form').on('submit', events.onSignIn)

  // build and display the calendar on page load!
  // calendar.buildCalendar(currentMonth, currentYear)
})
