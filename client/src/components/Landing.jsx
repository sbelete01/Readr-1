import React from 'react';
import { Grid, Box } from '@material-ui/core';
import SelectGenre from './Preference.jsx';

function Landing({ user }) {
  return (
    <Box m={1} mx="auto">
      <Grid justify="center">
        <SelectGenre user={user} />
      </Grid>
    </Box>
  );
}

export default Landing;
