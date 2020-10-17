const Sequelize = require('sequelize');

require('dotenv').config();

// need to add this so I can create a
// pull requests for this spefic file

const {
  DATABASE,
  USER_NAME,
  USER_PASSWORD,
  HOST,
  DB_PORT,
} = process.env;

const db = new Sequelize({
  database: DATABASE,
  username: USER_NAME,
  password: USER_PASSWORD,
  host: HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false,
});

// forces data base drop
// db.sync({ force: true });

// creating the table for the user
const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: Sequelize.STRING,
  googleId: Sequelize.STRING,
  isQuizzed: Sequelize.BOOLEAN,
  chosenName: Sequelize.STRING,
  email: Sequelize.STRING,
});

// creating the table for the books api informations
const Book = db.define('book', {
  isbn: {
    type: Sequelize.STRING,
    unique: true,
  },
  title: {
    type: Sequelize.STRING,
    unique: true,
  },
  author: Sequelize.STRING,
  description: {
    type: Sequelize.TEXT,
    unique: true,
  },
  coverURL: {
    type: Sequelize.STRING,
    unique: true,
  },
  buyLink: {
    type: Sequelize.STRING,
    unique: true,
  },
  genre: Sequelize.STRING,
  urlSnippet: Sequelize.STRING,
  availability: Sequelize.STRING,
});

// creating the field on the table
const UserFollower = db.define('user_follower', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userID: {
    type: Sequelize.INTEGER,
  },
  followerID: {
    type: Sequelize.INTEGER,
  },
});


const UserBlocked = db.define('user_blocked', {
  userID: Sequelize.INTEGER, // User ID
  blockedID: Sequelize.INTEGER, // ID of user blocked by User ID
});


// creating the fields on the table
const UserBook = db.define('user_book', {
  userID: {
    type: Sequelize.INTEGER,
  },
  isbn: {
    type: Sequelize.STRING,
  },
  is_interested: Sequelize.BOOLEAN,
});

const UserHaveRead = db.define('user_read', {
  userID: {
    type: Sequelize.INTEGER,
  },
  isbn: {
    type: Sequelize.STRING,
  },
  coverURL: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
  author: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  have_read: Sequelize.BOOLEAN,
});

const UserPreference = db.define('user_preference', {
  userID: Sequelize.INTEGER,
  comedy: Sequelize.FLOAT,
  thriller: Sequelize.FLOAT,
  fantasy: Sequelize.FLOAT,
  romance: Sequelize.FLOAT,
});

const Bookclubs = db.define('bookclubs', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bookName: Sequelize.STRING,
  ghLink: Sequelize.STRING,
});

const UserBookClubs = db.define('user_bookclubs', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bookclubID: Sequelize.INTEGER,
  userID: Sequelize.INTEGER,
});

const autopopulate = async () => {
  const userOne = await User.findOne({ where: { id: 1 } })
    .then((user) => !!user);
  if (!userOne) {
    User.create({
      username: 'user one',
      googleId: '123456789',
      isQuizzed: true,
      chosenName: 'userone',
    });
  }
  const userTwo = await User.findOne({ where: { id: 2 } })
    .then((user) => !!user);
  if (!userTwo) {
    User.create({
      username: 'user two',
      googleId: '987654321',
      isQuizzed: true,
      chosenName: 'usertwo',
    });
  }
  const userThree = await User.findOne({ where: { id: 3 } })
    .then((user) => !!user);
  if (!userThree) {
    User.create({
      username: 'user three',
      googleId: '547896321',
      isQuizzed: true,
      chosenName: 'userthree',
    });
  }
  const bookclubOne = await Bookclubs.findOne({ where: { id: 1 } })
    .then((bookclub) => !!bookclub);
  if (!bookclubOne) {
    Bookclubs.create({
      bookName: 'Gone With The Wind',
      ghLink: 'https://hangouts.google.com/call/KjpO5eAMiVSkX6j0Fl5sACEE',
    });
  }
  const bookclubTwo = await Bookclubs.findOne({ where: { id: 2 } })
    .then((bookclub) => !!bookclub);
  if (!bookclubTwo) {
    Bookclubs.create({
      bookName: 'A Farewell To Arms',
      ghLink: 'https://hangouts.google.com/call/QW3EwYg2n-tGMtXEgogSACEE',
    });
  }
  const ubOne = await UserBookClubs.findOne({ where: { id: 1 } })
    .then((ub) => !!ub);
  if (!ubOne) {
    UserBookClubs.create({
      bookclubID: 1,
      userID: 1,
    });
    UserBookClubs.create({
      bookclubID: 1,
      userID: 3,
    });
  }
  const ubTwo = await UserBookClubs.findOne({ where: { id: 2 } })
    .then((ub) => !!ub);
  if (!ubTwo) {
    UserBookClubs.create({
      bookclubID: 2,
      userID: 1,
    });
    UserBookClubs.create({
      bookclubID: 2,
      userID: 2,
    });
  }
};

autopopulate();

User.sync();
Book.sync();
UserFollower.sync();
UserBlocked.sync();
UserBook.sync();
UserPreference.sync();
UserHaveRead.sync();
Bookclubs.sync();
UserBookClubs.sync();


// forces data base drop
// db.sync({ force: true });

db.authenticate().then(() => {
  console.log('connected to database');
}).catch((err) => console.log(err));

module.exports.User = User;
module.exports.Book = Book;
module.exports.UserFollower = UserFollower;
module.exports.UserBlocked = UserBlocked;
module.exports.UserBook = UserBook;
module.exports.UserPreference = UserPreference;
module.exports.UserHaveRead = UserHaveRead;
module.exports.Bookclubs = Bookclubs;
module.exports.UserBookClubs = UserBookClubs;
