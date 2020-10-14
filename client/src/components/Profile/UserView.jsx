import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Paper, Typography, ButtonBase,
} from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import InfoCardList from './InfoCardList.jsx';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
  item: {
    padding: '10px',
    textAlign: 'center',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));


const UserView = () => {
  const classes = useStyles();

  return (
    <div className={classes.roots}>
      <Paper className={classes.paper}>
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid
            item
            container
            className={classes.item}
            direction="row"
            justify="center"
            alignItems="center"
          >
            Larry
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.item}
          >
            @Larry
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
                Followers
                </Grid>
                <Grid
                  item
                  xs
                  className={classes.item}
                  justify="center"
                  alignItems="center"
                >
                Following
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.item}>
            <InfoCardList />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default UserView;
