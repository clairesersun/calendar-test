require('dotenv').config(); 
//use following when building app
//if (process.env.NODE_ENV !== 'production') { 
//       require('dotenv').config(); 
// } 
const clientID = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const refreshToken = process.env.REFRESH_TOKEN

const {google} = require('googleapis')

const { OAuth2 } = google.auth

const oAuth2Client = new OAuth2(clientID, clientSecret)


oAuth2Client.setCredentials({refresh_token: refreshToken})


const calendar = google.calendar({version: 'v3', auth: oAuth2Client})

//This information will be recieved from a form
const eventStartTime = new Date()
// eventStartTime.setDate(eventStartTime.getDay() + 2)
//This information will be recieved from a form
const eventEndTime = new Date()
// eventEndTime.setDate(eventEndTime.getDay() + 2)
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

// console.log(eventStartTime)

const event = {
    //like the title
    summary: 'Meeting w Marrissa',
    location: null,
    description: 'Meeting w Marissa to discuss the Personal Training Plan.',
    start: {
        dateTime: eventStartTime,
        timeZone: 'America/New_York',

    },
    end: {
        dateTime: eventEndTime,
        timeZone: 'America/New_York',

    },
    colorId: 7,
    //tried the following...
    attendees: 
    // you will need to run a check to ensure this is a correct email address as per https://datatracker.ietf.org/doc/html/rfc5322#section-3.4
        [
            //this will be the entered address
            {email: 'claire.sersun@gmail.com',
        responseStatus: 'needsAction'
    },
    //this will be the business owners address
    {email: 'readersheart@gmail.com',
        responseStatus: 'accepted',
        self: true
    }
],
conferenceData: {
        createRequest: {
            conferenceSolutionKey: {type: 'hangoutsMeet'},
            requestId: "some_random_string"
            }
                
            }



}


//database with schedule, whne its hit check if there is open time, reserve time slot, then send event in calendar <- this ensures no one is booking at the same time
//once someone books it must remove said date from calendar of available times

// console.log(event)

calendar.events.insert({calendarId: 'primary', resource: event, conferenceDataVersion: 1}, err => {
    if (err) return console.error("Calendar Event Creation Error: ", err)
    return console.log("Calendar Event Created.")
})


//TO DO: Add a visual element that takes in information via a form and adds to calendar
//this is prob gonna be a html form that when utilized, it send the given data