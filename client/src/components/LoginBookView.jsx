/* Renders the books to be shown on login page */

import React from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Grid } from '@material-ui/core';
import LoginBookItem from './LoginBookItem.jsx';
import bookList from '../../top-Rated-Books';

class LoginBookView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList,
    };
    // this.handleReadNow = this.handleReadNow.bind(this);
  }

  // handleReadNow(urlSnippet) {
  //   const { updateUrlSnippet } = this.props;
  //   updateUrlSnippet(urlSnippet);
  //   // recieves urlSnippet from item clicked on
  //   // can pass it to another parent function handler
  // }

  render() {
    const { bookList } = this.state;
    return (
      // map over the userbooklist and render each an bookListItem
      <div>
        {bookList === null ? (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '40%',
              transform: 'translate(-50%, -40%)',
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div>
            <Typography variant="h6" style={{ padding: '7px' }}>Popular on Readr</Typography>
            <Grid container spacing={2}>
              {Object.keys(bookList).map((book, i) => (
                <Grid key={i} item xs={12} sm={12} md={6}>
                  <LoginBookItem
                    book={bookList[book]}
                    key={book.isbn}
                    handleRemoveClick={this.handleRemoveClick}
                    handleReadNow={this.handleReadNow}
                    toggleChecked={this.toggleChecked}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default LoginBookView;
