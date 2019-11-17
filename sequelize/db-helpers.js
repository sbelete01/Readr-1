const models = require('./index');


// ----------BOOKS----------
// Takes a book object and creates a new books
const insertBook = (book) => models.Book.create({
  isbn: book.isbn,
  title: book.title,
  author: book.author,
  description: book.description,
  coverURL: book.coverURL,
  genre: book.genre,
  urlSnippet: book.urlSnippet,
  availability: book.availability,
  buyLink: book.buyLink,
});

// Takes an identifying number and returns the book info
const findBook = (isbn) => models.Book.findOne({
  where: {
    isbn,
  },
});


// ----------USER_PREFERENCES----------
const defaultPref = 0.50;
// Takes the userID and creates the default preferences for the user
const createPreferences = (userID) => models.UserPreference.create({
  userID,
  comedy: defaultPref,
  thriller: defaultPref,
  fantasy: defaultPref,
  romance: defaultPref,
});

// Takes a userID, the subject of the book, and the toRead boolean and updates the preferences
const defaultUpdate = 0.05;
// Update the user preferences where userID matches and modify subject based on math
// (toRead is boolean of which list for positive or negative change)
const updatePreferences = (userID, subject, toRead) => models.UserPreference.findOne({
  attributes: [subject],
  where: {
    userID,
  },
})
  .then((subjectWeight) => {
    let newWeight;
    if (toRead === true) {
      if (subjectWeight.dataValues[subject] < 0.94) {
        newWeight = subjectWeight.dataValues[subject];
      } else {
        newWeight = subjectWeight.dataValues[subject] + defaultUpdate;
      }
    } else if (subjectWeight.dataValues[subject] <= 0.06) {
      newWeight = subjectWeight.dataValues[subject];
    } else {
      newWeight = subjectWeight.dataValues[subject] - defaultUpdate;
    }
    return models.UserPreference.update({
      [subject]: newWeight,
    }, {
      where: {
        userID,
      },
    });
  });

// Takes a userID and returns the user preferences
const getPreferences = (userID) => models.UserPreference.findOne({
  attributes: {
    exclude: ['id', 'userID', 'createdAt', 'updatedAt'],
  },
  where: {
    userID,
  },
});

// ----------USER_BOOKS----------
// Takes a userID and a toRead boolean and returns list of all books on toRead / not toRead list
const userBookList = (userID, toRead) => models.UserBook.findAll({
  attributes: ['isbn'],
  where: {
    userID,
    is_interested: toRead,
  },
})
  .then((bookIdentifiers) => bookIdentifiers.map(
    (bookIdentifier) => bookIdentifier.isbn,
  ))
  .then((identifiers) => models.Book.findAll({
    where: {
      isbn: identifiers,
    },
  }));

const createUserBook = (userID, isbn, toRead) => models.UserBook.create({
  userID,
  isbn,
  is_interested: toRead,
});

// update the user's interest in a book. Update takes two parameters -
// first one is values which will be used to perform the update, and second one is options
const changeUserInterest = (userID, isbn, toRead) => models.UserBook.update({
  is_interested: toRead,
}, {
  where: {
    userID,
    isbn,
  },
});

const verifyUserBook = (userID, isbn) => models.userBook.findOne({
  where: {
    userID,
    isbn,
  },
});

// ----------FOLLOWERS----------
// Follow user
const followUser = (userID, followerID) => models.UserFollower.create({
  userID,
  followerID,
});

const unfollowUser = (userID, followerID) => models.UserFollower.destroy({
  where: {
    userID,
    followerID,
  },
});

// Get list of users you are following
const getFollowing = (userID) => models.UserFollower.findAll({
  attributes: ['followerID'],
  where: {
    userID,
  },
})
  .then((connectionData) => connectionData.map(
    (connectionInfo) => connectionInfo.dataValues.followerID,
  ))
  .then((userIDs) => models.User.findAll({
    attributes: ['username', 'id'],
    where: {
      id: userIDs,
    },
  }));

// Get list of users following you
const getFollowers = (userID) => models.UserFollower.findAll({
  attributes: ['userID'],
  where: {
    followerID: userID,
  },
})
  .then((connectionData) => connectionData.map(
    (connectionInfo) => connectionInfo.dataValues.userID,
  ))
  .then((userIDs) => models.User.findAll({
    attributes: ['username', 'id'],
    where: {
      id: userIDs,
    },
  }));

const createUser = (username, googleId) => models.User.create({
  username,
  googleId,
});


module.exports.insertBook = insertBook;
module.exports.findBook = findBook;
module.exports.createPreferences = createPreferences;
module.exports.updatePreferences = updatePreferences;
module.exports.getPreferences = getPreferences;
module.exports.userBookList = userBookList;
module.exports.createUserBook = createUserBook;
module.exports.verifyUserBook = verifyUserBook;
module.exports.changeUserInterest = changeUserInterest;
module.exports.followUser = followUser;
module.exports.unfollowUser = unfollowUser;
module.exports.getFollowing = getFollowing;
module.exports.getFollowers = getFollowers;
module.exports.createUser = createUser;
