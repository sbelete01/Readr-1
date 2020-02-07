/* This is the header or top bar component.  It is pretty static.
 * Includes navigatin.buttons- App logo Title  2..button to "To-Read" list,
 * 3. "Explore Books" (new book suggestion), 4. Logout button.
 */
import React from 'react';
import {
  AppBar,
  Typography,
  Toolbar,
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
}));

const NavBar = (props) => {
  const classes = useStyles();
  const { username, id } = props.user;
  const firstName = username.split(' ')[0];
  return (
    <div>
      <Typography variant="button" style={{ flex: 1, float: 'left' }}>
        Welcome {firstName}!
      </Typography>
      <Typography variant="body2" style={{ flex: 1, float: 'right' }}>
        Your user ID#: {id}
      </Typography>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography>
            <Button size="large" component={Link} to="/suggestion" className={classes.button}>
              Explore Books
            </Button>
            <Button size="large" component={Link} to="/booklist" className={classes.button}>
              To-Read
            </Button>
            <Button size="large" component={Link} to="/following" className={classes.button}>
              Following
            </Button>
            {/* This directs to passport auth logout */}
            <Button size="large" href="/auth/logout" className={classes.button}>Logout</Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
