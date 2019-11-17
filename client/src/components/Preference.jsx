import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Checkbox, Grid } from '@material-ui/core';
import ResetPreferences from './ResetPreferences.jsx';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },

  button: {
    margin: theme.spacing(1),
  },

  input: {
    display: 'none',
  },
}));

export default function SelectGenre(props) {
  let history = useHistory();
  const { user } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    comedy: false,
    thriller: false,
    fantasy: false,
    romance: false,
  });
  const [quizzed, setQuizzed] = React.useState(false);

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleSubmit = () => {
    const preferences = state;
    preferences.user = user;
    axios.post('/readr/preferences', preferences)
      .then(() => {
        history.push('/suggestion');
      })
      .catch(() => {
        history.push('/suggestion');
      });
  };

  const {
    comedy,
    thriller,
    fantasy,
    romance,
  } = state;

  const FirstTime = () => (
    <Grid
      container
      className={classes.root}
      justify="center"
    >
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Pick Interested Genre</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={(
              <Checkbox
                checked={comedy}
                onChange={handleChange('comedy')}
                value="comedy"
              />
            )}
            label="Comedy"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={thriller}
                onChange={handleChange('thriller')}
                value="thriller"
              />
            )}
            label="Thriller"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={fantasy}
                onChange={handleChange('fantasy')}
                value="fantasy"
              />
            )}
            label="Fantasy"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={romance}
                onChange={handleChange('romance')}
                value="romance"
              />
            )}
            label="Romance"
          />
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </FormGroup>
        <FormHelperText>Choose Wisely!</FormHelperText>
      </FormControl>
    </Grid>
  );

  // check if user has taken quiz
  axios.post('/readr/quizzed', { user })
    .then((quizzed) => {
      const wasQuizzed = quizzed.data;
      // if true
      if (wasQuizzed) {
        setQuizzed(true);
      }
    });

  return <div>{quizzed ? <ResetPreferences user={user} /> : <FirstTime />}</div>;
}
