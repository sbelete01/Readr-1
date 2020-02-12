import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  card: {
    maxWidth: '100%',
    height: 550,
  },
  media: {
    height: 360,
  },
  title: {
    marginTop: -15,
    marginBottom: -5,
  },
  description: {
    marginBottom: -20,
  },
});

const Book = (props) => {
  const { title, author, description, coverURL } = props.bookSuggestion;
  const { handleNoClick, handleYesClick } = props;
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={coverURL}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              variant="h6"
              className="container title"
              style={{
                overflowX: 'hidden',
                maxHeight: 35,
                textAlign: 'left',
              }}
            >
              {title}
            </Typography>
            <Typography
              style={{ textAlign: 'left' }}
              variant="subtitle1"
            >
              {author}
            </Typography>
            <Typography
              className="container description"
              variant="body2"
              style={{ maxHeight: 60, overflow: 'scroll', textAlign: 'left' }}
              color="textSecondary"
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ display: 'block', paddingBottom: 10 }}>
          <Button size="small" color="secondary" onClick={handleYesClick}>
            Add to favorites
          </Button>
          <Button size="small" color="primary" onClick={handleYesClick}>
            Not Interested
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Book;

/*
      <Typography variant="h6">{title}</Typography>
      <img src={coverURL} alt="Smiley face" />
      <Typography variant="subtitle1">{author || null}</Typography>
      <Typography variant="caption"> {description.slice(0, 200)}...</Typography>
      */
