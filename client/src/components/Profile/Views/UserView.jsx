import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Paper, Typography, ButtonBase,
} from '@material-ui/core';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import InfoCardList from '../User/InfoCardListUser.jsx';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
  item: {
    // padding: '10px',
    textAlign: 'center',
  },
  follow: {
    padding: '10px',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));


const UserView = ({ user, book }) => {
  const classes = useStyles();

  return (
    <div className={classes.roots}>
      <Paper className={classes.paper} elevation={3}>
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid
            item
            container
            className={classes.follow}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              container
              direction="row"
              className={classes.item}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Typography variant="subtitle1">
                {user.chosenName}
              </Typography>
            </Grid>
            <Grid
              className={classes.item}
              direction="row"
              justify="center"
              alignItems="center"
              item
              container
              direction="row"
            >
              <Typography variant="caption" color="textSecondary">
                @{user.chosenName}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.item}
          >
            <Grid item xs container direction="column" spacing={2} className={classes.item}>
              <Grid item container direction="row" className={classes.item}>
                <Grid
                  item
                  xs
                  className={classes.item}
                  justify="center"
                  alignItems="center"
                >
                  <Grid
                    className={classes.item}
                    justify="center"
                    alignItems="center"
                    item
                    container
                    direction="row"
                  >
                    <Typography variant="caption" color="textSecondary">
                    Followers
                    </Typography>
                  </Grid>
                  <Grid
                    className={classes.item}
                    justify="center"
                    alignItems="center"
                    item
                    container
                    direction="row"
                  >
                    <Typography variant="caption" color="textSecondary">
                    6000
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs
                  className={classes.item}
                  justify="center"
                  alignItems="center"
                >
                  <Grid
                    className={classes.item}
                    justify="center"
                    alignItems="center"
                    item
                    container
                    direction="row"
                  >
                    <Typography variant="caption" color="textSecondary">
                    Following
                    </Typography>
                  </Grid>
                  <Grid
                    className={classes.item}
                    justify="center"
                    alignItems="center"
                    item
                    container
                    direction="row"
                  >
                    <Typography variant="caption" color="textSecondary">
                    25
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: '10px' }}>
            <InfoCardList book={book} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default UserView;
