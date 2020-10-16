import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  test: {
    border: 'solid 1px green',
    padding: '50px',
  },
  buttontest: {
    margin: '10px 0 10px 0',
  },
}));

// Refer to the Node.js quickstart on how to setup the environment:
// https://developers.google.com/calendar/quickstart/node
// Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
// stored credentials.


const BookClub = () => {
  const classes = useStyles();
  const empty = {};

  const { gapi } = window;
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  const SCOPES = 'https://www.googleapis.com/auth/calendar.events';
  console.log(process.env.clientID, 'ID');

  const addToCalendar = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client');
      gapi.client.init({
        apiKey: `${process.env.API_KEY}`,
        clientId: `${process.env.clientID}`,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
      gapi.client.load('calendar', 'v3', () => console.log('LOADED CALENDAR'));

      gapi.auth2.getAuthInstance().signIn()
        .then(() => {
          const event = {
            summary: 'this sucks',
            location: '800 Howard St., San Francisco, CA 94103',
            description: 'A chance to hear more about Google\'s developer products.',
            start: {
              dateTime: '2020-10-28T09:00:00-07:00',
              timeZone: 'America/Los_Angeles',
            },
            end: {
              dateTime: '2020-10-28T17:00:00-09:00',
              timeZone: 'America/Los_Angeles',
            },
            recurrence: [
              'RRULE:FREQ=DAILY;COUNT=2',
            ],
            attendees: [
              { email: 'lpage@example.com' },
              { email: 'sbrin@example.com' },
            ],
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
              ],
            },
          };

          const request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
          });
          request.execute((event) => {
            window.open(event.htmlLink);
          });
        });
    });
  };

  return (
    <div>
      <button onClick={addToCalendar}>
        Create calendar event
      </button>
    </div>
  // <Grid
  //   container
  //   direction="row"
  //   justify="center"
  //   alignItems="center"
  // //   className={classes.paper}
  // // style={{ width: '500px' }}
  // >
  //   <Grid item container direction="column">
  //     {/* THIS IS THE 1st ROW */}
  //     <Grid item container direction="row">
  //       <Grid item container xs direction="column" className={classes.test}>
  //           AUTOCOMPLETE FROM FAVORITE BOOK BUTTON
  //       </Grid>
  //       <Grid item container xs direction="column" className={classes.test}>
  //           Who to invite
  //       </Grid>
  //       <Grid item container xs direction="column" className={classes.test}>
  //           Date
  //       </Grid>
  //     </Grid>
  //     {/* THIS IS THE 2nd ROW */}
  //     <Grid
  //       item
  //       container
  //       direction="row"
  //       justify="center"
  //       alignItems="center"
  //       className={classes.buttontest}
  //     >
  //       <Button variant="outlined" color="primary">
  //             Preview REMINDER
  //       </Button>
  //     </Grid>
  //   </Grid>

  // </Grid>

  // <div />
  );
};

export default BookClub;
