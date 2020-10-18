import React, { useState, useEffect } from 'react';
import {
  TextField, Grid, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Divider,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import ClubList from '../Chatroom/ClubList';

// import BookClubAttendee from './bookClubAttendee.jsx';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  test: {
    // border: 'solid 1px green',
    padding: '50px',
  },
  buttontest: {
    margin: '10px 0 10px 0',
  },
  dialog: {
    width: 500,
    height: 200,
    maxHeight: '100%',
    maxWidth: '100%',
  },
}));


const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const BookClub = ({ user }) => {
  const classes = useStyles();
  const [startDate, setStart] = useState('');
  const [endDate, setEnd] = useState('');
  const [friendsList, setFriendsList] = useState([]);
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAlert, setAlertOpen] = useState(false);
  const [openLink, setLinkOpen] = useState(false);

  // const attendeeArr = [email];
  // const emailArr = [];

  const { gapi } = window;
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  const SCOPES = 'https://www.googleapis.com/auth/calendar.events';


  useEffect(() => {
    Axios.get('readr/getFriends', { user })
      .then(({ data }) => {
      // console.log(data, 'friends');
        setFriendsList(data);
      });
    // test
    // const params = {
    //   hangoutLink: 'https://meet.google.com/zqw-okew-osy',
    //   friendsList: ['userone', 'usertwo'],
    //   chosenName: 'abc',
    //   title: 'A Storm of Swords',
    // }
    // Axios.post('readr/clubInvite', { params });
  }, []);

  // THIS IS THE DIALOG FUNCTIONS
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // THIS IS THE LINK FUNCTIONS

  const handleClickLinkOpen = () => {
    setLinkOpen(true);
  };

  const handleLinkClose = () => {
    setLinkOpen(false);
  };

  // THIS IS THE ALERT FUNCTIONS

  const handleAlertClick = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  const renderFollowingView = () => (
    <div>
      {friendsList.map((friend) => (
        <Grid
          className={classes.item}
          justify="center"
          alignItems="center"
          item
          container
          direction="row"
          value={friend.email}
          onClick={() => {
            setEmail(email.concat({ email: friend.email }));
          }}
        >
          <input type="checkbox" id={friend.name} />
          <label htmlFor={friend.name}>{friend.name}</label>
        </Grid>
      ))}
    </div>
  );


  const onSubmit = () => {
    const { chosenName } = user;

    const params = {
      hangoutLink: link,
      friendsList,
      chosenName,
      title,
    };
    Axios.post('/readr/clubInvite', { params })
      .then(({ data }) => {
        console.log(data, 'DATA SEND TO SERVER FOR CLUB INVITE');
      });
  };

  // THIS ADDS EVENT TO YOUR CALENDAR
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
            location: `${link}`,
            description: 'Thanks for coming!',
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
            attendees: email,
            reminders: {
              useDefault: true,
              // overrides: [
              //   { method: 'email', minutes: 24 * 60 },
              //   { method: 'popup', minutes: 10 },
              // ],
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
      <Divider variant="middle" />
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
              <Grid item container direction="row">
                <TextField
                  label="Book Title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Grid>
              <Button
                color="primary"
                variant="outlined"
                style={{ marginTop: '10px' }}
                onClick={handleClickLinkOpen}
              >
                <u>Get Hangout Link Here</u>
              </Button>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid
              item
              container
              xs
              direction="column"
              className={classes.test}
              justify="center"
              alignItems="center"
            >
              <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{ padding: '10px' }}
              >
                Add your followers here!
              </Grid>
              <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                {renderFollowingView()}
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />
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
          <Divider variant="middle" />
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.buttontest}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                handleClickOpen(true);
              }}
            >
              Preview REMINDER
            </Button>
          </Grid>
        </Grid>
        <Grid item container direction="row">
          <ClubList />
        </Grid>
      </Grid>
      {/* MAIN HANGOUT LINK DIALOG */}
      <Dialog
        open={openLink}
        onClose={handleLinkClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Instructions for Google hangout Link</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ol>
              <li>Go to this link: <a href="https://hangouts.google.com/" target="_blank">Hangouts Link</a></li>
              <li>Click on video call</li>
              <li>Click on "copy link to share"</li>
              <li>Place copied link in text field below</li>
            </ol>
            <TextField
              label="Hangout Link"
              placeholder="Paste Hangout link here"
              onChange={(e) => { setLink(e.target.value); }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLinkClose} color="primary">
            Close
          </Button>
          <Button
            onClick={() => {
              handleLinkClose();
              handleAlertClick();
            }}
            color="primary"
            autoFocus
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
      {/* MAIN CONTENT DIALOG */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Invite Preview</DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.dialog}
          >
            {/* <Grid item container direction="row" style={{ padding: '10px' }}>
              to: {email}
            </Grid> */}
            <Grid item container direction="row" style={{ padding: '10px' }}>
              <Typography variant="h5">
              Book title: <u>{title}</u>
              </Typography>
            </Grid>
            <Grid item container direction="row" style={{ padding: '10px' }}>
              Meeting Link: {link}
            </Grid>
            <Grid item container direction="row" style={{ padding: '10px' }}>
              Start Date: {startDate}
            </Grid>
            <Grid item container direction="row" style={{ padding: '10px' }}>
              End Date: {endDate}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" style={{ padding: '10px' }}>
            Close
          </Button>
          <Button
            onClick={() => {
              handleClose();
              addToCalendar();
              onSubmit();
              handleAlertClick();
              setEmail([]);
            }}
            color="primary"
            autoFocus
            style={{ padding: '10px' }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success">
          Success!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BookClub;
