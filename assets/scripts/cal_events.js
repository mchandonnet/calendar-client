'use strict'

const api = require('./api')
const ui = require('./ui')
const store = ('require')

const getUserEvents = function () {
  api.apiCall('/events', 'GET', '{}', true)
  // handle SUCCESSFUL response
    .then(ui.onGetUserEventsSuccess)
  // handle ERROR response
    .catch(ui.onGetUserEventsFailure)
}

module.exports = {
  getUserEvents
}
