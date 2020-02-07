import React from 'react';
import {
  makeStyles,
} from '@material-ui/core';
import Buttons from './Buttons.jsx';


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

const BigBar = () => {
  return (
    <div>
      <Buttons />
    </div>
  );
};

export default BigBar;
