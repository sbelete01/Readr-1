import React from 'react';
import {
  makeStyles,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

// This allows custom styling of the buttons, over-riding the root theme
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: 'white',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Buttons = () => {
  const classes = useStyles();
  return (
    <div>
      <Button
        size="large"
        component={Link}
        to="/suggestion"
        className={classes.button}
      >
        Explore Books
      </Button>
      <Button
        size="large"
        component={Link}
        to="/booklist"
        className={classes.button}
      >
        Reading List
      </Button>

      <Button
        size="large"
        component={Link}
        to="/addFriend"
        className={classes.button}
      >
        Add Friends!
      </Button>
      <Button
        size="large"
        component={Link}
        to="/profile"
        className={classes.button}
      >
        Profile
      </Button>
      <Button
        size="large"
        component={Link}
        to="/bookclubinvite"
        className={classes.button}
      >
        Book Club
      </Button>
      <Button
        size="large"
        href="/auth/logout"
        className={classes.button}
      >
        Logout
      </Button>
    </div>
  );
};

export default Buttons;
