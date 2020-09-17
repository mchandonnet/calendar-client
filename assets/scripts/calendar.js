'use strict'

// get the first day of the month, and the day that it occurs on
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// create a default date String for which calendar to show first (the current month)
const today = new Date()
const defaultMonth = months[today.getMonth()]
const defaultYear = today.getFullYear()
const defaultDate = `${defaultMonth} 1, ${defaultYear}`
let showCalendar = defaultDate

// get the day of the week for the first day of a given month 
const getFirstDay = function (showMonth) {
  return showMonth.getDay()
}

const changeCalendar = function (month, year) {
  buildCalendar(month, year)
}

const buildCalendar = function (month, year) {
  // create a variable to store the html data...  and start with an empty value to clear it with each function call
  let calHTML = ''

  // define the next and previous months for buttons...start by getting the index of the current month
  const thisMonth = months.indexOf(month)
  const nextMonth = months[thisMonth + 1]
  const prevMonth = months[thisMonth - 1]
  console.log(thisMonth)
  console.log(nextMonth)
  console.log(prevMonth)

  // build a date object to use a reference for the month we are displaying then get the first day of the month
  // we can't use date methods unles it's a data object
  const showMonth = new Date(`${month} 1, ${year}`)
  const firstDay = getFirstDay(showMonth)

  // figure out how many days are in that month
  // in Javascript, when we call new Data and give a 0 as the third parameter
  // we are actually getting back to last day of the previous month...
  // so, the month we want + 1
  // new Date(our date string, date.getMonth() + 1, 0).getDate();  
  const daysInMonth = new Date(showMonth.getFullYear(), showMonth.getMonth() + 1, 0).getDate()

  // create a counter variable to know when to stop adding to the calendar
  // start at 1, and increment each time we add a day to the calendar, when
  // date > number of days in the month, break the loop
  let date = 1

  // Not set up for jQuery??
  // $('#calendar-days').html('This is a test')
  document.querySelector('#month-text').innerHTML = month
  document.querySelector('#previous-month-button').addEventListener('click', function () {
    changeCalendar(prevMonth, '2020')
  })
  document.querySelector('#next-month-button').addEventListener('click', function () {
    changeCalendar(nextMonth, '2020')
  })

  // Create the Rows of the TABLE.. a calendar can never have more than 6 rows (weeks)
  for (let i = 0; i <= 5; i++) {

    // create a table row
    calHTML += '<tr>'
    // now we need to create the cells of the table...
    // each row can have a max of 7 columns
    for (let j = 0; j <= 6; j++) {
      // this creates the empty cells at the beginning of the month
      if (i === 0 && j < firstDay) {
        calHTML += '<td class="weekday"></td>'

        // if the current date (counting from 0) is GT the number of days in the month... BREAK the LOOP
      } else if (date > daysInMonth) {
        break
      // otherwise, create a new table cell
      } else {
        calHTML += `<td class="weekday">${date}</td>`
        date++
      }
    }

    calHTML += '</tr>'
  }

  // Not set up for jQuery??
  // $('#calendar-days').html('This is a test')
  document.querySelector('#calendar-days').innerHTML = calHTML

}

module.exports = {
  buildCalendar: buildCalendar
}
