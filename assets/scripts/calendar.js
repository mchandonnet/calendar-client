'use strict'

// get the first day of the month, and the day that it occurs on
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

let globalMonth
let globalYear

// event listener for getting prev month
$('#previous-month-button').on('click', function () {
  getPrevMonth(globalMonth, globalYear)
})

// event listener for getting next month
$('#next-month-button').on('click', function () {
  getNextMonth(globalMonth, globalYear)
})

const getPrevMonth = function (month, year) {
  const currentDate = new Date(`${month}, 1 ${year}`)
  const currentMonth = months[currentDate.getMonth()]
  const prevMonth = (currentMonth === 'January') ? months[11] : months[currentDate.getMonth() - 1]
  const prevYear = (currentMonth === 'January') ? year - 1 : year
  return buildCalendar(prevMonth, prevYear)
}

const getNextMonth = function (month, year) {
  const currentDate = new Date(`${month}, 1 ${year}`)
  const currentMonth = months[currentDate.getMonth()]
  const nextMonth = (currentMonth === 'December') ? months[0] : months[currentDate.getMonth() + 1]
  const nextYear = (currentMonth === 'December') ? year + 1 : year
  return buildCalendar(nextMonth, nextYear)
}

const buildCalendar = function (month, year) {
  globalMonth = month
  globalYear = year
  // create a variable to store the html data...  and start with an empty value to clear it with each function call
  let calHTML = ''

  // build a date object to use a reference for the month we are displaying then get the first day of the month
  // we can't use date methods unles it's a data object
  const showMonth = new Date(`${month} 1, ${year}`)
  const firstDay = showMonth.getDay()

  // figure out how many days are in that month
  // in Javascript, when we call new Date() and give a 0 as the third parameter
  // we are actually getting back to last day of the previous month...so, the month we want + 1
  // new Date(our date string, date.getMonth() + 1, 0).getDate();
  const daysInMonth = new Date(showMonth.getFullYear(), showMonth.getMonth() + 1, 0).getDate()

  // create a counter variable to know when to stop adding to the calendar
  // start at 1, and increment each time we add a day to the calendar, when
  // date > number of days in the month, break the loop
  let date = 1

  // display the month and year at the top of the calendar
  $('#month-text').html(`${month}, ${year}`)

  // get today's date so that we can try to highlight the date in the calendar...
  const t = new Date()
  const todayM = months[t.getMonth()]
  const todayD = t.getDate()
  const todayY = t.getFullYear()

  // Create the Rows of the TABLE.. a calendar can never have more than 6 rows (weeks)
  for (let i = 0; i <= 5; i++) {
    // create a table row
    calHTML += '<tr>'
    // now we need to create the cells of the table...
    // each row can have a max of 7 columns
    for (let j = 0; j <= 6; j++) {
      // this creates the empty cells at the beginning of the month
      if (i === 0 && j < firstDay) {
        calHTML += '<td class="weekday-empty"></td>'
        // if the current date (counting from 0) is GT the number of days in the month... BREAK the LOOP
      } else if (date > daysInMonth) {
        break
      // otherwise, create a new table cell
      } else {
        if (month === todayM && date === todayD && year === todayY) {
          calHTML += `<td class="weekday today">${date}</td>`
        } else {
          calHTML += `<td class="weekday">${date}</td>`
        }
        date++
      }
    }

    calHTML += '</tr>'
  }

  $('#calendar-days').html(calHTML)
}

module.exports = {
  buildCalendar: buildCalendar
}
