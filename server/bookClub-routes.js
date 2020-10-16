const { Router } = require('express');
const { User, UserFollower, Bookclubs, UserBookClubs } = require('../sequelize/index');

const BcRoutes = Router();

BcRoutes.get('/', (req, res) => {
  console.log('lost');
  // handles GET requests from '/bc/'
});

BcRoutes.post('/', (req, res) => {
  console.log('lost');
  // handles POST re quests from '/bc/'
});

BcRoutes.get('/getBookclubs', async (req, res) => {
  console.log('what the ACTUAL fuck ONE');
  // get list of bookclubIDs using bookclub/user join  table
  await UserBookClubs.findAll({
    where: {
      userID: 1,
    },
  }).then((userBookclubData) => {
    console.log(userBookclubData, 'ubcd line 20');
  }).then(() => {
    console.log('what the ACTUAL fuck TWO');
    console.log(req.user.dataValues, 'user');
  })
  // get list of bookclubs using bookclubIDs
  // send back list of bookclubs as array
  res.send('bookclubIds');
});

module.exports = {
  BcRoutes,
};
