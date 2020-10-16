import React, { useState, useEffect } from 'react';
import {
  TextField, Grid, Button, Typography,
} from '@material-ui/core';
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


const BookClub = ({ user }) => {
  const classes = useStyles();
  const [startDate, setStart] = useState('');
  const [endDate, setEnd] = useState('');
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');

  const { gapi } = window;
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

  // create email variable to house all user emails that i follow


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
            summary: `${title}`,
            location: 'Your computer',
            description: `Meet here by clicking: ${link}!`,
            sendUpdates: 'all',
            start: {
              date: `${startDate}`,
              timeZone: 'America/Chicago',
            },
            end: {
              date: `${endDate}`,
              timeZone: 'America/Chicago',
            },
            recurrence: [
              'RRULE:FREQ=MONTHLY;COUNT=10;BYDAY=1FR',
            ],
            attendees: [
              { email: 'larryschwall@gmail.com' },
            ],
            reminders: {
              useDefault: true,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
              ],
            },
          };

          const request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
            sendNotifications: true,
          });
          request.execute((event) => {
            window.open(event.htmlLink);
          });
        });
    });
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item container direction="column">
          {/* THIS IS THE 1st ROW */}
          <Grid item container direction="row">
            <Grid item container xs direction="column" className={classes.test}>
              <TextField
                label="Book Title"
                onChange={(e) => {
                  console.log(bookDataArr);
                  setTitle(e.target.value);
                }}
              />
              <TextField label="Hangout Link" placeholder="Paste Hangout link here" onChange={(e) => setLink(e.target.value)} />
              <Typography variant="subtitle2">
              Get your hangout link here: <a href="https://hangouts.google.com/" target="_blank">https://hangouts.google.com/</a>
              </Typography>
            </Grid>
            <Grid item container xs direction="column" className={classes.test}>
            Who to invite
            </Grid>
            <Grid item container xs direction="column" className={classes.test}>
              <TextField
                id="date"
                label="Start Date"
                type="date"
                defaultValue={new Date().toISOString()}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setStart(e.target.value);
                }}
              />
              <TextField
                id="date"
                label="End Date"
                type="date"
                defaultValue={new Date().toISOString()}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setEnd(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          {/* THIS IS THE 2nd ROW */}
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.buttontest}
          >
            <Button variant="outlined" color="primary" onClick={addToCalendar}>
              Preview REMINDER
            </Button>
          </Grid>
        </Grid>

      </Grid>
    </div>
  );
};

export default BookClub;
