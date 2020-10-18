/* eslint-disable react/prop-types */
/* A single book component from the BookListView.
* Renders a thumbnail image, the title, author, genre, short description, date added.
* buttons to remove from list, move to another list, and read now
*/
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Typography, Grid, Paper, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';

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
    width: 300,
    height: 250,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function BookListItem(props) {
  const classes = useStyles();
  const {
    book, handleRemoveClick, handleReadNow, handleAddToReadList,
  } = props;
  const availabilityCheck = (book) => {
    switch (book.availability) {
      case 'open': return (
        <Grid item>
          <Link to="/readnow" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              startIcon={<MenuBookOutlinedIcon />}
              onClick={() => handleReadNow(book.urlSnippet)}
            >
              Read Now
            </Button>
          </Link>
        </Grid>
      );
      case 'borrow_available': return (
        <Grid item>
          <Link to="/readnow" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              startIcon={<MenuBookTwoToneIcon />}
              onClick={() => handleReadNow(book.urlSnippet)}
            > Preview
            </Button>
          </Link>
        </Grid>
      );
      case 'borrow_unavailable': return (
        <Grid item>
          <Link to="/readnow" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              startIcon={<MenuBookTwoToneIcon />}
              onClick={() => handleReadNow(book.urlSnippet)}
            > Preview
            </Button>
          </Link>
        </Grid>
      );
      default: return null;
    }
  };

  const buyNow = (book) => (book.buyLink ? (
    <Grid item>
      <Button
        target="_blank"
        href={book.buyLink}
        variant="contained"
          // color="secondary"
        style={{ color: 'white', backgroundColor: 'blue', boxShadow: '1px 2px 2px #43484d' }}
        size="small"
      >Buy Now
      </Button>
    </Grid>
  )
    : null);


  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item md={5} className={classes.image}>
          <img className={classes.img} alt="complex" src={book.coverURL} />
        </Grid>
        <Grid item md={7}>
          <Typography gutterBottom variant="subtitle1">
            {book.title}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {book.author}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {book.genre}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {availabilityCheck(book)}
        {buyNow(book)}
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={() => handleRemoveClick(book.isbn, false)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            onClick={() => {
              handleAddToReadList(book.isbn, book.coverURL, book.title, book.author, book.description, true);
              handleRemoveClick(book.isbn, false);
            }}
            startIcon
          >
            Finished
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default BookListItem;
