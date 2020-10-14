import React, { useState } from 'react';
import { Button, ButtonGroup, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserView from './UserView.jsx';
import ViewerView from './ViewerView.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));


const ProfileView = () => {
  const [view, setView] = useState('');
  const classes = useStyles();

  const renderview = () => {
    if (view === 'user') {
      return <UserView />;
    }
    if (view === 'viewer') {
      return <ViewerView />;
    }
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.paper}
      style={{ width: '500px' }}
    >
      <div>
        <ButtonGroup>
          <Button onClick={() => setView('user')}>
          User view
          </Button>
          <Button onClick={() => setView('viewer')}>
          Viewer View
          </Button>
        </ButtonGroup>
        <div>
          {renderview()}
        </div>
      </div>
    </Grid>
  );
};

export default ProfileView;
