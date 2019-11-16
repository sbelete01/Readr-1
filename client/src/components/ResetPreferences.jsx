import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

function ResetPreferences({ user }) {
  const history = useHistory();
  const handleReset = () => {
    axios.patch('/readr/reset', user)
      .then(() => {
        history.push('/suggestion');
      });
  };
  return (
    <Button color="primary" onClick={handleReset}>
        Reset
    </Button>
  );
}

export default ResetPreferences;

ResetPreferences.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
