/* Page where the users of our app can login with their google credentials.
*/
import React from 'react';
import {
  AppBar,
  Box,
  Typography,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
} from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Link } from 'react-router-dom';
import LoginBookView from './LoginBookView.jsx';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: 'white',
  },
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
    textDecoration: 'none',
  },
}));

const Login = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/login"
          >
            <MenuBookIcon />
          </IconButton>
          <Typography
            variant="h4"
            className={classes.title}
            component={Link}
            to="/login"
          >
            Readr 2.0
          </Typography>
          <Button
            type="submit"
            // fullWidth
            variant="contained"
            // color="secondary"
            onClick={() => window.open('/auth/google', '_self')}
          >
            Sign In with Google
          </Button>
        </Toolbar>
      </AppBar>
      <Box mx="auto" m={9}>
        <Typography variant="h6" align="center"> Welcome to Readr!</Typography>
        <Typography variant="body1" align="center">Sign in to get personalized book suggestions!</Typography>
      </Box>
      <LoginBookView />
    </div>
  );
};

export default Login;
