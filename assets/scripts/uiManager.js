'use strict'

const resetForms = function () {
  $('#change-password-form').trigger('reset')
  $('#login-form').trigger('reset')
  $('#register-form').trigger('reset')
  $('#create-event-form').trigger('reset')
  resetHTML()
}

const resetHTML = function () {
  $('#registration-result').html('')
  $('#login-result').html('')
  $('#change-password-result').html('')
  $('#api-failure').html('')
}

const views = function (changepw, login, register, createEvent, showEvents) {
  if (changepw) {
    $('#change-password-form').show()
  } else {
    $('#change-password-form').hide()
  }

  if (login) {
    $('#login-form').show()
  } else {
    $('#login-form').hide()
  }

  if (register) {
    $('#register-form').show()
  } else {
    $('#register-form').hide()
  }

  if (createEvent) {
    $('#create-event-form').show()
  } else {
    $('#create-event-form').hide()
  }

  if (showEvents) {
    $('#show-events-section').show()
  } else {
    $('#show-events-section').hide()
  }

  resetForms()
  $('#api-failure').html('')
}

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

module.exports = {
  resetForms: resetForms,
  resetHTML: resetHTML,
  views: views
}
