import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

const LoadingSuggestion = () => (
  <div>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '60vh' }}
    >
      <Grid item>
        <h3>Finding the perfect book</h3>
      </Grid>
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  </div>
);

export default LoadingSuggestion;
