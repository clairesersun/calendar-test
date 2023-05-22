export default function handler(req, res) {
      if (req.method === 'POST')
          return create(req, res)
        else{
            return res.status(404).end()
}
            
      }
  
        
async function create(req, res) {
    
    const {summary, description, attendees, eventStartTime, eventEndTime} = req.body
    try {
        const clientID = process.env.REACT_APP_CLIENT_ID
const clientSecret = process.env.REACT_APP_CLIENT_SECRET
const refreshToken = process.env.REACT_APP_REFRESH_TOKEN

const { google } = require('googleapis')

const { OAuth2 } = google.auth

const oAuth2Client = new OAuth2(clientID, clientSecret)


oAuth2Client.setCredentials({refresh_token: refreshToken})


const calendar = google.calendar({version: 'v3', auth: oAuth2Client})

const event = {
    //like the title
    summary: summary,
    location: null,
    description: description,
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
            {email: attendees,
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

        const {
            summary: _,
            ...otherFields
          } =  calendar.events.insert({calendarId: 'primary', resource: event, conferenceDataVersion: 1}, err => {
                if (err) return console.error("Calendar Event Creation Error: ", err)})
                req.session.user = otherFields
                return console.log("Calendar Event Created.")
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}
    