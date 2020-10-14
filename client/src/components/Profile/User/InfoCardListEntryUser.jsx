import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Paper, Typography, ButtonBase,
  ButtonGroup, Button, TextField, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle,
} from '@material-ui/core';
import { Accordion, Card } from 'react-bootstrap';

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
  dialog: {
    width: '500px',
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


const InfoCardEntry = () => {
  const classes = useStyles();
  const [isClicked, setClicked] = useState(false);
  const [buttonView, setButtonView] = useState();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    isClicked ? setClicked(false) : setClicked(true);
  };

  const renderButtonView = () => {
    if (buttonView === 'submitted') {
      return (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
        >
        See Review
        </Button>
      );
    }
  };
  const string = 'Feed (2002) is a young adult dystopian novel of the cyberpunk subgenre written by M. T. Anderson. The novel focuses on issues such as corporate power, consumerism, information technology, data mining, and environmental decay, with a sometimes sardonic, sometimes somber tone. From the first-person perspective of a teenager, the book takes place in a near-futuristic American culture completely dominated by advertising and corporate exploitation, corresponding to the enormous popularity of internetworking brain implants.';

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="https://i.imgur.com/Sbkselg.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs sm container>
            <Grid item container direction="column">
              <Grid item>
                <Typography gutterBottom variant="subtitle1">
                  <div onClick={handleClick} style={{ textAlign: 'justify' }}>
                    {isClicked ? string : string.substring(0, 250)}
                  </div>
                </Typography>
              </Grid>
              <Grid item container direction="row">
                <ButtonGroup>
                  <div>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleClickOpen}
                    >
                    Add a Review
                    </Button>
                  </div>
                  <div>
                    {renderButtonView()}
                  </div>
                </ButtonGroup>
                <div>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">Leave your Review Here!</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <TextField
                          className={classes.dialog}
                          id="outlined-multiline-static"
                          label="Review"
                          multiline
                          rows={4}
                          variant="outlined"
                        />
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        color="primary"
                      >
                        Close
                      </Button>
                      <Button
                        type="submit"
                        onClick={() => {
                          handleClose();
                          setButtonView('submitted');
                        }}
                        color="primary"
                        autoFocus
                      >
                      Add Review
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>

  );
};

export default InfoCardEntry;
