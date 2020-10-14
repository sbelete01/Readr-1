import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'align-self',
  },

  button: {
    margin: theme.spacing(5),
  },

  input: {
    display: 'none',
  },
}));

function ResetPreferences({ user }) {
  const history = useHistory();
  const classes = useStyles();
  const handleReset = () => {
    axios.patch('/readr/reset', user)
      .then(() => {
        // sending the state lets you access it at next stop through history.location.state.user
        history.push('/preferences', { user });
      });
  };
  return (
    <Grid
      container
      className={classes.root}
      justify="center"
    >
      <Button
        variant="outlined"
        className={classes.button}
        onClick={handleReset}
      >
        Reset Preferences
      </Button>

    </Grid>
  );
}

export default ResetPreferences;

ResetPreferences.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
