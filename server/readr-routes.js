// Express router for all main features of the Readr app

const router = require('express').Router();
const {
  categorySearch,
  selectCategory,
  selectBook,
  getInfo,
} = require('./suggestion');
const dbHelpers = require('../sequelize/db-helpers');
const { User } = require('../sequelize/index');

const authCheck = (req, res, next) => {
  if (!req.user) {
    // if user is not logged in
    res.redirect('/');
  } else {
    next();
  }
};

router.get('/', authCheck, (req, res) => {
  res.send(`you are logged in as: ${req.user.username}`);
});

router.get('/suggestion', (req, res) => {
  const { user } = req;
  const book = {};
  dbHelpers.getPreferences(user.id)
    .then((preferences) => {
      const category = selectCategory(preferences.dataValues);
      book.genre = category;
      return categorySearch(category, 0);
    })
    .then((books) => categorySearch(book.genre, selectBook(books.ebook_count)))
    // Get total book count & Send request with offset set to a random number from the count
    .then((books) => {
      book.title = books.works[0].title;
      book.author = books.works[0].authors[0].name;
      book.urlSnippet = books.works[0].ia;
      // book.availability = books.works[0].availability.status;
      book.buyLink = books.works[0].saleInfo;
      return getInfo(book.title, book.author);
    })
    .then((bookInfo) => {
      book.isbn = bookInfo.isbn;
      book.description = bookInfo.description;
      book.coverURL = bookInfo.coverURL;
      book.title = bookInfo.title;
      book.buyLink = bookInfo.buyLink;
      return dbHelpers.insertBook(book);
      // res.send(JSON.stringify(book));
    })
    .then(() => res.send(JSON.stringify(book)))
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

// Endpoint to return list of followers
router.get('/followers', (req, res) => {
  const { user } = req;
  dbHelpers.getFollowers(user.id)
    .then((followers) => {
      res.send(JSON.stringify(followers));
    });
});

// Endpoint to return list of users you are following and their id#
router.get('/following', (req, res) => {
  const { user } = req;
  dbHelpers.getFollowing(user.id)
    .then((following) => {
      res.send(JSON.stringify(following));
    });
});

router.get('/profile', (req, res) => {
  res.send('successfully connected to /profile');
});

// Endpoint to follow a user
router.post('/follow/:followerID', (req, res) => {
  const { user } = req;
  dbHelpers.followUser(user.id, req.params.followerID)
    .then(() => {
      res.send('successfully followed');
    });
});

// Endpoint to unfollow a user
router.post('/unfollow/:followerID', (req, res) => {
  const { user } = req;
  dbHelpers.unfollowUser(user.id, req.params.followerID)
    .then(() => {
      res.send('successfully unfollowed');
    });
});

// Endpoint to update user preferences
router.post('/preferences', async (req, res) => {
  // change quizzed to true
  const { chosenName } = req.body;
  const { googleId } = req.body.user;

  await User.update(
    { isQuizzed: true, chosenName },
    { where: { googleId } },
  );

  const userID = req.body.user.id;
  const genres = Object.keys(req.body).slice(0, Object.keys(req.body).length - 1);

  // const { userID, genre, toRead } = req.body;

  genres.forEach((genre) => {
    const toRead = req.body[genre];

    dbHelpers.updatePreferences(userID, genre, toRead)
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error));
  });
  res.sendStatus(201);
});

router.post('/interest', (req, res) => {
  const { userID, isbn, toRead } = req.body;
  dbHelpers.createUserBook(userID, isbn, toRead)
    .then(() => dbHelpers.findBook(isbn))
    .then((bookData) => dbHelpers.updatePreferences(userID, bookData.genre, toRead))
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => console.error(error));
});

router.patch('/interest', (req, res) => {
  const { userID, isbn, toUpdate } = req.body;
  dbHelpers.changeUserInterest(userID, isbn, toUpdate)
    .then(() => dbHelpers.findBook(isbn))
    .then((bookData) => dbHelpers.updatePreferences(userID, bookData.genre, toUpdate))
    .then(() => {
      res.status(200).send('book list updated');
    })
    .catch((error) => console.error(error));
});

router.post('/booklist', (req, res) => {
  const { userID, toRead } = req.body;
  dbHelpers.userBookList(userID, toRead)
    .then((bookList) => {
      res.send(bookList);
    })
    .catch((error) => console.error(error));
});

// reset user genre preferences
router.patch('/reset', (req, res) => {
  const { id, googleId } = req.body;
  // reset isquizzed in db
  User.update(
    { isQuizzed: false },
    { where: { googleId } },
  );

  dbHelpers.createPreferences(id)
    .then(() => {
      res.sendStatus(204);
    });
});

// check if user has taken preference quiz
router.post('/quizzed', (req, res) => {
  // check if user has been quizzed
  const { googleId } = req.body.user;
  User.findOne({
    where: {
      googleId,
    },
  })
    .then((user) => {
      const { isQuizzed } = user;
      res.send(isQuizzed);
    })
    .catch((err) => {
      console.error(err);
      res.send(false);
    });
});

// save a new users chosen username
router.post('/saveName', async (req, res) => {
  const { chosenName } = req.body;
  const { googleId } = req.body.user;
  // see if name has been taken
  await User.findOne({
    where: { chosenName },
  })
    .then(async (response) => {
      // if name doesnt exist, update current user
      if (!response) {
        await User.update({ chosenName }, {
          where: {
            googleId,
          },
        });
        // return updated user
        await User.findOne({
          where: {
            googleId,
          },
        }).then((user) => res.send(user));
      } else {
        throw response;
      }
    })
    // if name has been taken, make user pic new name
    .catch((error) => {
      console.error(error);
      res.status(400).send('failure');
    });
});

module.exports = router;
