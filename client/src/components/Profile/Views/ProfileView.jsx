import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, ButtonGroup, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserView from './UserView.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  search: {
    padding: 10,
  },
}));


const ProfileView = ({ user, updateUser }) => {
  const [view, setView] = useState('');
  const classes = useStyles();
  const [userID, setUserID] = useState();
  const [bookData, setBookData] = useState([]);

  const bookDataArr = [];
  console.log(user, 'user from profile view - outside of use effect');

  useEffect(() => {
    console.log(user, 'user from profile view');
    setUserID(user.id);
    const params = {
      userID,
    };
    axios.get('/readr/haveread', { params })
      .then(({ data }) => {
        data.forEach((book) => {
          bookDataArr.push({
            title: book.title,
            author: book.author,
            coverURL: book.coverURL,
            description: book.description,
            isbn: book.isbn,
            review: 'INSERT REVIEW HERE',
          });
          setBookData(bookDataArr);
        });
      });
  }, [userID]);


  const renderview = () => (
    <div>
      {bookData.map((book) => (
        <UserView user={user} book={book} />
      ))}
    </div>
  );

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.paper}
      style={{ width: '500px' }}
    >
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.search}
      >
        {renderview()}
      </Grid>
    </Grid>
  );
};

export default ProfileView;
