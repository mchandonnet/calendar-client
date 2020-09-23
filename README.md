<img src=https://user-images.githubusercontent.com/21346239/91862876-7bf3f580-ec3c-11ea-94d6-5236f3867a9c.png width="168" height="168">
M. Chandonnet // GA - SEI // Project #2 // Calendar Client

# Calendar

A basic User Calendar ( [Click HERE for API](https://github.com/mchandonnet/calendar_api) )
1. If Required, register a new user
2. Login to the Calendar
3. Add Events by selecting a date from the calendar and using the "Create Event" link
4. View your schedule either by a specific day, or all events


## Technologies Used

This project was buillt using: HTML5, CSS, SCSS, Bootstrap, Javascript, jQuery, Ajax


## Planning

Initial planning involved a Review of the the scoping and requirets documentation.  This information was used to build user stories and wireframes to create a visual representation of that application.

Devlopment started with creating a basic HTML shell laying out the basic views of the app, including a calendar.  Once the layout was complete, the focus moved to the user side of the application - User creation, user Login, and Password Changes.  Then it was on to calendar views and working to configure different event listeners and event handlers to enable the daily calendar view and the all events calendar view.  Then on to forms for creation, deletion, and modification of events...  a little more cleanup of HTML and SaSS to make things look a little better, and lots and lots of testing to find and fix minor bugs, validate that all requirements were being met.


##### The following files were created and used in this project

+ ./index.html: HTML page - presents the UI to the user

+ ./assets/styles/index.scss: CSS / SaSS - formats the HTML

+ ./assets/scripts/api.js: JavaScript file that makes calls to the API for collecting and updating data

+ ./assets/scripts/app.js: JavaScript file that creates onClick events for the HTML page

+ ./assets/scripts/calendar.js: JavaScript file that manages the display of the calendar

+ ./assets/scripts/config.js: JavaScript file that is used for defining URL strings for the API calls

+ ./assets/scripts/events.js: JavaScript file that contains Event handlers - called from app.js

+ ./assets/scripts/store.js: JavaScript file that stores variables that are needed globally

+ ./assets/scripts/ui.js: JavaScript file that handles promise functions for API calls

+ ./assets/scripts/uiManager.js: JavaScript file that handles functions for managing the UI - Showing and hiding forms, showing and clearing HTML Warnings, etc..


## Unsolved Problems

There are a few additional features that I'd like to add, but as far as the technical requirements, I think (hope) that i got them all...


## Additional Features in the works...

+ View events by month
+ Highlight the selected date on the calendar
+ share calendars among users
+ User Selected colors
+ add a defined list of holidays with a single click


#### Wireframes

![wireframe](https://user-images.githubusercontent.com/21346239/93946026-2f18b180-fd06-11ea-80f9-9f7b20170287.png)


#### User Stories

+ Users can create a new account / sign-up
+ Existing users can change their password
+ Existing users can log in
+ Logged in users can log out
+ Users can view existing events
+ Users can create new events
+ Users can delete existing events (their own)