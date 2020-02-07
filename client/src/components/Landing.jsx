import React from 'react';
import { Typography, Box } from '@material-ui/core';


function Landing() {
  return (
    <div>
      <Box m={1} mx="auto">
        <Typography variant="body1" align="center">
         To get started, click the Explore Books link and we&apos;ll do the rest!
        </Typography>
      </Box>
    </div>
  );
}

export default Landing;
