/* Page where the users of our app can login with their google credentials.
*/
import React from 'react';
import { Button, Box, Typography } from '@material-ui/core';

const Login = () => (
  <div>
    <Box mx="auto" m={4}>
      <Typography variant="h6" align="center"> Welcome to Readr!</Typography>
      <Typography variant="body1" align="center">We are a personalized open souce book suggestion app!</Typography>
    </Box>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      onClick={() => window.open('/auth/google', '_self')}
    >
      Sign In with Google
    </Button>
  </div>
);

export default Login;
