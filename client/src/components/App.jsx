import React from 'react';
import axios from 'axios';
import { Container, Typography } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import Login from './Login.jsx';
import NavBar from './NavBar.jsx';
import SuggestionView from './SuggestionView.jsx';
import BookListView from './BookListView.jsx';
import ReaderView from './ReaderView.jsx';
import FollowingView from './FollowingView.jsx';
import Landing from './Landing.jsx';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#ff4400' },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: null,
    };
  }

  /* Sends request to server to get a book suggestion from google books API.
  * If the book suggestion is already in the logged in user's
  * "yes" or "no" list, resend the getBookSuggestion request.
  * We could also do this server side, by getting the response and checking
  * the user's database. Send back the first item in the Query to Googls API
  * */

  componentDidMount() {
    axios.get('/auth/user').then((response) => {
      // console.log(response.data);
      if (response.data.user) {
        console.log('THERE IS A USER');
        this.setState({
          isLoggedIn: true,
          user: response.data.user,
        });
      } else {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      }
    });
  }

  render() {
    const { isLoggedIn, user, userBookList } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          {/* this container centers content on the page. Width is inherited by the rest of app. */}
          <Container component="main" maxWidth="sm">
            <br />
            <Typography variant="h2" align="center"> Readr </Typography>
            <br />
            <br />
            <div>
              {isLoggedIn === false ? (<Login />) : null }
            </div>
            {/* conditional rendering of the components based on if the user is logged in */}
            {isLoggedIn ? (
              <div>
                <header>
                  <NavBar user={user} />
                </header>
                <br />
                <Switch>
                  {/* // this is our default route */}
                  <Route exact path="/" component={Landing} />
                  <Route
                    exact
                    path="/suggestion"
                    render={(props) => (
                      <SuggestionView {...props} user={user} />)}
                  />
                  <Route exact path="/following" component={FollowingView} />
                  {/* HOW TO PASS PROPS IN REACT ROUTE v4. ESLINT DISLIKES IT */}
                  <Route exact path="/booklist" render={(props) => <BookListView {...props} user={user} />} />
                  <Route exact path="/readnow" component={ReaderView} />
                </Switch>
              </div>
            ) : null }
          </Container>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
