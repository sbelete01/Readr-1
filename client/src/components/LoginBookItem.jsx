/* A single book component from the BookListView.
* Renders a thumbnail image, the title, author, genre, short description, date added.
* buttons to remove from list, move to another list, and read now
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography, Grid, Paper, Button, Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper2: {
    // padding: theme.spacing(2),
    borderRadius: '20px',
    margin: 'auto',
    maxWidth: 500,
  },
  paper: {
    padding: theme.spacing(2),
    // borderRadius: '100px',
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

function LoginBookItem(props) {
  const classes = useStyles();
  const { book, handleReadNow } = props;
  const [checked, setChecked] = useState(false);
  // const [show, setShow] = useState('hide');

  const availabilityCheck = (book) => {
    switch (book.availability) {
      case 'open': return (
        <Link to="/readnow" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            size="small"
            className={classes.button}
            startIcon={<MenuBookOutlinedIcon />}
            onClick={() => handleReadNow(book.urlSnippet)}
          >Read Now
          </Button>
        </Link>
      );
      case 'borrow_available': return (
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
      );
      case 'borrow_unavailable': return (
        <Link to="/readnow" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<MenuBookTwoToneIcon />}
            onClick={() => handleReadNow(book.urlSnippet)}
          > Preview
          </Button>
        </Link>
      );
      default: return 'Sorry, no preview available';
    }
  };

  const buyNow = (book) => {
    return book.buyLink ? (
      <Button
        target="_blank"
        href={book.buyLink}
        variant="contained"
        color="secondary"
        size="small"
      >Buy Now
      </Button>
    )
      : null;
  };

  const toggleCheckedItem = () => {
    setChecked(!checked);
    // setShow(show === 'hide' ? 'block' : 'hide');
  };


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
          <Grid item lg={12} style={{ paddingBottom: '8px', borderRadius: '20px' }}>
            <FormControlLabel
              control={<Switch checked={checked} onChange={toggleCheckedItem} />}
              label="Description"
              labelPlacement="end"
            />
            {/* {buyNow(book)} */}
            <Box display={checked ? 'block' : 'none'}>
              <Paper className={classes.paper2}>
                <Typography variant="body2" style={{ height: 105, overflow: 'auto', boxShadow: '1px 1px 8px grey', padding: '10px', borderRadius: '20px' }}>
                  {book.description}
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} />
    </Paper>
  );
}

export default LoginBookItem;
