/* Renders the list of either the "to-Read" or "not-interested" books.
 * Here we map over the users collection retrieved from the database and render a BookListItem.
 * A user can sort their list by date added or genre.
 */
import React from 'react';
import axios from 'axios';
import { Typography, CircularProgress } from '@material-ui/core';
import BookListItem from './BookListItem.jsx';

class BookListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: null,
    };

    this.getUserBookList = this.getUserBookList.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  componentDidMount() {
    this.getUserBookList();
  }

  // Request to server to get a new book suggestion
  getUserBookList() {
    const { user } = this.props;
    return axios.post('/readr/booklist', {
      userID: user.id,
      toRead: true,
    })
      .then((books) => {
        this.setState({ bookList: books.data });
      })
      .catch((error) => console.log(error));
  }

  handleRemoveClick(isbn, toUpdate) {
    const { user } = this.props;
    return axios.patch('/readr/interest', {
      userID: user.id,
      isbn,
      toUpdate,
    }).then(() => {
      // reset the state so removed book is not shown
      this.getUserBookList();
    })
      .catch((error) => console.log(error));
  }

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
            <Typography variant="button">Your To-Read List:</Typography>
            {Object.keys(bookList).map((book) => (
              <BookListItem book={bookList[book]} handleRemoveClick={this.handleRemoveClick} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default BookListView;
