import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid, TextField, Button, Typography,
} from '@material-ui/core';

// import Followers from './Followers.jsx';


const AddFriend = ({ user }) => {
  const [friend, setFriend] = useState('');
  const [friendsList, setFriendsList] = useState([]);
  const [followersList, setFollowersList] = useState([]);

  const history = useHistory();

  useEffect(() => {
    Axios.get('readr/getFriends', { user })
      .then(({ data }) => {
        setFriendsList(data);
      });
    Axios.get('/readr/getFollowers', { user })
      .then(({ data }) => {
        console.log(data, 'data from followers');
        setFollowersList(data);
      });
  }, []);


  const handleSubmit = () => {
    Axios.post('/readr/addFriend', { user, friend })
      .then(({ data }) => {
        // history.push('/preferences', { user: data });
      })
      .catch((error) => {
        window.alert('Username not found!');
        console.error(error);
      });
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ padding: '10px', width: '500px' }}
    >
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ padding: '10px' }}
      >
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ padding: '10px' }}
        >
          <Grid item container direction="column">
            <TextField id="standard-basic" label="Search for friend here" onChange={(e) => setFriend(e.target.value)} />
          </Grid>
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Button
              color="primary"
              variant="outlined"
              style={{ width: '50px', marginTop: '10px' }}
              onClick={() => { handleSubmit(); onSubmit(); }}
            >
                Search
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item container xs direction="column" style={{ padding: '20px' }}>
          <Grid item container direction="row">
            <Typography variant="subtitle1">
                You are Friends with:
            </Typography>
          </Grid>
          <Grid item container direction="row">
            {friendsList.map((flFriend) => (
              <Grid item container direction="row" style={{ padding: '5px' }}>
                {flFriend.name}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item container xs direction="column" style={{ padding: '20px' }}>
          <Grid item container direction="row">
            <Typography variant="subtitle1">
               Followers
            </Typography>
          </Grid>
          <Grid item container direction="row">
            {followersList.map((flFollower) => (
              <Grid item container direction="row" style={{ padding: '5px' }}>
                {flFollower.name}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddFriend;
