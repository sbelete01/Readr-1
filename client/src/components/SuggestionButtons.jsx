import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function SuggestionButtons(props) {
  const classes = useStyles();
  return (
    <div>
      {/* centers the "not interested" and "interested" buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button variant="contained" size="large" color="default" className={classes.button} onClick={() => props.handleNoClick()}>
        Not Interested
        </Button>
        <Button variant="contained" size="large" color="primary" className={classes.button} onClick={() => props.handleYesClick()}>
        Interested
        </Button>
      </div>
      {/* <Button type="submit" variant="contained" fullWidth color="inherit" className={classes.button} onClick={() => props.handleReadNowClick()}>
        Read Now
      </Button> */}
    </div>
  );
}
export default SuggestionButtons;
