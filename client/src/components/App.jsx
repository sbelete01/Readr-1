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
import Preference from './Preference.jsx';
import ProfileView from './Profile/Views/ProfileView.jsx';
import AddFriend from './AddFriend.jsx';


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
      urlSnippet: 'shakespearescom000shak',
    };
    this.updateUrlSnippet = this.updateUrlSnippet.bind(this);
  }

  /* Sends request to server to get a book suggestion from google books API.
  * If the book suggestion is already in the logged in user's
  * "yes" or "no" list, resend the getBookSuggestion request.
  * We could also do this server side, by getting the response and checking
  * the user's database. Send back the first item in the Query to Googls API
  * */

  componentDidMount() {
    axios.get('/auth/user').then((response) => {
      if (response.data.user) {
        console.log(response.data.user);
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

  updateUrlSnippet(urlSnippet) {
    this.setState({ urlSnippet });
  }

  render() {
    const {
      isLoggedIn, user, userBookList, urlSnippet,
    } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          {/* this container centers content on the page. Width is inherited by the rest of app. */}
          <Container component="main" maxWidth="lg">
            <div>
              {isLoggedIn === false ? (<Login />) : null }
            </div>
            {/* conditional rendering of the components based on if the user is logged in */}
            {isLoggedIn ? (
              <div>
                <NavBar user={user} />
                <div className="mainViews">
                  <Switch>
                    {/* // this is our default route */}
                    <Route
                      exact
                      path="/"
                      render={(props) => (
                        <Landing {...props} user={user} />
                      )}
                    />
                    <Route
                      exact
                      path="/suggestion"
                      render={(props) => (
                        <SuggestionView {...props} user={user} />)}
                    />
                    <Route exact path="/following" component={FollowingView} />
                    {/* HOW TO PASS PROPS IN REACT ROUTE v4. ESLINT DISLIKES IT */}
                    <Route exact path="/booklist" render={(props) => <BookListView {...props} user={user} updateUrlSnippet={this.updateUrlSnippet} />} />
                    <Route exact path="/readnow" render={(props) => <ReaderView {...props} urlSnippet={urlSnippet} />} />
                    <Route exact path="/preferences" component={Preference} />
                    <Route exact path="/addFriend" render={(props) => <AddFriend {...props} user={user} />} />
                  </Switch>
                </div>
              </div>
            ) : null }
          </Container>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
