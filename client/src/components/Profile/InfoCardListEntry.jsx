import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Paper, Typography, ButtonBase, ButtonGroup, Button, Modal, Fade,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '100%',
    display: 'flex',
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));


const InfoCardEntry = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column">
              <Grid item>
                <Typography gutterBottom variant="subtitle1">
                  <Paper className={classes.paper}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit aperiam consectetur quibusdam aliquam non deleniti omnis eum doloribus facere, laboriosam officia minus eligendi eaque, iste, ipsa sapiente! Ea, rem odio.
                  </Paper>
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" style={{ cursor: 'pointer' }}>
                  Add a Review
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default InfoCardEntry;
